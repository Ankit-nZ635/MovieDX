import mongoose from "mongoose";
import https from "https";

const MONGO_URL = "mongodb+srv://ankit_ekka_db:dbAnkitekka@icine.36picpj.mongodb.net/iCinema?appName=iCine";
const OMDB_API_KEY = "4aebbc48";
const YOUTUBE_API_KEY = "AIzaSyDyM7Zh9m-lZU4_4HTx70upO2IRfBLPGk0"; 

const genreSchema = mongoose.Schema({ name: String });
const Genre = mongoose.model("Genre", genreSchema);

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

const streamingLinks = {
  "The Dark Knight":        { prime: "https://www.primevideo.com/detail/The-Dark-Knight/0I8EBSOBBSDT5CJQPW7JCNIOZE", netflix: "", hotstar: "", youtube: "" },
  "Inception":              { netflix: "https://www.netflix.com/title/70131314", prime: "", hotstar: "", youtube: "" },
  "The Matrix":             { prime: "https://www.primevideo.com/detail/The-Matrix/0TS9BFPEZ8HPSDNXKPUBNWBXEX", netflix: "", hotstar: "", youtube: "" },
  "Gladiator":              { prime: "https://www.primevideo.com/detail/Gladiator/0GY5YKQEWMSMKQIIACC0KDAQZE", netflix: "", hotstar: "", youtube: "" },
  "Avengers Endgame":       { hotstar: "https://www.hotstar.com/in/movies/avengers-endgame/1260010547", netflix: "", prime: "", youtube: "" },
  "John Wick":              { prime: "https://www.primevideo.com/detail/John-Wick/0SZZEVZASBT0ZKPQWMEAXMHZCE", netflix: "", hotstar: "", youtube: "" },
  "Mad Max Fury Road":      { netflix: "https://www.netflix.com/title/80028702", prime: "", hotstar: "", youtube: "" },
  "Die Hard":               { prime: "https://www.primevideo.com/detail/Die-Hard/0TIYNUBS4CXNWVXNODRJ5KYVCE", netflix: "", hotstar: "", youtube: "" },
  "Mission Impossible":     { prime: "https://www.primevideo.com/detail/Mission-Impossible/0S1MG5EBTXF6WLMHW4LXKJVCE", netflix: "", hotstar: "", youtube: "" },
  "Top Gun Maverick":       { prime: "https://www.primevideo.com/detail/Top-Gun-Maverick/0SVNFMHGEZXH8KBZSE1QHBPCE", netflix: "", hotstar: "", youtube: "" },
  "Batman Begins":          { prime: "https://www.primevideo.com/detail/Batman-Begins/0ROSDB9ODE6TXZXQKB8CBHYPCE", netflix: "", hotstar: "", youtube: "" },
  "Iron Man":               { hotstar: "https://www.hotstar.com/in/movies/iron-man/1260000823", netflix: "", prime: "", youtube: "" },
  "The Shawshank Redemption": { prime: "https://www.primevideo.com/detail/The-Shawshank-Redemption/0S1MG5EBTXF6WLMHW4LXKJVCE", netflix: "", hotstar: "", youtube: "" },
  "The Godfather":          { prime: "https://www.primevideo.com/detail/The-Godfather/0TIYNUBS4CXNWVXNODRJ5KYVCE", netflix: "", hotstar: "", youtube: "" },
  "Forrest Gump":           { prime: "https://www.primevideo.com/detail/Forrest-Gump/0SY4NQNM5GXQ5XOABDTM1QPCE", netflix: "", hotstar: "", youtube: "" },
  "Schindler's List":       { prime: "https://www.primevideo.com/detail/Schindlers-List/0I1ZEKQR4NJKWSMQHIIBVWXPCE", netflix: "", hotstar: "", youtube: "" },
  "Good Will Hunting":      { netflix: "https://www.netflix.com/title/17236542", prime: "", hotstar: "", youtube: "" },
  "A Beautiful Mind":       { prime: "https://www.primevideo.com/detail/A-Beautiful-Mind/0IHTSPM1YS5MZAHMQBIZOLOYX9", netflix: "", hotstar: "", youtube: "" },
  "The Green Mile":         { prime: "https://www.primevideo.com/detail/The-Green-Mile/0ROSDB9ODE6TXZXQKB8CBHYPCE", netflix: "", hotstar: "", youtube: "" },
  "12 Angry Men":           { prime: "https://www.primevideo.com/detail/12-Angry-Men/0TIYNUBS4CXNWVXNODRJ5KYVCE", netflix: "", hotstar: "", youtube: "" },
  "Whiplash":               { netflix: "https://www.netflix.com/title/70299275", prime: "", hotstar: "", youtube: "" },
  "The Pursuit of Happyness": { netflix: "https://www.netflix.com/title/70044605", prime: "", hotstar: "", youtube: "" },
  "Interstellar":           { prime: "https://www.primevideo.com/detail/Interstellar/0IHTSPM1YS5MZAHMQBIZOLOYX9", netflix: "", hotstar: "", youtube: "" },
  "Arrival":                { prime: "https://www.primevideo.com/detail/Arrival/0S1MG5EBTXF6WLMHW4LXKJVCE", netflix: "", hotstar: "", youtube: "" },
  "The Martian":            { hotstar: "https://www.hotstar.com/in/movies/the-martian/1260000823", netflix: "", prime: "", youtube: "" },
  "Gravity":                { netflix: "https://www.netflix.com/title/70263348", prime: "", hotstar: "", youtube: "" },
  "Ex Machina":             { prime: "https://www.primevideo.com/detail/Ex-Machina/0SZZEVZASBT0ZKPQWMEAXMHZCE", netflix: "", hotstar: "", youtube: "" },
  "2001 A Space Odyssey":   { prime: "https://www.primevideo.com/detail/2001-A-Space-Odyssey/0TIYNUBS4CXNWVXNODRJ5KYVCE", netflix: "", hotstar: "", youtube: "" },
  "Blade Runner 2049":      { netflix: "https://www.netflix.com/title/80185621", prime: "", hotstar: "", youtube: "" },
  "District 9":             { netflix: "https://www.netflix.com/title/70113536", prime: "", hotstar: "", youtube: "" },
  "Dune":                   { hotstar: "https://www.hotstar.com/in/movies/dune/1260090471", netflix: "", prime: "", youtube: "" },
  "Avatar":                 { hotstar: "https://www.hotstar.com/in/movies/avatar/1260000823", netflix: "", prime: "", youtube: "" },
  "Pulp Fiction":           { netflix: "https://www.netflix.com/title/880717", prime: "", hotstar: "", youtube: "" },
  "Goodfellas":             { prime: "https://www.primevideo.com/detail/Goodfellas/0ROSDB9ODE6TXZXQKB8CBHYPCE", netflix: "", hotstar: "", youtube: "" },
  "Fight Club":             { prime: "https://www.primevideo.com/detail/Fight-Club/0I1ZEKQR4NJKWSMQHIIBVWXPCE", netflix: "", hotstar: "", youtube: "" },
  "The Silence of the Lambs": { prime: "https://www.primevideo.com/detail/The-Silence-of-the-Lambs/0S1MG5EBTXF6WLMHW4LXKJVCE", netflix: "", hotstar: "", youtube: "" },
  "Se7en":                  { netflix: "https://www.netflix.com/title/26005766", prime: "", hotstar: "", youtube: "" },
  "No Country for Old Men": { prime: "https://www.primevideo.com/detail/No-Country-for-Old-Men/0TIYNUBS4CXNWVXNODRJ5KYVCE", netflix: "", hotstar: "", youtube: "" },
  "The Departed":           { prime: "https://www.primevideo.com/detail/The-Departed/0IHTSPM1YS5MZAHMQBIZOLOYX9", netflix: "", hotstar: "", youtube: "" },
  "Prisoners":              { prime: "https://www.primevideo.com/detail/Prisoners/0ROSDB9ODE6TXZXQKB8CBHYPCE", netflix: "", hotstar: "", youtube: "" },
  "Gone Girl":              { hotstar: "https://www.hotstar.com/in/movies/gone-girl/1260000823", netflix: "", prime: "", youtube: "" },
  "Zodiac":                 { prime: "https://www.primevideo.com/detail/Zodiac/0SZZEVZASBT0ZKPQWMEAXMHZCE", netflix: "", hotstar: "", youtube: "" },
  "Titanic":                { prime: "https://www.primevideo.com/detail/Titanic/0SZZEVZASBT0ZKPQWMEAXMHZCE", netflix: "", hotstar: "", youtube: "" },
  "The Lion King":          { hotstar: "https://www.hotstar.com/in/movies/the-lion-king/1260008394", netflix: "", prime: "", youtube: "" },
  "Toy Story":              { hotstar: "https://www.hotstar.com/in/movies/toy-story/1260000823", netflix: "", prime: "", youtube: "" },
  "The Shining":            { prime: "https://www.primevideo.com/detail/The-Shining/0TIYNUBS4CXNWVXNODRJ5KYVCE", netflix: "", hotstar: "", youtube: "" },
  "Parasite":               { prime: "https://www.primevideo.com/detail/Parasite/0S1MG5EBTXF6WLMHW4LXKJVCE", netflix: "", hotstar: "", youtube: "" },
  "Joker":                  { hotstar: "https://www.hotstar.com/in/movies/joker/1260009252", netflix: "", prime: "", youtube: "" },
  "1917":                   { prime: "https://www.primevideo.com/detail/1917/0SVNFMHGEZXH8KBZSE1QHBPCE", netflix: "", hotstar: "", youtube: "" },
  "Dunkirk":                { prime: "https://www.primevideo.com/detail/Dunkirk/0ROSDB9ODE6TXZXQKB8CBHYPCE", netflix: "", hotstar: "", youtube: "" },
  "Oppenheimer":            { prime: "https://www.primevideo.com/detail/Oppenheimer/0SVNFMHGEZXH8KBZSE1QHBPCE", netflix: "", hotstar: "", youtube: "" },
  "Tenet":                  { prime: "https://www.primevideo.com/detail/Tenet/0IHTSPM1YS5MZAHMQBIZOLOYX9", netflix: "", hotstar: "", youtube: "" },
};

