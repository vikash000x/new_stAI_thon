// server/controllers/searchController.js
import { runLangChainPipeline } from '../langchain/agent.js';
import { scrapeCompany } from '../services/scraper.js'; // ✅ Updated import
import Updatedsch from '../models/updatedsch.js';
export const handleSearch = async (req, res) => {
  console.log("Goes to handleSearch controller");

  const { client, serviceType } = req.query;

  if (!client || !serviceType) {
    return res.status(400).json({ error: "Client and serviceType are required." });
  }

  try {
    // ✅ Check if result already exists in DB for both client and serviceType
    const existing = await Updatedsch.findOne({ client, serviceType });
    if (existing) {
      console.log(`Found existing result in database for client: ${client}, service: ${serviceType}`);
      return res.json(existing);
    }

    console.log(`Data not found in DB. Scraping for client: ${client}, service: ${serviceType}`);
    const scraped = await scrapeCompany(client);

    const scrapedText = scraped
      .map(item => `Title: ${item.title}\nDescription: ${item.description}\nLink: ${item.externalLink}`)
      .join('\n\n');

    const { extracted } = await runLangChainPipeline(scrapedText, client, serviceType);
    console.log("Extracted data in controller:");

    if (!Array.isArray(extracted)) {
      console.error("Extracted data is not an array:", extracted);
      return res.status(500).json({ error: "Extracted data is not an array" });
    }

    const result = new Updatedsch({ client, serviceType, extracted });
    await result.save();
    console.log("Saved result to DB for client and serviceType.");

    res.json(result);
  } catch (error) {
    console.error("Error in handleSearch:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
