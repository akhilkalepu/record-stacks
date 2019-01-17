const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  Track: { type: String, required: true },
  Artist: { type: String, required: false },
  Album: { type: String, required: false },
  Release: { type: Date, required: false },
  Genre: { type: String, required: false },
  Key: { type: Number, required: false },
  Tempo: { type: Number, required: false },
  Time: { type: Number, required: false },
  Added: { type: Date, required: false },
  AUDIO_ID: { type: String, required: true },
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
