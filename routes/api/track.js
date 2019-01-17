const router = require("express").Router();
const tracksController = require("../../controllers/tracksController");

// Matches with "/api/tracks"
router.route("/")
    .post(tracksController.create);

// Matches with "/api/tracks/:id"
router
    // .route("/:id")
    // .get(booksController.findById)
    // .put(booksController.update)
    // .delete(booksController.remove);

module.exports = router;
