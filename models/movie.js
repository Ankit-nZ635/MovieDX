import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
  image: { type: String },
  rate: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
  trailerLink: { type: String },
  movieLength: { type: String, required: true },
  whereToWatch: {
    netflix: { type: String, default: "" },
    prime: { type: String, default: "" },
    hotstar: { type: String, default: "" },
    youtube: { type: String, default: "" },
  },
 releaseDate: { type: String, default: "" },
 isUpcoming: { type: Boolean, default: false },
});

const Movie = mongoose.model("Movie", movieSchema);
 export default Movie;