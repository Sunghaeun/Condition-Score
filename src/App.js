
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from './components/Mainpage.js';
import AddPage from './components/AddPage.js';

function App() {

  return (     
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Mainpage />} />
          <Route path="/addpage" element={<AddPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
