class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    if (queryObj.pasture === "null") {
      queryObj.pasture = null;
    }

    if (queryObj.batch === "null") {
      queryObj.batch = null;
    }

    if (queryObj.inclusive === "true") {
      // const animals = await Animal.find({
      //   $or: [
      //     { pasture: ["6307f1f91874ad876d397238","639674cd5276f7bc74501798"] },
      //     { batch: "6374694823e2575cf77a8d48" },
      //    ],
      // });
      const queryArray = [];

      const arr = Object.entries(queryObj);
      for (const pair of arr) {
        if (pair[0] === "inclusive") {
          break;
        }
        const field = pair[0];
        const value = pair[1];
        queryArray.push({ [field]: value });
      }

      this.query = this.query.find({
        $or: queryArray,
      });
      return this;
    }

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 500;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
