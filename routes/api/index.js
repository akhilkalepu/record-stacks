const router = require("express").Router();
const trackRoutes = require("./books");

// Book routes
router.use("/tracks", trackRoutes);

module.exports = router;
