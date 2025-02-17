import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import styles from "../styles/mainpage.module.css";
import logo from "../img/logo.png";
import Swal from 'sweetalert2';


export default function CombinedPage() {
  const [conditions, setConditions] = useState([]);
  const [bodyAvr, setBodyAvr] = useState(0);
  const [emoAvr, setEmoAvr] = useState(0);  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  

// 0.1) avr 클릭시 alert
const handleDivClick = () => {
  const allAvr = bodyAvr + emoAvr;
  if (allAvr>=8){
    Swal.fire({
      title: '오늘은 모두가 컨디션이 좋아요 !',
      text: '오늘도 파이팅 🎉!!',
      icon: 'success',
      confirmButtonText: '확인',
      confirmButtonColor: '#0A1E45'
      
    });
  } else if (allAvr<8 && allAvr >= 6){
    Swal.fire({
      title: '기분 좋은 하루가 될 것 같아요 !',
      text: '열심히 해봅시다 파이팅 !!',
      icon: 'success',
      confirmButtonText: '확인',
      confirmButtonColor: '#0A1E45'
    });
  } else if (allAvr < 6){
    Swal.fire({
      title: '시작 전 잠시 편의점을 다녀올까요?!',
      text: '기분 전환하고 파이팅 해봅시다 !',
      icon: 'error',
      confirmButtonText: '확인',
      confirmButtonColor: '#0A1E45'
    });
  }
};

//테스트용 avr alert
//4점이상
const averBox1 = () => {
  Swal.fire({
    title: '오늘은 모두가 컨디션이 좋아요 !',
    text: '오늘도 파이팅 🎉!!',
    icon: 'success',
    confirmButtonText: '확인',
    confirmButtonColor: '#0A1E45'
  });
};
//3~4점
const averBox2 = () => {
  Swal.fire({
    title: '기분 좋은 하루가 될 것 같아요 !',
      text: '열심히 해봅시다 파이팅 !!',
      icon: 'success',
      confirmButtonText: '확인',
      confirmButtonColor: '#0A1E45'
  });
};
//평균 3점이하
const averBox3 = () => {
  Swal.fire({
    title: '시작 전 잠시 편의점을 다녀올까요?!',
      text: '기분 전환하고 파이팅 해봅시다 !',
      icon: 'error',
      confirmButtonText: '확인',
      confirmButtonColor: '#0A1E45'
  });
};




// 0) 컨디션 이모지 띄우기
  function emojiProfile(profile) {
    if (profile === "happy") return "😄";
    if (profile === "excitied") return "😆";
    if (profile === "cry") return "🥲";
    if (profile === "yummy") return "😋";
    if (profile === "study") return "🤓";
    if (profile === "angry") return "😡";
    if (profile === "sick") return "🤒";
    return "😄";
  }
  
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
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.removeProperty('overflow');
  };


  // 5) 셀 클릭 → 모달
    const handleCellClick = (item) => {
      setSelectedData(item);
      console.log(item.emoProfile);
      openModal();
      document.body.style.overflow = 'hidden';
  };


  // 6) Add 페이지 이동
  const onClickAddPage = () => {
    navigate("/addPage");
  };

//   // 8) alert

// const onClickAverage = () => {
//   const allAvr = bodyAvr + emoAvr;
//   if (allAvr>8){
//     alert(`다들 컨디션이 좋은 날이네요 ! 
// 오늘도 파이팅 !!`);
//   } else if (allAvr<8 && allAvr > 6){
//     alert(`오늘도 왠지 기분 좋은 하루가 될 것 같아요 !
// 열심히 해봅시다 파이팅 !!`);
//   } else if (allAvr < 6){
//     alert(`시작 전 잠시 편의점을 다녀올까요?!
// 기분 전환하고 파이팅 해봅시다 !`);
//   }

// };

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
        <div className={styles.average} onClick={handleDivClick}>
          <span>💪 average: {bodyAvr}</span>
          <span style={{ marginLeft: "15px" }}>🩷 average: {emoAvr}</span>
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
              <span className={styles.profileEmojiStyle}>{emojiProfile(item.emoProfile)}</span>

              <strong>{item.userName}</strong>
              {/* 필요하다면 bodyScore, emoScore 등을 간단히 표시해도 됩니다. */}
            </div>
          ))}
        </div>
        
      </main>

      {/* 푸터 */}
      <footer className={styles.footer}>
        
          <span style={{color:"#FED37A", paddingLeft:"20px", paddingRight:"20px",}} onClick={averBox1}>이재호</span>
          <span style={{color:"#FED37A", paddingLeft:"20px", paddingRight:"20px",}} onClick={averBox2}>한규호</span>
          <span style={{color:"#FED37A", paddingLeft:"20px", paddingRight:"20px",}} onClick={averBox3}>성하은</span>
        
      </footer>

      {/* 모달 */}
      <Modal
        open={modalOpen}
        close={closeModal}
        data={selectedData}
      />
    </div>
  );
}