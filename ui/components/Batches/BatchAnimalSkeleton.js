import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const BatchAnimalSkeleton = ({ animals, classes }) => {
  return Array(animals)
    .fill(0)
    .map((item, i) => (
      <div key={i} className={classes}>
        <Skeleton height={"100%"} />
      </div>
    ));
};

export default BatchAnimalSkeleton;
