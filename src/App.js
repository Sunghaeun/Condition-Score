import styles from './App.module.css';
import BodyScore from './components/BodyScore';
import EmotionScore from './components/EmotionScore';

function App() {
  return (
    <div>
      <h2>몸과 마음의 점수</h2>
        <form className={styles.form_group}>
          <BodyScore/>
          <EmotionScore/>
          <button className={styles.submitButton} type="submit">제출</button>
      </form>
    </div>
  );
}

export default App;
