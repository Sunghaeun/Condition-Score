import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../style/addpage.css";

function Home() {
  const [data, setData] = useState({
    userName: "",
    bodyScore: "",
    bodyReason: "",
    emoScore: "",
    emoReason: "",
    recomMusic: "",
  });

  const navigate = useNavigate();
  const userNameRef = useRef();
  const bodyScoreRef = useRef();
  const bodyReasonRef = useRef();
  const emoScoreRef = useRef();
  const emoReasonRef = useRef();

  const onClickBtn = () => {
    navigate(`/main`);
  };

  const onChangeInput = (input) => {
    setData({
      ...data,
      [input.target.name]: input.target.value,
    });
  };

  function postDataToJSONFile(e) {
    e.preventDefault();
    if (!data.userName) {
      alert("이름을 입력해 주세요!");
      userNameRef.current.focus();
      return;
    } else if (!data.bodyReason) {
      alert("몸 컨디션에 대한 이유를 입력해 주세요!");
      bodyReasonRef.current.focus();
      return;
    } else if (!data.bodyScore) {
      alert("몸의 점수를 입력해 주세요!");
      bodyScoreRef.current.focus();
      return;
    } else if (!data.emoScore) {
      alert("감정의 점수를 입력해 주세요!");
      emoScoreRef.current.focus();
      return;
    } else if (!data.emoReason) {
      alert("감정 상태에 대한 이유를 입력해 주세요!");
      emoReasonRef.current.focus();
      return;
    }

    axios.post("https://678f220a49875e5a1a90a2cf.mockapi.io/conditions", data, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        alert("입력이 완료되었습니다.");
        navigate('/main');
      })
      .catch((error) => {
        alert("에러가 발생했습니다.");
        console.error(error);
      });
  }

  return (
    <form className="mainContainer">
      <div className="secondContainer">
        <h2>프로필 이름</h2>
        <input
          ref={userNameRef}
          onChange={onChangeInput}
          placeholder="이름을 작성해주세요"
          type="text"
          name="userName"
        />

        <h2>프로필 이모지</h2>
        
        <h2>몸의 점수</h2>
        <input
          ref={bodyScoreRef}
          onChange={onChangeInput}
          placeholder="5점 만점"
          type="number"
          name="bodyScore"
        />
        <div>
          <input
            ref={bodyReasonRef}
            onChange={onChangeInput}
            placeholder="이유를 작성해주세요!"
            className="text_box"
            type="text"
            name="bodyReason"
          />
        </div>

        <h2>마음의 점수</h2>
        <input
          ref={emoScoreRef}
          onChange={onChangeInput}
          placeholder="5점 만점"
          type="number"
          name="emoScore"
        />
        <div>
          <input
            ref={emoReasonRef}
            onChange={onChangeInput}
            placeholder="이유를 작성해주세요!"
            className="text_box"
            type="text"
            name="emoReason"
          />
        </div>

        <h2>나의 오늘의 노래 추천</h2>
        <input
          onChange={onChangeInput}
          placeholder="노래 제목을 작성해주세요 (선택)"
          type="text"
          name="recomMusic"
        />

        {/* 버튼을 가로로 배치: buttonRow */}
        <div className="buttonRow">
          <button
            className="submitButton"
            type="submit"
            onClick={postDataToJSONFile}
          >
            제출
          </button>
          <button
            className="closeButton"
            type="button"
            onClick={onClickBtn}
          >
            Close
          </button>
        </div>
      </div>
    </form>
  );
}

export default Home;
