const express = require("express");
const router = express.Router();

const Track = require("../../models/Track");

router.get("/", (req, res) => {
    Track.find()
        .sort({ Added: -1})
        .then(tracks => res.json(tracks));
});

module.exports = router;
