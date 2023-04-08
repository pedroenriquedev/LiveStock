import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const FilterSkeleton = ({ filters }) => {
  return Array(filters)
    .fill(0)
    .map((item, i) => (
      <div key={i} className="filterSkeleton">
        <Skeleton />
      </div>
    ));
};

export default FilterSkeleton;
