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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();

  
// 1) API 호출 + 평균 계산

  const fetchConditions = async () => {
    try {
      const res = await axios.get("https://678f220a49875e5a1a90a2cf.mockapi.io/conditions");
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

  
  // 2) 전체 삭제

  const deleteAll = async () => {
    try {
      const res = await axios.get("https://678f220a49875e5a1a90a2cf.mockapi.io/conditions");
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


  // 3) 자정 체크 (매분마다)

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


  // 4) 모달 열기/닫기

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  // 5) 셀 클릭 → 모달
    const handleCellClick = (item) => {
    setSelectedData(item);
    openModal();
  };


  // 6) Add 페이지 이동
  const onClickAddPage = () => {
    navigate("/addPage");
  };


  // 7) 렌더링
  return (
    <div className={styles.mainbody}>
      {/* 헤더 */}
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
          <span style={{ marginLeft: "15px" }}>마음점수 평균: {emoAvr}</span>
        </div>
      </div>

      {/* 메인 */}
      <main className={styles.main}>
        <div className={styles.buttonContainer}>
          <button onClick={onClickAddPage}>Add</button>
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
              {/* 필요하다면 bodyScore, emoScore 등을 간단히 표시해도 됩니다. */}
            </div>
          ))}
        </div>
      </main>

      {/* 푸터 */}
      <footer className={styles.footer}></footer>

      {/* 모달 */}
      <Modal
        open={modalOpen}
        close={closeModal}
        data={selectedData}
      />
    </div>
  );
}