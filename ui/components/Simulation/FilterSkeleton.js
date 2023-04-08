import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const FilterSkeleton = ({ filters, classes }) => {
  return Array(filters)
    .fill(0)
    .map((item, i) => (
      <div key={i} className={classes}>
        <Skeleton height={"100%"} />
      </div>
    ));
};

export default FilterSkeleton;
