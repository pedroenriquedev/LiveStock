import { useEffect, useState } from "react";
import Animal from "../../components/Animal";
import { api, handleError } from "../../utils/axios";

export default function Home() {
  const [animals, setAnimals] = useState([]);

  const getAnimals = async () => {
    try {
      const res = await api.get("/api/v1/animal");
      setAnimals(res.data.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getAnimals();
  }, []);
  return (
    <div>
      <h2>Animals</h2>
      {animals.map((animal) => (
        <Animal animal={animal} key={animal._id} />
      ))}
    </div>
  );
}
