import React, { useRef, useState } from 'react';
import styles from "../style/addpage.css";



function Home() {

  const[data, setData] = useState({
          bodyScore: "",
          bodyReason: "",
          emoScore: "",
          emoReason: "",
      });

  const onChangeInput = (input) => {
    setData({
        ...data,
        [input.target.name]: input.target.value,
    });
  };

  return (
    <div className='mainContainer'>
      <div className='secondContainer'>
        <h2>프로필 이름</h2>
        <input onChange={onChangeInput} placeholder="이름을 작성해주세요" type="text" />
        <h2>프로필 이모지</h2>

        <h2>몸의 점수</h2>
        <input onChange={onChangeInput} placeholder="5점 만점" type="number" name="bodyScore" />
        <div className={styles.padding_10}>
          <input onChange={onChangeInput} placeholder="이유를 작성해주세요!" className={styles.text_box} type="text" name="bodyReason" />
        </div>  

        <h2>마음의 점수</h2>
        <input onChange={onChangeInput} placeholder="5점 만점" type="number" name="emoScore" />
        <div className={styles.padding_10}>
          <input onChange={onChangeInput} placeholder="이유를 작성해주세요!" className={styles.text_box} type="text" name="emoReason" />
        </div>
        <h2>나의 오늘의 노래 추천</h2>
        <input onChange={onChangeInput} placeholder="노래 제목을 작성해주세요" type="text" />

      </div>
    </div>
  )
}

export default Home