const movieTitles = [
  "Baahubali: The Beginning","The Dark Knight", "Inception", "The Matrix", "Gladiator","Housefull 5",
  "Avengers Endgame", "John Wick", "Mad Max Fury Road", "Die Hard",
  "Mission Impossible", "Top Gun Maverick", "Batman Begins", "Iron Man",
  "The Shawshank Redemption", "The Godfather", "Forrest Gump",
  "Schindler's List", "Good Will Hunting", "A Beautiful Mind",
  "The Green Mile", "12 Angry Men", "Whiplash", "The Pursuit of Happyness",
  "Interstellar", "Arrival", "The Martian", "Gravity",
  "Ex Machina", "2001 A Space Odyssey", "Blade Runner 2049",
  "District 9", "Dune", "Avatar",
  "Pulp Fiction", "Goodfellas", "Fight Club",
  "The Silence of the Lambs", "Se7en", "No Country for Old Men",
  "The Departed", "Prisoners", "Gone Girl", "Zodiac",
  "Titanic", "The Lion King", "Toy Story",
  "The Shining", "Parasite", "Joker",
  "1917", "Dunkirk", "Oppenheimer", "Tenet",
];

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

function fetchTrailer(title) {
  return new Promise((resolve, reject) => {
    const query = encodeURIComponent(`${title} official trailer`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${YOUTUBE_API_KEY}&type=video&maxResults=1`;
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const result = JSON.parse(data);
        if (result.items && result.items.length > 0) {
          const videoId = result.items[0].id.videoId;
          resolve(`https://www.youtube.com/watch?v=${videoId}`);
        } else {
          resolve("");
        }
      });
    }).on("error", reject);
  });
}

