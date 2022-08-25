const Pasture = require("../models/pastureModel");

exports.createPasture = async (req, res, next) => {
  try {
    const newDoc = await Pasture.create(req.body);

    res.status(200).json({
      status: "success",
      data: newDoc,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllPastures = async (req, res, next) => {
  try {
    const batches = await Pasture.find();
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

exports.getOnePasture = async (req, res, next) => {
  try {
    const doc = await Pasture.findById(req.params.id).populate({
      path: "herd",
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

exports.updatePasture = async (req, res, next) => {
  try {
    const doc = await Pasture.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new Error("No batch found with this id.");

    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePasture = async (req, res, next) => {
  try {
    const doc = await Pasture.findByIdAndRemove(req.params.id);

    if (!doc) throw new Error("No batch found with this id.");

    res.status(204).json({
      status: "success",
      message: "Pasture was deleted.",
    });
  } catch (error) {
    next(error);
  }
};
