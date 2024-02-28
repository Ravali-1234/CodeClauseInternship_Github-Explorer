import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
      const data = await response.json();
      setRepositories(data.items);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  return (
    <div className="app">
      <h1>Github Explorer</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repositories..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="repository-list">
        <ul>
          {repositories.map(repo => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.full_name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
