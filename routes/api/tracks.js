const express = require("express");
const router = express.Router();

const Track = require("../../models/Track");


// @route   GET api/tracks
// @desc    Get all tracks
// @access  Public
router.get("/", (req, res) => {
    Track.find()
        .sort({ Added: -1})
        .then(tracks => res.json(tracks));
});

// @route   POST api/tracks
// @desc    Create a track object
// @access  Public
router.post("/", (req, res) => {
    const newTrack = new Track({
        Track: req.body.Track
    })
    newTrack.save().then(track => res.json(track));
});

module.exports = router;
