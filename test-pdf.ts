import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  try {
    const base64Data = fs.readFileSync('test-small.pdf').toString('base64');
    
    console.log("sending");
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: {
        parts: [
          { text: "Extract all raw text from this document. Also, infer the document type (aadhaar, pan, marksheet, resume, certificate, other) and extract key metadata into structured JSON." },
          { inlineData: { mimeType: "application/pdf", data: base64Data } }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });
    console.log(response.text);
  } catch (e: any) {
    console.error("error:", e.message || e);
  }
}
run();
