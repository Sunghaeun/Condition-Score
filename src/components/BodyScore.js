import React from 'react'
import styles from "../App.module.css"

function BodyScore() {
  return (
    <div>
      <div className={styles.form_pair}>
            <div className={styles.padding_10}>
                <label htmlFor="body">몸의 점수  </label>
                <input placeholder="5점 만점" type="number" name="body" />
            </div>
            <div className={styles.padding_10}>
                <input placeholder="왜 그런지 이유를 작성해주세요!" className={styles.text_box} type="text" name="body_reason" />
            </div>
        </div>
    </div>
  )
}

export default BodyScore

