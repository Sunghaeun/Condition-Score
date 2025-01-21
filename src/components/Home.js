import { useNavigate } from "react-router-dom";

import React, { useState } from 'react';
import Modal from "./Modal"

function Home() {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

    const navigate = useNavigate();
    function onClickBtn() {
        navigate('/add'); 
    }
  return (
    <div>

      
<button onClick={openModal}>모달팝업</button>
      <Modal open={modalOpen} close={closeModal} > 
      <p>안녕하십니까!
      </p>
      </Modal>

        <button type="button" onClick={onClickBtn}>
            Add
        </button>

        
    </div>
  )
}

export default Home
