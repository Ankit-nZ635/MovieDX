import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  favouriteMovies: [{ type: String }],
  watchlist: [{
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    addedAt: { type: Date, default: Date.now },
    watched: { type: Boolean, default: false },
  }],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isNew && !this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
