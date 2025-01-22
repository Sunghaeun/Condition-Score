import styles from './App.module.css';
import Forms from './components/Forms.js';
import Home from './components/Home.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <div>
      <h2>컨디션 점수</h2>

  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Forms />} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
