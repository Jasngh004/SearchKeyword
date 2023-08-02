import './Search.css';
import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyAAYOn_FDHvF7bcufLe12uzYryEPdsnHKE';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [searchVolumeData, setSearchVolumeData] = useState([]);

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSearchVolumeData();
  };

const fetchSearchVolumeData = () => {
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: API_KEY,
        q: keyword,
        part: 'snippet',
      
      },
    })
    .then(response => {
      const videoIds = response.data.items.map(item => item.id.videoId);
      return axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          key: API_KEY,
          id: videoIds.join(','),
          part: 'snippet,statistics',
        },
      });
    })
    .then(videoResponse => {
      const searchVolumes = videoResponse.data.items.map(item => {
        const snippet = item.snippet;
        const statistics = item.statistics;
  
        if (snippet && statistics) {
          return {
            month: new Date(snippet.publishedAt).toLocaleString('default', { month: 'long' }),
            count: statistics.viewCount,
          };
        }
        return null;
      });
  
   
      const validSearchVolumes = searchVolumes.filter(item => item !== null);
  

      const aggregatedSearchVolumes = validSearchVolumes.reduce((acc, item) => {
        if (!acc[item.month]) {
          acc[item.month] = 0;
        }
        acc[item.month] += parseInt(item.count, 10);
        return acc;
      }, {});
  
      setSearchVolumeData(Object.entries(aggregatedSearchVolumes));
    })
    .catch(error => {
      console.error('Error fetching search volume data:', error);
    });
  };
  
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={keyword} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchVolumeData.map(([month, count]) => (
          <div key={month}>
            <span className='result'>{month}</span> - <span className='count'>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
