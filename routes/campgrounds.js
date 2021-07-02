const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgroundsController = require("../controllers/campgrounds");

const { isLoggedIn, isAuthor, validateCamground } = require("../middleware");

router
  .route("/")
  .get(catchAsync(campgroundsController.index))
  .post(
    isLoggedIn,
    validateCamground,
    catchAsync(campgroundsController.createCampground)
  );

router.get("/new", isLoggedIn, campgroundsController.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgroundsController.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    validateCamground,
    catchAsync(campgroundsController.updateCampground)
  )
  .delete(
    isLoggedIn,
    isAuthor,
    catchAsync(campgroundsController.deleteCampground)
  );

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgroundsController.renderEditForm)
);

module.exports = router;
