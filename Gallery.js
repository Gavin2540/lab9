import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // To check if more games are available

  const fetchGames = async () => {
    try {
      const response = await axios.get('https://api.rawg.io/api/games', {
        params: {
          key: '56c11514aeee45d7ae2b4e90a501a2dd', // Replace with your RAWG API key
          page_size: 10, // Number of games to fetch per request
          page: page, // Page number for pagination
        },
      });
      setGames((prevGames) => [...prevGames, ...response.data.results]); // Append new games
      setHasMore(response.data.next !== null); // Check if more games are available
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setError('There was an issue fetching the games. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [page]); // Fetch games whenever the page number changes

  const loadMoreGames = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number to load more games
  };

  if (loading && games.length === 0) return <p style={{ fontSize: '20px', textAlign: 'center' }}>Loading games...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div className="gallery">
      <h2 style={{ textAlign: 'center' }}>Game Covers</h2>
      <div className="images-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        {games.map((game) => (
          <div key={game.id} style={{ padding: '10px', border: '1px solid #ddd' }}>
            <img
              src={game.background_image} // Game cover image from RAWG
              alt={game.name}
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
            <p style={{ textAlign: 'center', fontSize: '18px', marginTop: '10px' }}>{game.name}</p> {/* Game name text */}
          </div>
        ))}
      </div>
      {hasMore && ( // Show Load More button if more games are available
        <button onClick={loadMoreGames} style={{ display: 'block', margin: '20px auto', padding: '10px 20px', fontSize: '16px' }}>
          Load More Games
        </button>
      )}
    </div>
  );
};

export default Gallery;
