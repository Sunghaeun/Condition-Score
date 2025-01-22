// import PropTypes from "prop-types";
import "../style/modal.css";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close} = props;
  

  
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open && props !== null ? (
        <section>
          <header>
            <div className='modalHeaderBox'>
              <div className='modalProfilePic'> 
                <span className="modalProfilePicture">{props.emoji ? props.emoji : "Loading..."}</span>
              </div>
              <h2 className='modalProfileName'>{props.scores ? props.scores.userName : "Loading..."}</h2>
              <button className="close" onClick={close}>
              &times;
            </button>
            </div>
          </header>
          <main>
            <span>몸 컨디션 : </span>
            {[1,1,1].map(function(){
              return <span>⭐️</span>;
            })}
            <p>{props.scores ? props.scores.bodyReason : "Loading..."}</p>
            <span>마음 컨디션 : </span>
            {[1,1].map(function(){
              return <span>⭐️</span>;
            })}
            <p>{props.scores ? props.scores.emoReason : "Loading..."}</p>

            <div className='modalMusicBox'>{props.scores ? props.scores.recomMusic : "Loading..."}</div>

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
