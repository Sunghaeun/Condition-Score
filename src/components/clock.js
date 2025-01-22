import React from 'react'

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");    
    clock.innerText = hours + ":" + minutes + ":" + seconds;
}

function clock() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const sum = hours + minutes;
    if(sum === 0){
        
    }
    return (
        <div>
        
        </div>
    )
}

export default clock
