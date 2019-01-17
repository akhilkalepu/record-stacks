const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  Track: { type: String, required: true },
  Artist: { type: String, required: true },
  Album: { type: String, required: true },
  Release: { type: Date, required: true },
  Added: { type: Date, required: true },
  Genre: { type: String, required: true },
  Key: { type: Number, required: true },
  Tempo: { type: Number, required: true },
  Time: { type: Number, required: true },
  AUDIO_ID: { type: String, required: true },
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
