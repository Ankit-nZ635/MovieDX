import mongoose from "mongoose";
import https from "https";

const MONGO_URL = "mongodb+srv://ankit_ekka_db:dbAnkitekka@icine.36picpj.mongodb.net/iCinema?appName=iCine";
const OMDB_API_KEY = "4aebbc48";

const movieSchema = mongoose.Schema({
  title: String, genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
  rate: Number, description: String, image: String, trailerLink: String,
  movieLength: Number,
  whereToWatch: { netflix: String, prime: String, hotstar: String, youtube: String },
  isUpcoming: { type: Boolean, default: false }, releaseDate: { type: String, default: "" },
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

function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url) { resolve(false); return; }
    https.get(url, (res) => resolve(res.statusCode === 200))
      .on("error", () => resolve(false));
  });
}

// Fallback posters for movies not on OMDB
const fallbackPosters = {
  "Avatar 3": "https://image.tmdb.org/t/p/w500/bQ2ywkchIPYqfOHoMnS3GrSHJb8.jpg",
  "Black Panther 3": "https://image.tmdb.org/t/p/w500/xnopI5Xtky18MPhigAh4LMFo7XV.jpg",
  "Mission: Impossible 8": "https://image.tmdb.org/t/p/w500/ME8xDDFRCYCTOzvoGT5IQXaupGG.jpg",
  "Avengers: Doomsday": "https://image.tmdb.org/t/p/w500/ovDhEiKDVpuFRFBathpGStvhgDi.jpg",
};

async function fixPosters() {
  try {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected...\n");

    const movies = await Movie.find({});
    let fixed = 0;

    for (const movie of movies) {
      const imageOk = await checkUrl(movie.image);
      
      if (!imageOk) {
        console.log(`❌ Broken poster: ${movie.title}`);
        
        // Try OMDB first
        const omdbData = await fetchMovie(movie.title);
        let newPoster = null;
        
        if (omdbData.Response === "True" && omdbData.Poster !== "N/A") {
          const omdbOk = await checkUrl(omdbData.Poster);
          if (omdbOk) {
            newPoster = omdbData.Poster;
            console.log(`   ✅ Fixed with OMDB poster`);
          }
        }
        
        // Fallback
        if (!newPoster && fallbackPosters[movie.title]) {
          const fallbackOk = await checkUrl(fallbackPosters[movie.title]);
          if (fallbackOk) {
            newPoster = fallbackPosters[movie.title];
            console.log(`   ✅ Fixed with fallback poster`);
          }
        }

        if (newPoster) {
          await Movie.findByIdAndUpdate(movie._id, { image: newPoster });
          fixed++;
        } else {
          console.log(`   ⚠️ No working poster found`);
        }
      }
    }

    console.log(`\n🎬 Fixed ${fixed} broken posters!`);
    mongoose.connection.close();
  } catch (err) {
    console.log("Error:", err);
  }
}

fixPosters();
