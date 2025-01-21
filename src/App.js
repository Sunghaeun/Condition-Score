import styles from './App.module.css';

import Forms from './components/Forms.js';
import Home from './components/Home.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import BodyScore from './components/BodyScore';
import EmotionScore from './components/EmotionScore';
import React, { useState } from 'react';
import Modal from "./components/Modal"


function App() {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Forms />} />
        </Routes>
      </BrowserRouter>
    </>

    <div>
      <h2>몸과 마음의 점수</h2>
      <form className={styles.form_group}>
        <BodyScore/>
        <EmotionScore/>
        <button className={styles.submitButton} type="submit">제출</button>
      </form>

      <button onClick={openModal}>모달팝업</button>
      {/* //header 부분에 텍스트를 입력한다. */}
      <Modal open={modalOpen} close={closeModal} header="Modal heading"> 
      <form className={styles.form_group}>
        <BodyScore/>
        <EmotionScore/>
        <button className={styles.submitButton} type="submit">제출</button>
      </form>
      </Modal>
    </div>

  );
}

export default App;
