import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";

const CardFront = ({
  coverImage,
  rate,
  title,
  genre,
  trailerLink,
  movieLength,
}) => {
  const [showModal, setShowModal] = useState(false);

  const getYouTubeId = (url) => {
    if (!url) return null;
    return url.split("v=")[1]?.split("&")[0];
  };

  const videoId = getYouTubeId(trailerLink);

  const modal = showModal && (
    <div
      className="modal-overlay"
      onClick={() => setShowModal(false)}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button
            className="modal-close"
            onClick={() => setShowModal(false)}
          >
            ✕
          </button>
        </div>
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allowFullScreen
          allow="autoplay; encrypted-media"
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="front">
        <img src={coverImage} alt="coverImage" />
        <div className="card-footer">
          <h4>{title}</h4>
          <p>
            {movieLength} / {genre.map((g) => g.name).join(", ")}
          </p>
          {videoId ? (
            <button
              className="trailer-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
            >
              ▶ Watch Trailer
            </button>
          ) : (
            <button className="trailer-btn disabled" disabled>
              No Trailer
            </button>
          )}
        </div>
        <span className="like">{rate}</span>
      </div>

      {/* Render modal at document.body level — above everything */}
      {ReactDOM.createPortal(modal, document.body)}
    </>
  );
};

export default CardFront;