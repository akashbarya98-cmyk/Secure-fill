import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { GoogleGenAI, Type } from '@google/genai';
import { randomUUID } from 'crypto';
import fs from 'fs';

// Setup environment and AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});
const JWT_SECRET = process.env.JWT_SECRET || 'securefill-secret-develop-only';
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// --- Mock Database In-Memory ---
const users: any[] = [];
const documents: any[] = [];
const chats: any[] = [];
const activityLogs: any[] = [];

// Middleware
const authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const dec = jwt.verify(token, JWT_SECRET) as any;
    req.user = dec;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // --- API Routes --- //

  // Auth: Signup
  app.post('/api/auth/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email in use' });
    const user = { id: randomUUID(), name, email, password, identityScore: 85, joinedAt: new Date().toISOString() };
    users.push(user);
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name, email, identityScore: user.identityScore } });
  });

  // Auth: Login
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, identityScore: user.identityScore } });
  });

  // Auth: Me
  app.get('/api/auth/me', authenticate, (req: any, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json({ user: { id: user.id, name: user.name, email: user.email, identityScore: user.identityScore } });
  });

  // Documents: Upload & OCR
  app.post('/api/documents', authenticate, upload.single('file'), async (req: any, res: Response) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
      
      const filePath = req.file.path;
      const fileExt = path.extname(req.file.originalname).toLowerCase();
      let extractedData = {};
      let extractedText = '';
      let docType = 'other';
      
      try {
        // Support both Images and PDFs for text extraction
        const mimeType = req.file.mimetype;
        if (mimeType.startsWith('image/') || mimeType === 'application/pdf') {
          const fileData = fs.readFileSync(filePath);
          const base64Data = fileData.toString('base64');
          
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
              parts: [
                { text: "Extract all raw text from this document. Also, infer the document type (aadhaar, pan, marksheet, resume, certificate, other) and extract key metadata. Return strictly JSON in this format: { \"documentType\": \"...\", \"extractedText\": \"...\", \"extractedFields\": { ... } }" },
                { inlineData: { mimeType: mimeType, data: base64Data } }
              ]
            },
            config: {
              responseMimeType: "application/json"
            }
          });
          const text = response.text || "{}";
          const result = JSON.parse(text);
          extractedData = result.extractedFields || {};
          extractedText = result.extractedText || '';
          docType = result.documentType || 'other';
        }
      } catch (err) {
        console.error("OCR Gemini Error:", err);
      }

      const newDoc = {
        id: randomUUID(),
        userId: req.user.id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        type: docType,
        mimeType: req.file.mimetype,
        size: req.file.size,
        extractedData,
        extractedText,
        verificationStatus: 'verified', // fast verify
        uploadedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      documents.push(newDoc);
      activityLogs.push({ id: randomUUID(), userId: req.user.id, action: 'Document Uploaded', item: newDoc.originalName, at: new Date().toISOString() });
      
      res.json(newDoc);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Documents: List
  app.get('/api/documents', authenticate, (req: any, res) => {
    const userDocs = documents.filter(d => d.userId === req.user.id);
    res.json(userDocs);
  });

  // Dashboard Summary
  app.get('/api/dashboard', authenticate, (req: any, res) => {
    const userDocs = documents.filter(d => d.userId === req.user.id);
    const userLogs = activityLogs.filter(a => a.userId === req.user.id).slice(-5).reverse();
    const user = users.find(u => u.id === req.user.id);
    
    let totalScore = userDocs.length * 10;
    const finalScore = Math.min(100, Math.max(0, (user?.identityScore || 0) + totalScore));

    res.json({
      identityScore: finalScore,
      documentsStored: userDocs.length,
      scholarshipsAvailable: 5 + (userDocs.length * 2), // dummy logic
      formsAutofilled: 12,
      recentActivity: userLogs
    });
  });

  // Chat: AI Assistant
  app.post('/api/chat', authenticate, async (req: any, res) => {
    try {
      const { message } = req.body;
      const userDocs = documents.filter(d => d.userId === req.user.id);
      
      // Combine all extracted data for context including raw extracted text
      const userContext = userDocs.map(d => ({
        type: d.type,
        fileName: d.originalName,
        metadata: d.extractedData,
        extractedText: d.extractedText
      }));

      const sysPrompt = `You are SecureFill AI, an AI digital identity vault assistant. 
You are given the user's extracted document profile data in JSON. 
This data includes their parsed metadata and the raw extracted text from their uploaded PDFs and images.
Use this to answer their questions accurately. Do not invent information. Search the extracted metadata and the raw extractedText to answer queries.
User's Document Data: ${JSON.stringify(userContext)}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
        config: { systemInstruction: sysPrompt }
      });

      res.json({ reply: response.text });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // File serving for uploaded files
  app.use('/uploads', express.static(UPLOADS_DIR));

  // --- Vite Middleware --- //
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
