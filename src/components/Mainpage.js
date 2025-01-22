import React, { useState } from 'react';
// "styles" 폴더 아래에 있는 mainpage.module.css를 import
import styles from '../styles/mainpage.module.css'; 
import Modal from "./Modal";

export default function Mainpage() {
  const [modalOpen, setModalOpen] = useState(false);

  const [cells, setCells] = useState([]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const plusClick = () => {
    setCells((prevCells) => [...prevCells, ' ']);
  };

  return (
    <div className={styles.mainbody}>
      {/* header 영역 */}
      <div className={styles.header}>
        <div className={styles.logoArea}>
          멋쟁이사자처럼 로고
        </div>
        <div className={styles.average}>
          몸점수: bodyAvr
          감정점수: emoAvr
        </div>
      </div>
    
      {/* main 영역 */}
      <main className={styles.main}>
        <div className={styles.gridContainer} id="gridContainer">
          {/* 지금까지 저장된 모든 셀을 표시 */}
          {cells.map((cell, index) => (
            <div className={styles.cell} key={index}>
              {cell}
            </div>
          ))}

          {/* + 버튼 셀 */}
          <div 
            className={`${styles.cell} ${styles.plusCell}`} 
            onClick={plusClick} 
          />
        </div>
        <button onClick={openModal}>모달팝업</button>
             <Modal open={modalOpen} close={closeModal} header="Modal heading">
               <form className={styles.form_group}>
                   <button className={styles.submitButton} type="submit">제출</button>
             </form>
           </Modal>
      </main>

      {/* footer 영역 */}
      <footer className={styles.footer} />
    </div>
  );
}
