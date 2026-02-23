
import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem, Recommendation } from "../types";

export const getSmartRecommendations = async (userPrompt: string, menu: FoodItem[]): Promise<Recommendation | null> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Missing API Key for Gemini");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a Gourmet AI Food Scout and Health & Flavor Advisor.
      
      CUSTOMER SEARCH: "${userPrompt}"
      
      CORE MISSION:
      1. CRITICAL SAFETY: If the user requests "no eggs", "no milk", "dairy free", "allergy", etc., YOU MUST ONLY recommend items that do NOT contain those allergens.
      2. CRAVING MATCH: Identify flavor preferences like "spicy", "sweet", "mild", "savory", "bitter", "sour".
      3. BEST FIT: Select the absolute best SINGLE item from the menu that fulfills both safety and craving perfectly.
      
      MENU DATA: ${JSON.stringify(menu.map(i => ({ 
        id: i.id, 
        name: i.name, 
        desc: i.description, 
        allergens: i.allergens, 
        tags: i.tags,
        ingredients: i.ingredients
      })))}
      
      OUTPUT JSON RULES:
      - foodId: The matching item's ID.
      - reason: A short, high-fidelity sentence explaining why this is the perfect match (e.g., 'Dairy-free and perfectly spicy for your lunch craving.').
      - badge: A catchy 2-3 word badge (e.g., 'Egg-Free Spicy Hit', 'Vegan Energy Pick', 'Mild Savory Gem').`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodId: { type: Type.STRING },
            reason: { type: Type.STRING },
            badge: { type: Type.STRING }
          },
          required: ["foodId", "reason", "badge"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text.trim()) as Recommendation;
  } catch (error) {
    console.error("AI Search Error:", error);
    return null;
  }
};