const trailerLinks = {
  
  "Baahubali: The Beginning": "https://www.youtube.com/watch?v=3NQRhE772b0",
  "The Dark Knight":          "https://www.youtube.com/watch?v=EXeTwQWrcwY",
  "Inception":                "https://www.youtube.com/watch?v=YoHD9XEInc0",
  "The Matrix":               "https://www.youtube.com/watch?v=vKQi3bBA1y8",
  "Gladiator":                "https://www.youtube.com/watch?v=owK1qxDselE",
  "Avengers Endgame":         "https://www.youtube.com/watch?v=TcMBFSGVi1c",
  "John Wick":                "https://www.youtube.com/watch?v=2AUmvWm5ZDQ",
  "Mad Max Fury Road":        "https://www.youtube.com/watch?v=hEJnMQG9ev8",
  "Die Hard":                 "https://www.youtube.com/watch?v=jaJuwKCmJbY",
  "Mission Impossible":       "https://www.youtube.com/watch?v=4aKfNMQa8KU",
  "Top Gun Maverick":         "https://www.youtube.com/watch?v=giXco2jaZ_4",
  "Batman Begins":            "https://www.youtube.com/watch?v=neY2xVmOfUM",
  "Iron Man":                 "https://www.youtube.com/watch?v=8ugaeA-nMTc",
  "The Shawshank Redemption": "https://www.youtube.com/watch?v=6hB3S9bIaco",
  "The Godfather":            "https://www.youtube.com/watch?v=sY1S34973zA",
  "Forrest Gump":             "https://www.youtube.com/watch?v=bLvqoHBptjg",
  "Schindler's List":         "https://www.youtube.com/watch?v=gG22XNhtnoY",
  "Good Will Hunting":        "https://www.youtube.com/watch?v=ReIGvBNNMB0",
  "A Beautiful Mind":         "https://www.youtube.com/watch?v=YWwAOutgWBQ",
  "The Green Mile":           "https://www.youtube.com/watch?v=Ki4haFrqSrw",
  "12 Angry Men":             "https://www.youtube.com/watch?v=F7OSZDE5ey0",
  "Whiplash":                 "https://www.youtube.com/watch?v=7d_jQycdQGo",
  "The Pursuit of Happyness": "https://www.youtube.com/watch?v=DMOBlEcRuw8",
  "Interstellar":             "https://www.youtube.com/watch?v=zSWdZVtXT7E",
  "Arrival":                  "https://www.youtube.com/watch?v=tFMo3UJ4B4g",
  "The Martian":              "https://www.youtube.com/watch?v=Ue4PCI0NamI",
  "Gravity":                  "https://www.youtube.com/watch?v=OiTiKEKoA8",
  "Ex Machina":               "https://www.youtube.com/watch?v=EoQuVnKhxaM",
  "2001 A Space Odyssey":     "https://www.youtube.com/watch?v=oR_e9y-bka0",
  "Blade Runner 2049":        "https://www.youtube.com/watch?v=gCcx85zbxz4",
  "District 9":               "https://www.youtube.com/watch?v=DyLUwOcR5pk",
  "Dune":                     "https://www.youtube.com/watch?v=8g18jFHCLXk",
  "Avatar":                   "https://www.youtube.com/watch?v=5PSNL1qE6VY",
  "Pulp Fiction":             "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
  "Goodfellas":               "https://www.youtube.com/watch?v=qo5jJpHtI1Y",
  "Fight Club":               "https://www.youtube.com/watch?v=qtRKdVHc-cE",
  "The Silence of the Lambs": "https://www.youtube.com/watch?v=W6Mm8Sbe__o",
  "Se7en":                    "https://www.youtube.com/watch?v=znmZoVkCjpI",
  "No Country for Old Men":   "https://www.youtube.com/watch?v=38A__WT3-o0",
  "The Departed":             "https://www.youtube.com/watch?v=iNb4WGs2OEk",
  "Prisoners":                "https://www.youtube.com/watch?v=0bKkGeROiPA",
  "Gone Girl":                "https://www.youtube.com/watch?v=2-UuiH03c9E",
  "Zodiac":                   "https://www.youtube.com/watch?v=i_TmCTGzaB0",
  "Titanic":                  "https://www.youtube.com/watch?v=2e-eXJ6HgkQ",
  "The Lion King":            "https://www.youtube.com/watch?v=7TavVZMewpY",
  "Toy Story":                "https://www.youtube.com/watch?v=KYz2wyBy3kc",
  "The Shining":              "https://www.youtube.com/watch?v=5Cb3ik6zP2I",
  "Parasite":                 "https://www.youtube.com/watch?v=5xH0HfJHsaY",
  "Joker":                    "https://www.youtube.com/watch?v=zAGVQLHvwOY",
  "1917":                     "https://www.youtube.com/watch?v=YqNYrYUiMfg",
  "Dunkirk":                  "https://www.youtube.com/watch?v=F-eMt3SrfFU",
  "Oppenheimer":              "https://www.youtube.com/watch?v=uYPbbksJxIg",
  "Tenet":                    "https://www.youtube.com/watch?v=LdOM0x0XDMo",
};

