const express = require("express");
const pastureController = require("../controllers/pastureController");

const router = express.Router();

router
  .route("/")
  // middleware to add reference to pasture into herd
  .post(pastureController.createPasture)
  .get(pastureController.getAllPastures);

router
  .route("/:id")
  .get(pastureController.getOnePasture)
  .delete(pastureController.deletePasture)
  .patch(pastureController.updatePasture);

module.exports = router;
