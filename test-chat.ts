import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const sysPrompt = "You are an AI assistant.";
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "test message",
      config: { systemInstruction: sysPrompt }
    });
    console.log(response.text);
  } catch (err: any) {
    console.log("Error:", err.message);
  }
}
run();
