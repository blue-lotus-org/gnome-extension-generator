
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { GnomeExtensionCode } from '../types';
import { GEMINI_MODEL_NAME, GNOME_EXTENSION_SYSTEM_PROMPT_TEMPLATE } from '../constants';

// Ensure process.env.API_KEY is handled as per guidelines.
// The application assumes this environment variable is pre-configured.
let apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY environment variable not found. Service will not function.");
  // To prevent runtime errors if API_KEY is critical for initialization,
  // one might throw an error here or use a placeholder key if the API allows it (which is unlikely for real usage).
  // For this exercise, we'll proceed, and calls will fail if the key is truly missing.
  apiKey = "MISSING_API_KEY"; // Placeholder to allow constructor, but API calls will fail.
}

const ai = new GoogleGenAI({ apiKey });

export const generateGnomeExtensionCode = async (userPrompt: string): Promise<GnomeExtensionCode> => {
  if (apiKey === "MISSING_API_KEY") {
    throw new Error("Gemini API key is not configured. Please set the API_KEY environment variable.");
  }

  const fullPrompt = `${GNOME_EXTENSION_SYSTEM_PROMPT_TEMPLATE}\n\nUser Request: "${userPrompt}"`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5, // Slightly creative but mostly stable
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }
    
    try {
      const parsedData = JSON.parse(jsonStr) as GnomeExtensionCode;
      if (!parsedData.extension_js || !parsedData.metadata_json) {
        console.error("AI response missing required fields. Raw text:", response.text);
        throw new Error("AI response is not in the expected format (missing extension_js or metadata_json).");
      }
      return parsedData;
    } catch (e) {
      console.error("Failed to parse JSON response from AI. Raw text:", response.text, "Error:", e);
      throw new Error(`AI returned an invalid JSON format. Please try rephrasing your request or check the AI's raw output if available. Error: ${(e as Error).message}`);
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // Check for common API key related issues (though the SDK might abstract specific codes)
        if (error.message.includes("API key not valid")) {
             throw new Error("The configured Gemini API key is not valid. Please check your API_KEY environment variable.");
        }
        if (error.message.includes("quota")) {
            throw new Error("You have exceeded your Gemini API quota. Please check your usage and limits.");
        }
    }
    throw new Error(`Failed to generate code via AI. ${(error as Error).message}`);
  }
};
