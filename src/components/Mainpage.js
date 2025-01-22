import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import styles from "../styles/mainpage.module.css";
import logo from "../img/logo.png";

export default function CombinedPage() {
  const [conditions, setConditions] = useState([]);
  const [bodyAvr, setBodyAvr] = useState(0);
  const [emoAvr, setEmoAvr] = useState(0);
  const [plusCellClosed, setPlusCellClosed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();

  const fetchConditions = async () => {
    try {
      const res = await axios.get(
        "https://678f220a49875e5a1a90a2cf.mockapi.io/conditions"
      );
      const data = res.data;
      setConditions(data);
      computeAverage(data);
    } catch (err) {
      console.error(err);
    }
  };

  const computeAverage = (dataArray) => {
    if (!dataArray || dataArray.length === 0) {
      setBodyAvr(0);
      setEmoAvr(0);
      return;
    }
    let totalBody = 0;
    let totalEmo = 0;
    dataArray.forEach((item) => {
      totalBody += Number(item.bodyScore);
      totalEmo += Number(item.emoScore);
    });
    setBodyAvr(Math.round((totalBody / dataArray.length) * 10) / 10);
    setEmoAvr(Math.round((totalEmo / dataArray.length) * 10) / 10);
  };

  const deleteAll = async () => {
    try {
      const res = await axios.get(
        "https://678f220a49875e5a1a90a2cf.mockapi.io/conditions"
      );
      const scores = res.data;
      for (const item of scores) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        await axios.delete(
          "https://678f220a49875e5a1a90a2cf.mockapi.io/conditions/" + item.id
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletingAndRefresh = async () => {
    await deleteAll();
    fetchConditions();
  };

  const checkMidnight = () => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      deletingAndRefresh();
    }
  };

  useEffect(() => {
    fetchConditions();
    const intervalId = setInterval(checkMidnight, 59000);
    return () => clearInterval(intervalId);
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
  };

  const plusClick = () => {
    setSelectedData(null);
    openModal();
  };

  const handleCellClick = (item) => {
    setSelectedData(item);
    openModal();
  };

  const handleAdd = () => {
    setConditions((prev) => [
      ...prev,
      {
        id: Date.now(),
        userName: "새 사용자",
        bodyScore: 3,
        bodyReason: "New reason",
        emoScore: 4,
        emoReason: "New reason",
        recomMusic: "New music",
      },
    ]);
    closeModal();
  };

  const handleCloseCell = () => {
    setPlusCellClosed(true);
    closeModal();
  };

  const onClickAddPage = () => {
    navigate("/addPage");
  };

  return (
    <div className={styles.mainbody}>
      <div className={styles.header}>
        <div className={styles.logoArea}>
          <img
            src={logo}
            alt="멋쟁이사자처럼 로고"
            className={styles.logoImage}
          />
        </div>
        <div className={styles.average}>
          <span>몸점수 평균: {bodyAvr}</span>
          <span style={{ marginLeft: "5px" }}>
            마음점수 평균: {emoAvr}
          </span>
        </div>
      </div>

      <main className={styles.main}>
        <div style={{ marginBottom: "5px" }}>
          <button onClick={onClickAddPage}>Add</button>
          <button onClick={deletingAndRefresh} style={{ marginLeft: "5px" }}>
            Delete
          </button>
        </div>

        <div className={styles.gridContainer}>
          {conditions.map((item) => (
            <div
              className={styles.cell}
              key={item.id}
              onClick={() => handleCellClick(item)}
              style={{ cursor: "pointer" }}
            >
              <strong>{item.userName}</strong>
              <div>몸: {item.bodyScore} / {item.bodyReason}</div>
              <div>마음: {item.emoScore} / {item.emoReason}</div>
              <div>음악: {item.recomMusic}</div>
            </div>
          ))}

          {!plusCellClosed && (
            <div
              className={`${styles.cell} ${styles.plusCell}`}
              onClick={plusClick}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      </main>

      <footer className={styles.footer}>Footer</footer>

      <Modal
        open={modalOpen}
        close={closeModal}
        data={selectedData}
        handleAdd={handleAdd}
        handleCloseCell={handleCloseCell}
      />
    </div>
  );
}
