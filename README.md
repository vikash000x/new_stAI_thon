Built by: Vikash Sinha
Project Overview
This project leverages the Gemini GenAI model and SerpAPI for web scraping to build an analytical tool that identifies companies providing services or partnering with a specified client. The tool uses advanced language processing to analyze scraped data and return meaningful insights in a structured format.

Technologies Used
Gemini GenAI: Utilized to analyze and extract relevant data from the scraped content, identifying companies and their services.

SerpAPI: Used for web scraping to gather data about companies and their services.

MongoDB: Database used to store extracted results and track past queries.

Node.js & Express: Backend server for handling requests and serving data.

Axios: Used to make HTTP requests for fetching data from the server.

Key Features
Client-Based Search: Input the name of your client, and the tool will retrieve information about companies that are providing services or are in a partnership with the client.

Web Scraping: Uses SerpAPI to scrape the web for relevant information on the client and its partners.

Data Extraction: The Gemini GenAI model processes the scraped data and extracts relevant company names, descriptions, and external links.

Persistent Storage: The extracted results are saved in MongoDB, and if the data for a client already exists, it is fetched from the database, avoiding unnecessary scraping.

Error Handling: If no data is found, the tool gracefully handles the error and provides meaningful feedback.


hosted => 

frontend, backend => render




  

