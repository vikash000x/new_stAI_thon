import { useState } from 'react';
import axios from 'axios';
import './SearchPage.css'; // create this for styling

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const SearchPage = () => {
  const [client, setClient] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setResult([]);
    try {
      console.log('Searching for:', client);
      const { data } = await axios.get(`http://localhost:5000/api/search?client=${client}`);
      if (Array.isArray(data.extracted)) {
        setResult(data.extracted); // 👈 Only store the extracted array
      } else {
        setError('Invalid data format received.');
      }
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
   <div className="search-container">
 <h1 className="main-title">🔍 Explore Verified Service Providers Associated with Your Target Clients</h1>
<p className="subtitle">
  Enter a client name like <strong>Microsoft</strong> or <strong>Google</strong> to discover companies offering them outsourcing or vendor services.
</p>

  <div className="search-bar">
    <input
      value={client}
      onChange={e => setClient(e.target.value)}
      placeholder="Enter client name"
    />
    <button onClick={handleSearch}>Search</button>
  </div>

  {loading && (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Fetching results, please wait...</p>
    </div>
  )}

  {error && <p className="error">{error}</p>}

  {!loading && result.length === 0 && client && (
    <div className="no-results">
      <img src="/not-found.png" alt="No results" />
      <p>No vendors found for "<strong>{client}</strong>"</p>
    </div>
  )}

  <div className="vendor-grid">
    {result.map((vendor, index) => (
      <div className="card" key={index}>
        <h2>{vendor.company}</h2>
        <p><strong>Service:</strong> {vendor.description}</p>
        <a href={vendor.externalLink} target="_blank" rel="noreferrer">sources</a>
      </div>
    ))}
  </div>
  <div className="footer">
  <h2>Crafted with 💻 by Vikash Sinha</h2>
  <div className="social-icons">
    <a href="https://github.com/vikash000x" target="_blank" rel="noreferrer">
      <FaGithub size={28} />
    </a>
    <a href="https://www.linkedin.com/in/vikash-sinha-215000259/" target="_blank" rel="noreferrer">
      <FaLinkedin size={28} />
    </a>
    <a href="mailto:vikashsinha045@gmail.com">
      <HiOutlineMail size={28} />
    </a>
  </div>
</div>
</div>






  );
};


export default SearchPage;
