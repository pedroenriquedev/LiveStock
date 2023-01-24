const express = require("express");
const batchController = require("../controllers/batchController");

const router = express.Router();

router
  .route("/")
  .post(batchController.createBatch, batchController.calculateBatchTotalPrice)
  .get(batchController.getAllBatches);

router
  .route("/id/:id")
  .get(batchController.getOneBatch)
  .patch(batchController.updateBatch, batchController.calculateBatchTotalPrice)
  .delete(batchController.deleteBatch);

router
  .route("/createBatchWithAnimals")
  .post(
    batchController.createBatchWithAnimals,
    batchController.calculateBatchTotalPrice
  );

module.exports = router;
