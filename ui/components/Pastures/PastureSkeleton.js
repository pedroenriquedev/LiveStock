import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const PastureSkeleton = ({ pastures }) => {
  return Array(pastures)
    .fill(0)
    .map((item, i) => (
      <div key={i}>
        <Skeleton height={51} />
      </div>
    ));
};

export default PastureSkeleton;
