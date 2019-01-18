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
    newTrack
        .save()
        .then(track => res.json(track));
});

// @route   POST api/tracks
// @desc    Delete a track object
// @access  Public
router.delete("/:id", (req, res) => {
    Track.findById(req.params.id)
        .then(track => track.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: true}));
});

module.exports = router;
