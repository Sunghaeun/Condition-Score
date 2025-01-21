import {React,  useEffect, useState } from 'react'
import { useNavigate} from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import Modal from "./Modal";
import styles from "../style/modal.css";


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

    function onClickDeleteBtn() {
        deleteAll();
        //window.location.reload();
    }

    function getDataFromJSONFile() {
          axios.get("https://678f220a49875e5a1a90a2cf.mockapi.io/conditions")
            .then((response) => {
                const scores = response.data;
                console.log(scores);
                scores.forEach((item) => {
                    $("#responseList").append(`
                          <div class="reponse-list">
                            <span class="bodyScore">${item.bodyScore}</span>
                            <span class="bodyReason">${item.bodyReason}</span>
                            <span class="emoScore">${item.emoScore}</span>
                            <span class="emoReason">${item.emoReason}</span>
                          </div>
                        `);
                  });
            })
            .catch((error) => {
                console.error("에러: ", error);
            });
      }

      function deleteAll() {
        axios.get("https://678f220a49875e5a1a90a2cf.mockapi.io/conditions")
            .then((response) => {
                const scores = response.data;
                console.log(scores);
                scores.forEach((item) => {
                    let deleteID = item.id;
                    console.log("deleteId" + deleteID);
                    axios.delete("https://678f220a49875e5a1a90a2cf.mockapi.io/conditions/" + deleteID)
                    .catch(error => {
                            console.error("Error:", error);
                        });
                  });
            });
      }

    window.onload = useEffect(() => {
        getDataFromJSONFile();
    }, []);
        
    return (
        <div>
            <div id="responseList"></div>
            <button type="button" onClick={onClickBtn}>
                Add
            </button>
            <button type="button" onClick={onClickDeleteBtn}>
                Delete
            </button>

        <button onClick={openModal}>모달팝업</button>
        {/* //header 부분에 텍스트를 입력한다. */}
        <Modal open={modalOpen} close={closeModal} header="Modal heading"> 
        <form className={styles.form_group}>
          <button className={styles.submitButton} type="submit">제출</button>
        </form>
        </Modal>
    </div>
  )
}

export default Home