const upcomingMovies = [
  {
    title: "Avatar 3",
    releaseDate: "2026-12-19",
    description: "The third installment of James Cameron's Avatar saga continues the story of the Sully family.",
    image: "https://m.media-amazon.com/images/M/MV5BODkzZDQ5OTQtMzM4Zi00ZWVlLTkxMjQtOTg0NmU3ZjYyZjNkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    trailerLink: "https://www.youtube.com/watch?v=5PSNL1qE6VY",
    genre: ["Action", "Adventure", "Sci-Fi"],
    isUpcoming: true,
    rate: 0,
    movieLength: 0,
  },
  {
    title: "Avengers: Doomsday",
    releaseDate: "2026-05-01",
    description: "The Avengers face their greatest threat yet as Doctor Doom arrives to change everything.",
    image: "https://m.media-amazon.com/images/M/MV5BNGQwNDMzNmQtMWRjZC00NjA5LTkxNjQtZTQ3NDgwMGI1YzVlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    trailerLink: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    genre: ["Action", "Adventure", "Sci-Fi"],
    isUpcoming: true,
    rate: 0,
    movieLength: 0,
  },
  {
    title: "Mission: Impossible 8",
    releaseDate: "2026-05-22",
    description: "Ethan Hunt returns for the final chapter of the Mission Impossible saga.",
    image: "https://m.media-amazon.com/images/M/MV5BYzExMjhiZmYtZGQyNy00NGM4LTk2NjAtOTc4MDljMzA3MjkxXkEyXkFqcGdeQXVyODk4OTc3MDY@._V1_SX300.jpg",
    trailerLink: "https://www.youtube.com/watch?v=avz06PDqDbM",
    genre: ["Action", "Thriller"],
    isUpcoming: true,
    rate: 0,
    movieLength: 0,
  },
  {
    title: "Jurassic World Rebirth",
    releaseDate: "2026-07-02",
    description: "A new chapter in the Jurassic World franchise with a completely fresh cast and story.",
    image: "https://m.media-amazon.com/images/M/MV5BZjZjZjZkZTItNzNiOS00MjM2LTk4YTAtNGUxOWVkNzMzNTBhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    trailerLink: "https://www.youtube.com/watch?v=aJJrkyHas78",
    genre: ["Action", "Adventure", "Sci-Fi"],
    isUpcoming: true,
    rate: 0,
    movieLength: 0,
  },
  {
    title: "Superman",
    releaseDate: "2026-07-11",
    description: "James Gunn's highly anticipated reboot of Superman for the new DC Universe.",
    image: "https://m.media-amazon.com/images/M/MV5BZjI0ZWFmZDQtMzliOS00YmE4LWE3ZTItMWM4ZjY2ZmE1ZmJiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    trailerLink: "https://www.youtube.com/watch?v=KVu3gS7iJu4",
    genre: ["Action", "Adventure"],
    isUpcoming: true,
    rate: 0,
    movieLength: 0,
  },
  {
    title: "Black Panther 3",
    releaseDate: "2026-11-06",
    description: "The next chapter in the Black Panther saga from Marvel Studios.",
    image: "https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MDY@._V1_SX300.jpg",
    trailerLink: "https://www.youtube.com/watch?v=_Z3QKkl1WyM",
    genre: ["Action", "Adventure"],
    isUpcoming: true,
    rate: 0,
    movieLength: 0,
  },
];

