
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Use the required initialization pattern for @google/genai
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHealthAdvice = async (history: { role: string, text: string }[], userInput: string) => {
  // Use gemini-3-pro-preview for complex reasoning tasks
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })).concat({ role: 'user', parts: [{ text: userInput }] }),
    config: {
      systemInstruction: `You are a friendly Healthcare AI Assistant named VitalPulse. 
      Provide helpful, empathetic, and clear health information. 
      IMPORTANT: You are NOT a doctor. Always include a disclaimer that this is not medical advice.
      Be concise. If the user mentions symptoms, provide a structured analysis but stress seeking professional help.`,
    }
  });

  return response.text || "I'm sorry, I couldn't process that. Please try again.";
};

export const analyzeSymptoms = async (symptoms: string) => {
  // Use gemini-3-pro-preview for complex analysis and triage
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze these symptoms: ${symptoms}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskLevel: { type: Type.STRING, description: "Low, Medium, or High" },
          possibleCondition: { type: Type.STRING },
          recommendation: { type: Type.STRING },
          urgency: { type: Type.STRING, description: "How quickly they should see a doctor" }
        },
        required: ["riskLevel", "possibleCondition", "recommendation", "urgency"]
      },
      systemInstruction: "You are a medical triage assistant. Analyze symptoms and return JSON format. Always state this is non-diagnostic."
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    return null;
  }
};

export const explainMedication = async (medName: string) => {
  // gemini-3-flash-preview is suitable for basic explanation tasks
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain the medication: ${medName}`,
    config: {
      systemInstruction: "Provide a 2-sentence summary of what this medication is for and its main precaution. Keep it simple."
    }
  });
  return response.text;
};
