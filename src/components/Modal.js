import React from 'react';
import "../style/modal.css";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
            <div className='modalHeaderBox'>
              <div className='modalProfilePic'> </div>
              <h2 className='modalProfileName'>성하은</h2>
              <h5 className='modalProfileDate'>2025.01.21</h5>
              <button className="close" onClick={close}>
              &times;
            </button>
            </div>
          </header>
          <main>
            <span>몸 컨디션 : </span>
            {[1,1,1,1].map(function(){
              return <span>⭐️</span>;
            })}
            <p>잠을 많이 자서 기분이 좋습니다.</p>
            <span>마음 컨디션 : </span>
            {[1,1].map(function(){
              return <span>⭐️</span>;
            })}
            <p>오늘 기분이 안좋아요..</p>

            <div className='modalMusicBox'>뮤직플레이어</div>

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