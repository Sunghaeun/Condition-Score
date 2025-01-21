import React from 'react'
import styles from "../App.module.css"

function EmotionScore(props) {
  return (
    <div>
       <div className={styles.form_pair}>
            <div className={styles.padding_10}>
              <label htmlFor="emotion">마음의 점수 </label>
              <input placeholder="5점 만점" type="number" name="emotion" />
            </div>
            <div className={styles.padding_10}>
              <input placeholder="왜 그런지 이유를 작성해주세요!" className={styles.text_box} type="text" name="emo_reason" />
            </div>
        </div>
    </div>
  )
}

export default EmotionScore