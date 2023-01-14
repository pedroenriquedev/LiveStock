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

router
  .route("/removeanimals/:id")
  .patch(pastureController.removeAnimalsFromPasture);

router
  .route("/moveanimals/:firstId/:secondId")
  .patch(pastureController.moveAnimalsToAnotherPasture);

router
  .route("/addanimalstopasture/:id")
  .patch(pastureController.addAnimalsToPasture);
//639674cd5276f7bc74501798
module.exports = router;
