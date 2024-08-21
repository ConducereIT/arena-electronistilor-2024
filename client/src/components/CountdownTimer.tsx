import React, { useState, useEffect, useRef } from 'react'

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } 

    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, timeLeft]);

  const handleStart = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); 
      intervalRef.current = null;
    }
    setTimeLeft(60);  
    setIsActive(true); 
  };

  const isCritical = timeLeft < 10;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#E0F2FE',
  };

  const timerStyle: React.CSSProperties = {
    fontSize: '12rem',
    color: isCritical ? '#C026D3' : '#1D4ED8',
    fontWeight: 'bold',
  };

  const progressBarContainerStyle: React.CSSProperties = {
    width: '80%',
    height: '30px',
    backgroundColor: '#E5E7EB',
    borderRadius: '5px',
    marginTop: '20px',  
    overflow: 'hidden',
  };

  const progressBarStyle: React.CSSProperties = {
    width: `${(60 - timeLeft) / 60 * 100}%`,
    height: '100%',
    backgroundColor: isCritical ? '#C026D3' : '#1D4ED8',
    transition: 'width 1s linear',
  };

  const buttonContainerStyle: React.CSSProperties = {
    marginTop: '20px', 
  };

  const buttonStyle: React.CSSProperties = {
    margin: '10px',
    fontSize: '1.5rem',
    color: '#FFFFFF',
    backgroundColor: isCritical ? '#C026D3' : '#1D4ED8',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={timerStyle}>{timeLeft}</h1>
      <div style={progressBarContainerStyle}>
        <div style={progressBarStyle}></div>
      </div>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleStart} disabled={isActive}>
          Start
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
