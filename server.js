const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// const logger = require('morgan');
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');

const tracks = require("./routes/api/tracks");
const user = require('./routes/user')
const app = express();

// Define middleware here
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)

// Sessions
app.use(
	session({
		secret: 'dj-collection-stat-machine', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Routes
app.use("/api/tracks", tracks);
app.use("/user", user);

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
