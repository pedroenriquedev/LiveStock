import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const AnimalSkeleton = ({ animals }) => {
  return Array(animals)
    .fill(0)
    .map((item, i) => (
      <div key={i} className="animalSkeleton">
        <Skeleton height={51} />
      </div>
    ));
};

export default AnimalSkeleton;
