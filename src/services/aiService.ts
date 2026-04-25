import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface SkinAnalysisResult {
  skinType: "oily" | "dry" | "combination" | "sensitive" | "normal";
  concerns: string[];
  description: string;
  confidence: number;
}

export async function analyzeSkinImage(base64Image: string): Promise<SkinAnalysisResult> {
  const imagePart = {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64Image.split(",")[1] || base64Image,
    },
  };

  const prompt = `
    Analyze this facial image for skincare purposes. 
    Identify the skin type (oily, dry, combination, sensitive, normal) and specific concerns (acne, pigmentation, wrinkles, dullness, dark spots, redness, etc.).
    Provide a brief professional summary of the skin condition.
    Return the result in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            skinType: { type: Type.STRING, enum: ["oily", "dry", "combination", "sensitive", "normal"] },
            concerns: { type: Type.ARRAY, items: { type: Type.STRING } },
            description: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
          },
          required: ["skinType", "concerns", "description", "confidence"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as SkinAnalysisResult;
  } catch (error) {
    console.error("AI Skin Analysis Error:", error);
    throw new Error("Failed to analyze skin image.");
  }
}

export async function analyzeSkinQuiz(answers: Record<string, string>): Promise<SkinAnalysisResult> {
  const prompt = `
    Based on the following skincare questionnaire answers, determine the skin type and concerns.
    Answers: ${JSON.stringify(answers)}
    
    Return the result in JSON format with skinType, concerns (array), description, and confidence.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            skinType: { type: Type.STRING, enum: ["oily", "dry", "combination", "sensitive", "normal"] },
            concerns: { type: Type.ARRAY, items: { type: Type.STRING } },
            description: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
          },
          required: ["skinType", "concerns", "description", "confidence"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as SkinAnalysisResult;
  } catch (error) {
    console.error("AI Skin Quiz Analysis Error:", error);
    throw new Error("Failed to analyze skin quiz results.");
  }
}
