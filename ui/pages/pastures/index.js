import { useEffect, useState } from "react";
import { api, handleError } from "../../utils/axios";
import styles from "../../styles/Pastures.module.css";
import CustomLink from "../../components/CustomLink";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import NewPasture from "../../components/NewPasture";

export default function Pasture() {
  const [pastures, setPastures] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getPastures = async () => {
    try {
      const res = await api.get("/api/v1/pasture");
      setPastures(res.data.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getPastures();
  }, []);

  return (
    <div>
      <h2>Pastures</h2>
      <Button onClick={handleOpenModal}>Add Pasture</Button>
      {isModalOpen && (
        <Modal visible={handleOpenModal} cancel={handleCloseModal}>
          <NewPasture />
        </Modal>
      )}

      {pastures.length > 0 ? (
        <div className={styles.pasturesContainer}>
          {pastures.map((pasture) => (
            <div className={styles.pasture} key={pasture._id}>
              <div>
                <span>name</span>
                <p>{pasture.name}</p>
              </div>

              <div>
                <span>condition</span>
                <p>{pasture.condition}</p>
              </div>

              <div>
                <span>status</span>
                <p>{pasture.status}</p>
              </div>

              <div>
                <span>quantity</span>
                <p>{pasture.herd && pasture.herd.length}</p>
              </div>

              <div>
                <CustomLink
                  href={`/pastures/${pasture._id}`}
                  text={`Details`}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span>No pastures</span>
      )}
    </div>
  );
}
