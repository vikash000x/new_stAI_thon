import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function runLangChainPipeline(scrapedText, companyName) {
  console.log("Running LangChain pipeline with scraped text and company name:", companyName); 
  const prompt = `
  Extract up to 10 companies that provide services to ${companyName} based on the data below.
  
  Return the result strictly as a JSON array of objects with the following fields:
  - "company": The company name
  - "description": What service it offers to ${companyName}
  - "externalLink": Use the provided link only if it clearly supports the relationship. Do NOT make up links.
  
  Only return entries that are relevant and supported by the given content.
  
  Do not include any explanation or text outside the JSON array.
  
  ${scrapedText}
  `;
  
  

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // or "gemini-1.5-pro"
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let text = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Model output:");

    // Strip markdown code block if present
    text = text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```[a-z]*\n?/i, "").replace(/```$/, "").trim();
    }

    let extracted;
    try {
      extracted = JSON.parse(text);
      if (!Array.isArray(extracted)) throw new Error("Not a valid JSON array");
      console.log("Extracted data:");
    } catch (err) {
      console.error("JSON parsing error:", err.message);
      extracted = [];
    }

    return { extracted };
  } catch (error) {
    console.error("Gemini API error:", error.message);
    return { extracted: [] };
  }
}

export { runLangChainPipeline };
