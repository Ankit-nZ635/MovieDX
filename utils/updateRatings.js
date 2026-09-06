import mongoose from "mongoose";
import https from "https";

const MONGO_URL = "mongodb+srv://ankit_ekka_db:dbAnkitekka@icine.36picpj.mongodb.net/iCinema?appName=iCine";
const OMDB_API_KEY = "4aebbc48";

const movieSchema = mongoose.Schema({
  title: String,
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
  rate: Number,
  description: String,
  image: String,
  trailerLink: String,
  movieLength: Number,
  whereToWatch: {
    netflix: String,
    prime: String,
    hotstar: String,
    youtube: String,
  },
  isUpcoming: { type: Boolean, default: false },
  releaseDate: { type: String, default: "" },
});

const Movie = mongoose.model("Movie", movieSchema);

function fetchMovie(title) {
  return new Promise((resolve, reject) => {
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`;
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", reject);
  });
}

async function updateRatings() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");

    // Find movies with rate 0 (mostly upcoming movies that may now have ratings)
    const moviesToUpdate = await Movie.find({ rate: 0 });
    console.log(`Found ${moviesToUpdate.length} movies with rating 0\n`);

    let updated = 0;

    for (const movie of moviesToUpdate) {
      const omdbData = await fetchMovie(movie.title);

      if (omdbData.Response === "True") {
        const newRating = parseFloat(omdbData.imdbRating) || 0;
        const newLength = parseInt(omdbData.Runtime) || movie.movieLength;
        const newDesc = omdbData.Plot !== "N/A" ? omdbData.Plot : movie.description;
        const newPoster = omdbData.Poster !== "N/A" ? omdbData.Poster : movie.image;

        if (newRating > 0) {
          await Movie.findByIdAndUpdate(movie._id, {
            rate: newRating,
            movieLength: newLength,
            description: newDesc,
            image: newPoster,
          });
          console.log(`✅ Updated: ${movie.title} | Rating: 0 → ${newRating}`);
          updated++;
        } else {
          console.log(`⏳ Skipped: ${movie.title} | Still no rating on OMDB`);
        }
      } else {
        console.log(`❌ Not found on OMDB: ${movie.title}`);
      }
    }

    console.log(`\n🎬 Updated ${updated} out of ${moviesToUpdate.length} movies!`);
    mongoose.connection.close();
  } catch (err) {
    console.log("Error:", err);
  }
}

updateRatings();
