// import axios from 'axios';
// import * as cheerio from 'cheerio';

// export const scrapeCompany = async (companyName) => {
//   const query = `companies that provides services to ${companyName} like`;
//   const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
//   console.log("url:", url);

//   const { data } = await axios.get(url, {
//     headers: {
//       'User-Agent': 'Mozilla/5.0',
//     },
//   });

//   const $ = cheerio.load(data);

//   const results = [];

//   // Loop through Google search results
//   $('div.g').each((i, el) => {
//     const title = $(el).find('h3').text();
//     const description = $(el).find('.VwiC3b').text();

//     // Get the href from a <a> tag inside the result
//     const rawLink = $(el).find('a').attr('href');

//     // Filter only real links (not internal Google URLs)
//     if (title && description && rawLink && !rawLink.includes('google.com')) {
//       results.push({
//         title,
//         description,
//         externalLink: rawLink,
//       });
//     }
//   });
//  console.log("Scraped results:", results);

//   return results;
// };



// 8c3ab75b19cdf74cad9e969d5305ecd2996bd9b64875241835bdde65ee9f4722


import { getJson } from 'serpapi';

export const scrapeCompany = async (companyName) => {
  console.log("Scraping company info for:", companyName); // Log the company name being scraped
  try {
    const query = `${companyName} (partnership OR partner OR vendor OR outsourcing OR collaboration OR deal OR integration OR alliance OR acquisition OR expansion) site:techcrunch.com OR site:businesswire.com OR site:prnewswire.com OR site:forbes.com`;

    const results = await getJson({
      engine: "google",
      q: query,
      api_key: "8c3ab75b19cdf74cad9e969d5305ecd2996bd9b64875241835bdde65ee9f4722",
    });

    const organicResults = results.organic_results || [];

    // return organicResults.map(res => ({
    //   title: res.title,
    //   description: res.snippet,
    //   externalLink: res.link,
    // })).filter(item => item.externalLink); // Filter out entries without a link


    const filtered = results.organic_results.filter(item =>
      item.link &&
      (item.link.includes('techcrunch.com') ||
       item.link.includes('businesswire.com') ||
       item.link.includes('prnewswire.com') ||
       item.link.includes('forbes.com'))
    );
    
    return filtered.map(item => ({
      title: item.title,
      description: item.snippet,
      externalLink: item.link
    }));


  } catch (err) {
    console.error("Error scraping company info:", err.message);
    return [];
  }
};
