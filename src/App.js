import styles from './App.module.css';
import Forms from './components/Forms.js';
import Home from './components/Home.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from './components/Mainpage.js';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Forms />} />
          <Route path="/main" element={<Mainpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
