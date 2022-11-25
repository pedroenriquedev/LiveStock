const Animal = require("../models/animalModel");

exports.getAllAnimals = async (req, res, next) => {
  try {
    const animals = await Animal.find().sort({ dateOfPurchase: -1 });
    res.status(200).json({
      status: "success",
      data: {
        results: animals.length,
        data: animals,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createAnimal = async (req, res, next) => {
  try {
    const { dateOfPurchase } = req.body;

    const newDoc = await Animal.create(req.body);

    res.status(201).json({
      newDoc,
    });
  } catch (error) {
    next(error);
  }
};

// need to handle error here

exports.getOneAnimal = async (req, res, next) => {
  try {
    const doc = await Animal.findById(req.params.id);

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

exports.updateAnimal = async (req, res, next) => {
  try {
    const doc = await Animal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new Error("No document found with this id.");

    res.status(200).json({
      status: "success",
      data: {
        updatedData: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAnimal = async (req, res, next) => {
  const doc = await Animal.findByIdAndDelete(req.params.id);

  if (!doc) throw new Error("No document found with this id.");

  res.status(204).json({
    status: "success",
    message: "Animal was deleted.",
  });

  try {
  } catch (error) {
    next(error);
  }
};

// weight logs
exports.addWeightLog = async (req, res, next) => {
  try {
    const { weight, date } = req.body;
    const doc = await Animal.findById(req.params.id);

    if (!doc) throw new Error("No document found with this id.");

    // ensures only weight and date are pushed instead of req.body
    doc.weightLog.push({ weight, date });
    doc.currentWeight = weight;
    await doc.save();

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

// needs animal id and weightLog id /weightLog/-animalId-/-weightLogId-
exports.deleteWeightLog = async (req, res, next) => {
  try {
    const doc = await Animal.findById(req.params.animalId);

    if (!doc) throw new Error("No document found with this id.");

    const logIndex = doc.weightLog.findIndex(
      (log) => log._id.toString() === req.params.weightLogId
    );

    if (logIndex === -1) throw new Error("No weight log found with this id.");

    doc.weightLog.splice(logIndex, 1);
    await doc.save();

    res.status(204).json({
      status: "success",
      message: "Weight log was deleted.",
    });
  } catch (error) {
    next(error);
  }
};

// update
// remove
