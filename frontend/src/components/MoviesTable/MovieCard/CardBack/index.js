import React from "react";
import axios from "axios";
import "./style.css";

const addToWatchlist = async (e, movieId) => {
  e.stopPropagation();

  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login first");
      return;
    }

    await axios.post(
      `/api/users/${user.user.id}/watchlist/${movieId}`
    );

    alert("✅ Added to Watchlist");
  } catch (err) {
    console.log(err);

    if (err.response?.status === 400) {
      alert("⚠️ Already in Watchlist");
    }
  }
};

const CardBack = ({ ToggleFavouriteCard, id, liked, description, whereToWatch }) => {
  return ( 
    <div className="back">
      <h5>Summary</h5>
      <p>{description}</p>

      <div className="where-to-watch">
        <h5>Where to Watch</h5>
        <div className="platform-buttons">
          {whereToWatch?.netflix && (
            <a href={whereToWatch.netflix} target="_blank" rel="noopener noreferrer">
              <button className="platform-btn netflix">🎬 Netflix</button>
            </a>
          )}
          {whereToWatch?.prime && (
            <a href={whereToWatch.prime} target="_blank" rel="noopener noreferrer">
              <button className="platform-btn prime">🎬 Prime</button>
            </a>
          )}
          {whereToWatch?.hotstar && (
            <a href={whereToWatch.hotstar} target="_blank" rel="noopener noreferrer">
              <button className="platform-btn hotstar">🎬 Hotstar</button>
            </a>
          )}
          {whereToWatch?.youtube && (
            <a href={whereToWatch.youtube} target="_blank" rel="noopener noreferrer">
              <button className="platform-btn youtube">🎬 YouTube</button>
            </a>
          )}
          {!whereToWatch?.netflix && !whereToWatch?.prime && 
           !whereToWatch?.hotstar && !whereToWatch?.youtube && (
            <p className="not-available">Not available on streaming</p>
          )}
        </div>
      </div>
         <button
        className="watchlist-btn"
        onClick={(e) => addToWatchlist(e, id)}
      >
        ❤️ Add To Watchlist
      </button>
    </div>
  );
}

 export default CardBack;