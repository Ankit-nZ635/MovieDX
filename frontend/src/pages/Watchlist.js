import React, { useEffect, useState } from "react";
import axios from "axios";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
        `/api/users/${user.user.id}/watchlist`
      );

      setWatchlist(res.data.watchlist);
    } catch (err) {
      console.log(err);
    }
  };
 
  const removeFromWatchlist = async (movieId) => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    await axios.delete(
      `/api/users/${user.user.id}/watchlist/${movieId}`
    );

    setWatchlist((prev) =>
      prev.filter(
        (item) => item.movieId._id !== movieId
      )
    );
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className="background-container">
      <div className="container py-5">
        <h1 className="text-white mb-4">
          My Watchlist
        </h1>

        <div className="row">
          {watchlist.map((item) => (
  <div
    className="col-md-3 mb-4"
    key={item._id}
  >
    <div className="card">
      <img
        src={item.movieId.image}
        alt={item.movieId.title}
        className="card-img-top"
      />

      <div className="card-body">
        <h5>{item.movieId.title}</h5>

        <button
          className="btn btn-danger btn-sm mt-2"
          onClick={() =>
            removeFromWatchlist(item.movieId._id)
          }
        >
          Remove
        </button>

      </div>
    </div>
  </div>
))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;