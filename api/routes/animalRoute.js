const express = require("express");
const animalController = require("../controllers/animalController");

const router = express.Router();

router
  .route("/")
  .get(animalController.getAllAnimals)
  .post(animalController.createAnimal);

router
  .route("/:id")
  .get(animalController.getOneAnimal)
  .patch(animalController.updateAnimal)
  .delete(animalController.deleteAnimal);

router.route("/weightlog/:id").patch(animalController.addWeightLog);

router
  .route("/weightlog/:animalId/:weightLogId")
  .delete(animalController.deleteWeightLog);

module.exports = router;
