import React from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    function onClickBtn() {
        navigate('/add');
    }
  return (
    <div>
        <button type="button" onClick={onClickBtn}>
            Add
        </button>
    </div>
  )
}

export default Home
