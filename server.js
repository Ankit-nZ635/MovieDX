import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);
require("dotenv").config({ path: `${__dirname}/.env` });

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express();

import users from "./controller/user.js";
import auth from "./controller/auth.js";
import movie from "./controller/movie.js";
import genre from "./controller/genre.js";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));

import "./utils/mongodb.js";

app.use("/api/movies", movie);
app.use("/api/genres", genre);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(express.static("frontend/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));