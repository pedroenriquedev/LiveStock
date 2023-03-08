const { default: mongoose } = require("mongoose");
const Animal = require("../models/animalModel");
const APIFeatures = require("../utils/apiFeatures");
const ObjectId = mongoose.Types.ObjectId;

function getMonthDiff(dateFrom, dateTo) {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
}

exports.getAllAnimals = async (req, res, next) => {
  try {
    if (!req.query.sort) {
      req.query.sort = "-dateOfPurchase";
    }

    const features = new APIFeatures(Animal.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const animals = await features.query;
    // const animals = await Animal.find({
    //   $or: [
    //     { pasture: ["6307f1f91874ad876d397238", "639674cd5276f7bc74501798"] },
    //     { batch: "6374694823e2575cf77a8d48" },
    //   ],
    // });

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
    req.body.pasture = null;
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

    doc.weightLog.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c - d;
    });

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
  try {
    const doc = await Animal.findByIdAndDelete(req.params.id);

    if (!doc) throw new Error("No document found with this id.");

    res.status(204).json({
      status: "success",
      message: "Animal was deleted.",
    });
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

    doc.weightLog.push({ weight, date });

    // update current weight with latest log (date wise, not createdAt wise)
    doc.weightLog.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c - d;
    });

    // update current weight with latest log (date wise, not createdAt wise)
    doc.currentWeight = doc.weightLog.at(-1).weight;

    const monthDiff = getMonthDiff(doc.dateOfPurchase, new Date(date));

    console.log(monthDiff);

    // Compounding Monthly Growth Rate
    // CMGR = (Final Month Value / Initial Month Value) ^ (1 / # of Months) – 1
    const averageMonthlyGrowth =
      (Math.pow(
        doc.weightLog.at(-1).weight / doc.initialWeight,
        1 / monthDiff
      ) -
        1) *
      100;

    doc.averageMonthlyGrowth = averageMonthlyGrowth;

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

const getGroupStats = async (params) => {
  const { next, batchID, pastureID } = params;

  const matchBatchStage = {};
  const matchPastureStage = {};

  const healthPipelineStages = [
    {
      $group: {
        _id: "$health",
        count: { $count: {} },
      },
    },
    {
      $sort: { _id: -1 },
    },
  ];

  const generalPipelineStages = [
    {
      $group: {
        _id: null,
        count: { $count: {} },
        avgInitialPrice: { $avg: "$initialPrice" },
        avgInitialWeight: { $avg: "$initialWeight" },
        avgWeight: { $avg: "$currentWeight" },
        initialPriceSum: { $sum: "$initialPrice" },
        avgMonthlyGrowth: { $avg: "$averageMonthlyGrowth" },
      },
    },
  ];

  if (batchID) {
    matchBatchStage.$match = { batch: ObjectId(batchID) };
    generalPipelineStages[0].$group.avgCurrentWeight = {
      $avg: "$currentWeight",
    };
    generalPipelineStages[0].$group.avgGrowth = {
      $avg: "$growthRatio",
    };
    healthPipelineStages.unshift(matchBatchStage);
    generalPipelineStages.unshift(matchBatchStage);
  }

  if (pastureID) {
    matchPastureStage.$match = { pasture: ObjectId(pastureID) };
    generalPipelineStages[0].$group.avgCurrentWeight = {
      $avg: "$currentWeight",
    };
    generalPipelineStages[0].$group.avgGrowth = {
      $avg: "$growthRatio",
    };
    healthPipelineStages.unshift(matchPastureStage);
    generalPipelineStages.unshift(matchPastureStage);
  }

  try {
    const healthStats = await Animal.aggregate(healthPipelineStages);

    const generalStats = await Animal.aggregate(generalPipelineStages);

    const { avgGrowth } = generalStats[0];

    if (avgGrowth) {
      const key = batchID ? "batch" : "pasture";

      const belowAvgGrowth = await Animal.aggregate([
        {
          $match: { growthRatio: { $lt: avgGrowth } },
        },
        {
          $match: { [key]: ObjectId(batchID || pastureID) },
        },
        {
          $group: {
            _id: null,
            count: { $count: {} },
            herd: { $push: "$$ROOT" },
          },
        },
        {
          $addFields: {
            avg: avgGrowth,
          },
        },
      ]);
      return { healthStats, generalStats, belowAvgGrowth };
    }

    return { healthStats, generalStats };
  } catch (error) {
    return next(error);
  }
};

exports.getAnimalStats = async (req, res, next) => {
  const { batchID, pastureID } = req.body;

  try {
    const stats = await getGroupStats({ next, batchID, pastureID });

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (error) {
    next(error);
  }
};
// update
// remove
