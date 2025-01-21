import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../App.module.css";

function Forms() {
    const[data, setData] = useState({
        bodyScore: "",
        bodyReason: "",
        emoScore: "",
        emoReason: "",
    });

    const navigate = useNavigate();
    const bodyScoreRef = useRef();
    const bodyReasonRef = useRef();
    const emoScoreRef = useRef();
    const emoReasonRef = useRef();

    const onClickBtn = () => {
        navigate(`/`);
    };

    const onChangeInput = (input) => {
        setData({
            ...data,
            [input.target.name]: input.target.value,
        });
    };

    function postDataToJSONFile(e) {
        e.preventDefault();
        if(!data.bodyScore) {
            alert("!!");
            bodyScoreRef.current.focus();
            return;
        }

        if(!data.bodyReason) {
            alert("!!");
            bodyReasonRef.current.focus();
            return;
        }

        if(!data.emoScore) {
            alert("!!");
            emoScoreRef.current.focus();
            return;
        }

        if(!data.emoReason) {
            alert("!!");
            emoReasonRef.current.focus();
            return;
        }

        console.log(data);
        
        axios.post("https://678f220a49875e5a1a90a2cf.mockapi.io/conditions", data, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            console.log(response);
            alert("입력이 완료되었습니다.");
          })
          .catch((error) => {
            alert("에러가 발생했습니다.");
            console.error(error);
          });
    }
  return (
    <form className={styles.form_group}>
        <div>
            <div>
                <div className={styles.form_pair}>
                    <div className={styles.padding_10}>
                        <label htmlFor="bodyScore">몸의 점수  </label>
                        <input onChange={onChangeInput} placeholder="5점 만점" type="number" name="bodyScore" />
                    </div>
                    <div className={styles.padding_10}>
                        <input onChange={onChangeInput} placeholder="이유를 작성해주세요!" className={styles.text_box} type="text" name="bodyReason" />
                    </div>
                </div>
            </div>

            <div>
                <div className={styles.form_pair}>
                    <div className={styles.padding_10}>
                        <label htmlFor="emoScore">마음의 점수 </label>
                        <input onChange={onChangeInput} placeholder="5점 만점" type="number" name="emoScore" />
                    </div>
                    <div className={styles.padding_10}>
                        <input onChange={onChangeInput} placeholder="이유를 작성해주세요!" className={styles.text_box} type="text" name="emoReason" />
                    </div>
                </div>
            </div>
            <button type="button" onClick={onClickBtn}>
                Close
            </button>
            <button onClick={(e) => postDataToJSONFile(e)} className={styles.submitButton} type="submit">제출</button>
        </div>
    </form>
  )
}

export default Forms;
