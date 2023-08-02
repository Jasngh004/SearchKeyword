import './Search.css';
import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (keyword) {
  
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${keyword}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
        )
        .then((response) => {
          setSearchResults(response.data.items);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  return (
    <div className='search-box'>
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="Enter your keyword"
      />
      <button onClick={handleSearch}>Search</button>

      <ul className='search-list'>
        {searchResults.map((item) => (
          <li key={item.id.videoId}>
            <a className='search-link'
              href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.snippet.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
