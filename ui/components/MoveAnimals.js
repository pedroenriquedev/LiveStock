import React, { useEffect, useState } from "react";
import { api, handleError } from "../utils/axios";
import { useRouter } from "next/router";
import styles from "../styles/MoveAnimals.module.css";
import Button from "./Button";

const MoveAnimals = (props) => {
  const { animals, pasture } = props;
  const [endPastureId, setEndPastureId] = useState(null);
  const [pastures, setPastures] = useState([]);

  const router = useRouter();

  let filteredPastures;

  if (pasture) {
    filteredPastures = pastures.filter((e) => e._id !== pasture._id);
  } else {
    filteredPastures = [...pastures];
  }

  const getAllPastures = async () => {
    try {
      const res = await api.get(`/api/v1/pasture`);
      setPastures(res.data.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  const moveAnimalsAPI = async (endPastureId) => {
    try {
      await api.patch(
        `/api/v1/pasture/moveanimals/${pasture._id}/${endPastureId}`,
        {
          animals,
        }
      );

      router.reload();
    } catch (error) {
      handleError(error);
    }
  };

  const addAnimalsApi = async (endPastureId) => {
    try {
      await api.patch(`/api/v1/pasture/addanimalstopasture/${endPastureId}`, {
        animals,
      });

      router.reload();
    } catch (error) {
      handleError(error);
    }
  };

  const handleMoveButton = (e) => {
    if (endPastureId === null) return;
    if (!pasture) {
      addAnimalsApi(endPastureId);
      return;
    }
    moveAnimalsAPI(endPastureId);
  };

  const handleChange = (e) => {
    setEndPastureId(e.target.value);
  };

  useEffect(() => {
    if (!router.isReady) return;
    getAllPastures();
  }, [router.isReady]);

  return (
    <div className={styles.container}>
      move {animals.length} animal(s)
      {/* render options -> pastures, except pasture already in */}
      {pasture && <p>from {pasture.name} to:</p>}
      <select name="pastures" onChange={handleChange} defaultValue={"default"}>
        <option disabled value="default">
          select an option
        </option>
        {filteredPastures.map((pasture) => (
          <option key={pasture._id} value={pasture._id}>
            {pasture.name}
          </option>
        ))}
      </select>
      <Button onClick={handleMoveButton}>Move</Button>
    </div>
  );
};

export default MoveAnimals;
