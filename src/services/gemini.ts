import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is missing. Please add it to your secrets.");
}

export const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const getResponse = async (message: string, history: { role: string; content: string }[]) => {
  if (!apiKey) throw new Error("API Key missing");

  const model = "gemini-3-flash-preview";
  const systemInstruction = "Ati gargaaraa teeknikaa Afaan Oromooti. Gaaffii hundaaf Afaan Oromootiin deebii gabaabaa fi ifa ta'e kenni. Nama si gaafatuuf kabaja qabaadhu.";

  const chat = ai.models.generateContentStream({
    model,
    config: {
      systemInstruction,
    },
    contents: [
      ...history.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ]
  });

  return chat;
};
