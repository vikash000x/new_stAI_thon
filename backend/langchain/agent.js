import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function runLangChainPipeline(scrapedText, companyName, serviceType) {
  console.log("Running LangChain pipeline with:", companyName, "and serviceType:", serviceType);

  const prompt = `
You are a business intelligence assistant. Based on the data below, extract **up to 10 companies** that provide **"${serviceType}"** services to **${companyName}**.

✅ Output format:
Return a JSON array of objects with exactly the following fields:
- "company": The name of the service provider
- "description": What "${serviceType}" service it offers to ${companyName}
- "externalLink": A supporting link **from the input data** (leave empty if not clearly stated)

⚠️ Rules:
- Only include companies that clearly offer "${serviceType}" services to ${companyName}
- Do NOT fabricate links. Use only those found in the input
- If data is unclear, skip that entry
- Output ONLY the JSON array — no explanation or markdown

🔍 Data:
${scrapedText}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let text = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Clean up markdown if any
    text = text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```[a-z]*\n?/i, "").replace(/```$/, "").trim();
    }

    let extracted;
    try {
      extracted = JSON.parse(text);
      if (!Array.isArray(extracted)) throw new Error("Parsed result is not an array");
      console.log("✅ Successfully extracted companies");
    } catch (err) {
      console.error("❌ JSON parsing error:", err.message);
      extracted = [];
    }

    return { extracted };
  } catch (error) {
    console.error("❌ Gemini API error:", error.message);
    return { extracted: [] };
  }
}

export { runLangChainPipeline };
