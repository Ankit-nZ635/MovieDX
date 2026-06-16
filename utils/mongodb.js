import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://ankit_ekka_db:dbAnkitekka@icine.36picpj.mongodb.net/iCinema?appName=iCine";

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected ..."))
  .catch((err) => console.log(err));