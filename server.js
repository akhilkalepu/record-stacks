const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const tracks = require("./routes/api/tracks");

const app = express();

// Define middleware here
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to the Mongo DB
mongoose
	.connect(db)
	.then(() => console.log("MongoDB connected."))
	.catch(err => console.log(err));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.use("/api/tracks", tracks);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
