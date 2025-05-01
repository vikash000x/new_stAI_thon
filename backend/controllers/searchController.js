// server/controllers/searchController.js
import { runLangChainPipeline } from '../langchain/agent.js';
import { scrapeCompany } from '../services/scraper.js';
import SearchResult from '../models/searchresult.js'; // ✅ Updated import

export const handleSearch = async (req, res) => {
  console.log("Goes to handleSearch controller");

  const { client } = req.query;

  try {
    // ✅ Check if result already exists in DB

    console.log("h1");

    const existing = await SearchResult.findOne({ client });
    console.log("h2");

    if (existing) {
      console.log("Found existing result in database for client:", client);
      return res.json(existing);
    }

    console.log("Data not found in database, scraping for client:", client);

    const scraped = await scrapeCompany(client);

    const scrapedText = scraped
      .map(item => `Title: ${item.title}\nDescription: ${item.description}\nLink: ${item.externalLink}`)
      .join('\n\n');

    const { extracted } = await runLangChainPipeline(scrapedText, client);
    console.log("Extracted data in controller:");

    if (!Array.isArray(extracted)) {
      console.error("Extracted data is not an array:", extracted);
      return res.status(500).json({ error: "Extracted data is not an array" });
    }

    const result = new SearchResult({ client, extracted });
    await result.save();
    console.log("Saved result to database for client:", client);

    res.json(result);
  } catch (error) {
    console.error("Error in handleSearch:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
