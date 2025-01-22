import "../style/modal.css";
// import React, { useState} from 'react';

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;
  console.log(props.data);
  // setUserEmoji();
  // const [emoji, setEmoji] = useState(null);

  
  
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      
      {open && props !== null ? (
        <section>
          <header>
            <div className='modalHeaderBox'>
              <div className='modalProfilePic'> 
                <span className="modalProfilePicture">{props.data.emoProfile ? props.data.emoProfile : "Loading..."}</span>
              </div>
              <h2 className='modalProfileName'>{props.data.userName ? props.data.userName : "Loading..."}</h2>
              <button className="close" onClick={close}>
              &times;
            </button>
            </div>
          </header>
          <main>
            <span>몸 컨디션 : </span>
            {Array.from({ length: props.data.bodyScore }).map((_, index) => (
              <span key={index}>⭐️</span>
            ))}
            <p>{props.data.bodyReason ? props.data.bodyReason : "Loading..."}</p>
            <span>마음 컨디션 : </span>
            {Array.from({ length: props.data.emoScore }).map((_, index) => (
              <span key={index}>⭐️</span>
            ))}
            <p>{props.data ? props.data.emoReason : "Loading..."}</p>

            <div className='modalMusicBox'>{props.data ? props.data.recomMusic : "Loading..."}</div>

          </main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};


export default Modal; 
