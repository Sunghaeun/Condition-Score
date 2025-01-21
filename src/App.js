import styles from './App.module.css';
import Forms from './components/Forms.js';
import Home from './components/Home.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Forms />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
