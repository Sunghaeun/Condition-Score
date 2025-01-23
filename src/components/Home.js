import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import Modal from "./Modal";
import styles from "../style/modal.css";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [bodyAvr, setBodyAvr] = useState(0);
  const [emoAvr, setEmoAvr] = useState(0);
    
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  function addBodyAvr(e) {
    setBodyAvr(bodyAvr => bodyAvr + e);
    console.log(bodyAvr);
  }

  function addEmoAvr(e) {
    setEmoAvr(emoAvr => emoAvr + e);
    console.log(emoAvr);
  }

    const navigate = useNavigate();

    function onClickBtn() {
        navigate('/addPage'); 
    }

    // 삭제 후 화면 갱신을 위한 함수
    function refreshData() {
        $("#responseList").empty(); // 기존 데이터 비우기
        getDataFromJSONFile(); // 데이터 다시 불러오기
    }

    function deletingAndRefresh() {
        deleteAll().then(() => {
            refreshData(); // 삭제 완료 후 화면 갱신
        });
    }

    let counter = 0;

    function getDataFromJSONFile() {
        return axios.get("https://678f220a49875e5a1a90a2cf.mockapi.io/conditions")
            .then((response) => {
                const scores = response.data;
                console.log(scores);
                $("#responseList").empty(); // 기존 데이터 비우기
                scores.forEach((item) => {
                    counter++;
                    addBodyAvr(item.bodyScore);
                    addEmoAvr(item.emoScore);
                    $("#responseList").append(`
                        <div class="reponse-list">
                            <span class="userName">${item.userName}</span>
                            <span class="bodyScore">${item.bodyScore}</span>
                            <span class="bodyReason">${item.bodyReason}</span>
                            <span class="emoScore">${item.emoScore}</span>
                            <span class="emoReason">${item.emoReason}</span>
                            <span class="recomMusic">${item.recomMusic}</span>
                        </div>
                    `);
                });
            })
            .then(() => {
                setBodyAvr(bodyAvr => Math.round((bodyAvr / counter * 10)) / 10);
                setEmoAvr(emoAvr => Math.round((emoAvr / counter * 10)) / 10);
            })
            .catch((error) => {
                console.error("에러: ", error);
            });
    }

    async function deleteAll() {
        try {
            const response = await axios.get("https://678f220a49875e5a1a90a2cf.mockapi.io/conditions");
            const scores = response.data;
            
            // 각 삭제 요청 사이에 지연을 두고 순차적으로 처리
            for (const item of scores) {
                await new Promise(resolve => setTimeout(resolve, 1)); // 1ms 지연
                await axios.delete("https://678f220a49875e5a1a90a2cf.mockapi.io/conditions/" + item.id);
                console.log("deleted ID: " + item.id);
            }
            
            console.log("All items deleted successfully");
        } catch (error) {
            console.error("Delete error:", error);
        }
    }
    
    function checkMidnight() {
        const now = new Date();
      
        // 시간이 자정인지 확인
        if (now.getHours() === 0 && now.getMinutes() === 0) {
          console.log("새 날이 밝았습니다! 모든 데이터가 초기화 됩니다!"); // 실행할 작업
          deletingAndRefresh();
        }
      }
      
      // 매분 시간 체크
    setInterval(checkMidnight, 59000);

    useEffect(() => {
        getDataFromJSONFile();
    }, []);

    console.log(bodyAvr);

    return (
        <div>
            <h2>컨디션 점수</h2>
            <h3>몸 컨디션 평균: {bodyAvr}</h3>
            <h3>마음 컨디션 평균: {emoAvr}</h3>
            <div id="responseList"></div>
            <button type="button" onClick={onClickBtn}>Add</button>
            <button onClick={openModal}>모달팝업</button>
            <Modal open={modalOpen} close={closeModal} header="Modal heading">
                <form className={styles.form_group}>
                    <button className={styles.submitButton} type="submit">제출</button>
                </form>
            </Modal>
        </div>
    );
}

export default Home;
