import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  try {
    const res = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "hi",
      config: { systemInstruction: "be polite" }
    });
    console.log("Success:", res.text);
  } catch (err: any) {
    console.log("Error:", err.message);
  }
}
run();
