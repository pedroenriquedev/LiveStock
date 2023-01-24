const Pasture = require("../models/pastureModel");
const Animal = require("../models/animalModel");
const APIFeatures = require("../utils/apiFeatures");

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
    const features = new APIFeatures(Pasture.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const pastures = await features.query;

    res.status(200).json({
      status: "success",
      data: {
        results: pastures.length,
        data: pastures,
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

exports.removeAnimalsFromPasture = async (req, res, next) => {
  try {
    const doc = await Pasture.findById(req.params.id);
    const animals = req.body.animals;

    if (!doc) throw new Error("No pasture found with this id.");

    // req.body must contain an animal
    if (!animals || animals.length < 1)
      throw new Error("No animals found to be removed.");

    const str = animals.join(" ");
    const herd = doc.herd.filter((id) => !str.includes(id.toString()));

    doc.herd = herd;

    // remove pasture reference from animals
    for (const animalId of animals) {
      await Animal.findByIdAndUpdate(animalId, {
        pasture: null,
      });
    }

    await doc.save();

    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.moveAnimalsToAnotherPasture = async (req, res, next) => {
  try {
    const { firstId, secondId } = req.params;
    const animals = req.body.animals;

    const doc1 = await Pasture.findById(firstId);
    const doc2 = await Pasture.findById(secondId);

    if (!doc1 || !doc2)
      throw new Error("No pasture found with one or both ids provided.");

    // req.body must contain an animal
    if (!animals || animals.length < 1)
      throw new Error("No animals found to be moved.");

    // remove animals from pasture 1
    const str = animals.join(" ");
    const herd = doc1.herd.filter((id) => !str.includes(id.toString()));

    doc1.herd = herd;

    // move animals to pasture 2 (update pasture 2)
    for (const animalId of animals) {
      doc2.herd.push(animalId);
    }

    // update animals with pasture 2 reference
    for (const animalId of animals) {
      await Animal.findByIdAndUpdate(animalId, {
        pasture: doc2._id,
      });
    }

    await doc1.save();
    await doc2.save();

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

exports.addAnimalsToPasture = async (req, res, next) => {
  try {
    const doc = await Pasture.findById(req.params.id);
    const animals = req.body.animals;

    if (!doc) throw new Error("No pasture found with this id.");

    // req.body must contain an animal
    if (!animals || animals.length < 1)
      throw new Error("No animals found to be added.");

    // what if animal is already ref on another pasture?
    // this job could be done in the front end to prevent this behavior
    // if not, if animal.pasture, find and update pasture removing this animal

    for (const animalId of animals) {
      doc.herd.push(animalId);
    }

    await doc.save();

    // update animals with pasture reference
    for (const animalId of animals) {
      await Animal.findByIdAndUpdate(animalId, {
        pasture: doc._id,
      });
    }

    res.status(200).json({
      status: "success",
      pasture: doc,
    });
  } catch (error) {
    next(error);
  }
};
