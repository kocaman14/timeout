"use client";

import { useState, useEffect } from "react";


export default function Home() {
  const [click, setClick] = useState(false);
  const [oldminute, setOldMinute] = useState(0);
  const [oldsecond, setOldSecond] = useState(0);
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [color, setColor] = useState(false);
  const [button,setButton]=useState(false)
 

  const handleMinute = (e) => {
    setMinute(e.target.value);
    setOldMinute(e.target.value);
  };

  const handleSecond = (e) => {
    setSecond(e.target.value);
    setOldSecond(e.target.value);
  };
  const startHandler = (e) => {
    setClick(true);
    setButton(false)
    if (!click) {
      setMinute(oldminute);
      setSecond(oldsecond);
    }
  };
  const pauseHandler = () => {
    setClick((pre) => !pre);
    setColor((pre) => !pre);
   
  };

  const stopHandler = () => {
    setClick(false);
     setButton(true)
   setMinute("")
    setSecond("")
  };

  useEffect(() => {
    let timerId;
    if (click) {
      timerId = setTimeout(() => {
        if (second > 0) {
          setSecond((pre) => pre - 1);
        } else if (second === 0 && minute > 0) {
          setMinute((pre) => pre - 1);
          setSecond(59);
        } else if (minute === 0 && second === 0) {
          setClick(false);
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [click, second, minute]);
  const newColor = color ? "red" : "green";
  const zeroNumber = minute < 10 && minute !== 10 ? "0" : "";
  const seconZero = second < 10 && second !== 10 ? "0" : "";
  return (
    <div className="stopwatch-container">
    <label> Minute:</label>

      <input
        type="number"
        onChange={handleMinute}
        value={minute}
        placeholder={oldminute}
        min="0"
        max="59"
        
        />
      <label>Second</label>
      <input
        type="number"
        onChange={handleSecond}
        value={second}
        placeholder={oldsecond}
        min="0"
        max="59"
      />
      <button onClick={startHandler}>Start</button>
      <button  disabled={button}   style={{ backgroundColor: newColor }} onClick={pauseHandler}>
        Pause/Resume
      </button>
      <button onClick={stopHandler}>Reset</button>

      <p>
     {click
          ? `${zeroNumber}${minute}:${seconZero}${second}`
          : `${zeroNumber}${minute}:${seconZero}${second}`}
       
      </p>
          </div>
   
  );
}
