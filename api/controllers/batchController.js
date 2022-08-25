const Batch = require("../models/batchModel");
const Animal = require("../models/animalModel");

exports.createBatch = async (req, res, next) => {
  try {
    const newDoc = await Batch.create(req.body);

    req.doc = newDoc;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getAllBatches = async (req, res, next) => {
  try {
    const batches = await Batch.find();
    res.status(200).json({
      status: "success",
      data: {
        results: batches.length,
        data: batches,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getOneBatch = async (req, res, next) => {
  try {
    const doc = await Batch.findById(req.params.id).populate({
      path: "cattle",
      options: {
        sort: {
          growthRatio: -1,
        },
      },
    });

    if (!doc) throw new Error("No document found with this id.");

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBatch = async (req, res, next) => {
  try {
    const doc = await Batch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new Error("No batch found with this id.");

    req.doc = doc;
    next();
  } catch (error) {
    next(error);
  }
};

exports.deleteBatch = async (req, res, next) => {
  try {
    const doc = await Batch.findByIdAndRemove(req.params.id);

    if (!doc) throw new Error("No batch found with this id.");

    res.status(204).json({
      status: "success",
      message: "Batch was deleted.",
    });
  } catch (error) {
    next(error);
  }
};

exports.calculateBatchTotalPrice = async (req, res, next) => {
  try {
    const batch = await Batch.findById(req.doc._id).populate("cattle");
    if (req.doc.cattle.length > 0) {
      let total = 0;
      batch.cattle.forEach(async (animal) => {
        // add reference to animal document
        await Animal.findByIdAndUpdate(animal.id, { batch: batch._id });
        total += animal.initialPrice;
      });

      batch.total = total;
      await batch.save();
    } else {
      batch.total = 0;
      await batch.save();
    }

    res.status(200).json({
      status: "success",
      data: batch,
    });
  } catch (error) {
    next(error);
  }
};
