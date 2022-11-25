import Link from "next/link";
import { useState } from "react";
import Modal from "../components/Modal";
import NewAnimal from "../components/NewAnimal";
import { api } from "../utils/axios";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const apiUrl = "127.0.0.1:3000";

  const handleNewAnimal = async (animal) => {
    // console.log(animal);
    try {
      const res = await api.post(`/api/v1/animal`, animal);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div>
        Add an animal
        <button onClick={handleOpenModal}>Add</button>
        {isModalOpen && (
          <Modal visible={handleOpenModal} cancel={handleCloseModal}>
            <NewAnimal
              getAnimal={handleNewAnimal}
              closeModal={handleCloseModal}
            />
            {/* have an handler for each new animal component,
            this one will save right away in the db.
            the new animal in the batches screen will stack
            up until all animals are saved.
            */}
          </Modal>
        )}
      </div>

      <div>
        <Link href="/batches/create">Create a new batch</Link>
      </div>

      <div>
        Create a new pasture
        <button>Add</button>
      </div>
    </div>
  );
}
