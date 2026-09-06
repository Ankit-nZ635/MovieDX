import React from "react";

import FlippingCardFront from "./CardFront";
import FlippingCardBack from "./CardBack";
import "./style.css";

export default function ({ movie }) {
  const {
    _id,
    title,
    rate,
    genre,
    image,
    description,
    trailerLink,
    movieLength,
    whereToWatch,
    isUpcoming,
    releaseDate,
  } = movie;

  const coverImage = image;

  // Auto-detect: only show "Coming Soon" if the movie is marked upcoming
  // AND the release date is still in the future
  const stillUpcoming = isUpcoming && releaseDate && new Date(releaseDate) > new Date();

  function flipCard(cardID) {
    const card = document.getElementById(`${cardID}`);
    card.classList.toggle("flipped");
  }

  return (
    <div className="card-container">
      <div className="card-wrapper" id={_id} onClick={() => flipCard(_id)}>
        <FlippingCardFront
          trailerLink={trailerLink}
          coverImage={coverImage}
          rate={rate}
          movieLength={movieLength}
          genre={genre}
          title={title}
          isUpcoming={stillUpcoming}
          releaseDate={releaseDate}
        />

        <FlippingCardBack
          id={_id}
          description={description}
          whereToWatch={whereToWatch}
          isUpcoming={stillUpcoming}
          releaseDate={releaseDate}
        />
      </div>
    </div>
  );
}
