const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const tracks = require ("./routes/api/tracks");

const app = express();

// Define middleware here
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use("/api/tracks", tracks);

// Connect to the Mongo DB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
