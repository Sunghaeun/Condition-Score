import "../style/modal.css";
import React, { useState, useEffect } from "react";
import sound from "../img/sound.png";


const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  // setUserEmoji();
  // const [emoji, setEmoji] = useState(null);
 
  
  const { open, close, data } = props;
  const [emoji, setEmoji] = useState("Loading...");

  // 이모지를 매핑하는 함수
  const setUserEmoji = (profile) => {
    if (profile === "happy") {
      setEmoji("😄");
    } else if (profile === "excitied") {
      setEmoji("😆");
    } else if (profile === "cry") {
      setEmoji("🥲");
    } else if (profile === "yummy") {
      setEmoji("😋");
    } else if (profile === "study") {
      setEmoji("🤓");
    } else if (profile === "angry") {
      setEmoji("😡");
    } else if (profile === "sick") {
      setEmoji("🤒");
    } else {
      setEmoji("🤷‍♀️"); 
    }
  };

  // props.data.emoProfile 값이 변경될 때마다 이모지 업데이트
  useEffect(() => {
    if (data?.emoProfile) {
      setUserEmoji(data.emoProfile);
    }
  }, [data?.emoProfile]);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      
      {open && props !== null ? (
        <section>
          <header>
            <div className='modalHeaderBox'>
              <div className='modalProfilePic'> 
                <span className="modalProfilePicture">{emoji}</span>
              </div>
              <h2 className='modalProfileName'>{props.data.userName ? props.data.userName : "Loading..."}</h2>
              {/* <button className="close" onClick={close}>
              &times;
            </button> */}
            </div>
          </header>
          <main>
            <span>몸 컨디션 : </span>
            {Array.from({ length: props.data.bodyScore }).map((_, index) => (
              <span key={index}>⭐️</span>
            ))}
            <p className='reasonBoxPadding'>{props.data.bodyReason ? props.data.bodyReason : "Loading..."}</p>
            <span>마음 컨디션 : </span>
            {Array.from({ length: props.data.emoScore }).map((_, index) => (
              <span key={index}>⭐️</span>
            ))}
            <p className='reasonBoxPadding'>{props.data ? props.data.emoReason : "Loading..."}</p>

            <div className='modalMusicBox'>
              <a href={`https://www.youtube.com/results?search_query=${props.data.recomMusic}`} target="_blank">
                {props.data ? props.data.recomMusic : "Loading..."}
              </a>
              <img src={sound} className="youtubePhotoSize"/>
            </div>

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
