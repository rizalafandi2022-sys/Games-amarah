import { GoogleGenAI, Type } from "@google/genai";
import { RageAnalysisResult } from "../types";

// Type declaration fallback if vite-env.d.ts is not picked up immediately by some IDEs
declare const process: { env: { API_KEY: string } };

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeRage = async (userInput: string): Promise<RageAnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analisa curhatan berikut: "${userInput}". 
      
      Peranmu: AI Komedi Ringan Bahasa Indonesia & Motivator Santuy.
      Tugas:
      1. Nilai "saldo amarah" (0-200).
      2. Ubah jadi "saldo dana" rupiah (fiktif, semakin marah semakin mahal, tapi logis secara komedi).
      3. Beri punchline/saran lucu untuk menertawakan masalahnya.
      4. Beri satu kalimat "calmingQuote" yang bijak tapi santai untuk meredakan emosi dia.
      
      Aturan:
      - Jangan menghina/SARA.
      - Lucu & Positif.
      - Gunakan bahasa gaul yang sopan.
      - Output JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rageScore: {
              type: Type.INTEGER,
              description: "Nilai amarah dari 0 sampai 200",
            },
            moneyValue: {
              type: Type.STRING,
              description: "Nilai rupiah fiktif yang diformat, contoh: 'Rp 50.000'",
            },
            punchline: {
              type: Type.STRING,
              description: "Saran komedi atau punchline lucu",
            },
            calmingQuote: {
              type: Type.STRING,
              description: "Kalimat bijak penenang hati yang santai",
            },
          },
          required: ["rageScore", "moneyValue", "punchline", "calmingQuote"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as RageAnalysisResult;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Maaf, AI-nya lagi pusing mikirin cicilan sendiri. Coba lagi ya!");
  }
};