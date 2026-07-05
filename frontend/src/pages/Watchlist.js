import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Watchlist.css";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `/api/users/${user.user.id}/watchlist`
      );

      const validWatchlist = res.data.watchlist.filter(
        (item) => item.movieId !== null
      );

      setWatchlist(validWatchlist);
      setError(null);
    } catch (err) {
      console.error("Error fetching watchlist:", err);
      setError("Failed to load watchlist: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.delete(
        `/api/users/${user.user.id}/watchlist/${movieId}`
      );

      setWatchlist((prev) =>
        prev.filter((item) => item.movieId._id !== movieId)
      );
      alert("✅ Removed from watchlist");
    } catch (err) {
      console.error("Error removing from watchlist:", err);
      alert("❌ Failed to remove");
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  if (loading) {
    return (
      <div className="watchlist-container">
        <div className="watchlist-wrapper">
          <p className="watchlist-loading">Loading watchlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="watchlist-container">
        <div className="watchlist-wrapper">
          <p className="watchlist-error">{error}</p>
        </div>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="watchlist-container">
        <div className="watchlist-wrapper">
          <p className="watchlist-empty">No movies in your watchlist</p>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-container">
      <div className="watchlist-wrapper">
        <h1 className="watchlist-title">
          🎬 My Watchlist ({watchlist.length})
        </h1>

        <div className="watchlist-grid">
          {watchlist.map((item) => (
            <div className="watchlist-card" key={item._id}>
              <img
                src={item.movieId.image}
                alt={item.movieId.title}
                className="watchlist-card-img"
              />

              <div className="watchlist-card-body">
                <h5 className="watchlist-card-title">{item.movieId.title}</h5>
                <p className="watchlist-card-date">
                  📅 {new Date(item.addedAt).toLocaleDateString()}
                </p>

                <button
                  className="watchlist-btn-remove"
                  onClick={() =>
                    removeFromWatchlist(item.movieId._id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;