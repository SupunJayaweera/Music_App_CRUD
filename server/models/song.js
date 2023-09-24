const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  name: String,
  artist: String,
  genre: String,
  songUrl: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

songSchema.statics.searchSongs = async function (query) {
  try {
    return await this.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive search
        { artist: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    });
  } catch (error) {
    throw error;
  }
};

const Song = mongoose.model("Song", songSchema);

module.exports = Song; // Model created