async function seedMovies() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");

    await Movie.deleteMany({});
    await Genre.deleteMany({});
    console.log("Cleared existing data...");

    const genreNames = ["Action", "Crime", "Drama", "Sci-Fi", "Thriller",
      "Adventure", "Biography", "Romance", "Mystery", "History"];
    const genreDocs = await Genre.insertMany(genreNames.map(name => ({ name })));
    console.log("✅ Genres created!");

    const genreMap = {};
    genreDocs.forEach(g => genreMap[g.name] = g._id);

    const movies = [];

    for (const title of movieTitles) {
      const data = await fetchMovie(title);
      if (data.Response === "True") {
         
        const genreIds = data.Genre.split(", ")
          .map(g => genreMap[g.trim()])
          .filter(Boolean);

        movies.push({
          title: data.Title,
          genre: genreIds,
          rate: parseFloat(data.imdbRating) || 0,
          description: data.Plot,
          image: data.Poster !== "N/A" ? data.Poster : "",
          trailerLink: trailerLinks[title] || "",
          movieLength: parseInt(data.Runtime) || 0,
          whereToWatch: streamingLinks[title] || { netflix: "", prime: "", hotstar: "", youtube: "" }, // ← KEY LINE
        });
        console.log(`✅ Fetched: ${data.Title} | Trailer: ${trailerLinks[title]  ? "✅" : "❌"}`);
      } else {
        console.log(`❌ Not found: ${title}`);
      }
    }

    await Movie.insertMany(movies);
    console.log(`\n🎬 ${movies.length} movies added successfully!`);

  // Save upcoming movies with OMDb posters
const upcomingWithGenres = [];

for (const movie of upcomingMovies) {
  const omdbData = await fetchMovie(movie.title);
  const poster = omdbData.Response === "True" && omdbData.Poster !== "N/A"
    ? omdbData.Poster
    : movie.image;

  upcomingWithGenres.push({
    ...movie,
    image: poster,
    genre: movie.genre.map(g => genreMap[g]).filter(Boolean),
  });
  console.log(`🎬 Upcoming: ${movie.title} | Poster: ${poster ? "✅" : "❌"}`);
}

await Movie.insertMany(upcomingWithGenres);
console.log(`✅ ${upcomingMovies.length} upcoming movies added!`);

    mongoose.connection.close();
  } catch (err) {
    console.log("Error:", err);
  }
}

seedMovies();