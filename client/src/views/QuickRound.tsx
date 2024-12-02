import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function QuickRound() {
  const [time, setTime] = useState(30); // Timer-ul începe de la 30 de secunde
  const [isRunning, setIsRunning] = useState(true); // Starea timer-ului

  // Reducem timpul la fiecare secundă
  useEffect(() => {
    if (isRunning && time > 0) {
      const interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, time]);

  // Resetare cu tasta "Space"
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        setTime(30); // Reset la 30 de secunde
        setIsRunning(true); // Repornim timer-ul
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-gray-800 text-white h-screen flex flex-col justify-center items-center">
      <div className="w-[500px] h-[500px]">
      <CircularProgressbar
          value={time}
          maxValue={30}
          text={`${time}`}
          styles={buildStyles({
            textColor: "white",
            textSize: "54px",
            pathColor: "#ff0000",
            trailColor: "#555555",
          })}
      />
      </div>

      <button
        onClick={() => setIsRunning(!isRunning)}
        className="mt-5 px-6 py-2 text-lg text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
      >
        {isRunning ? "Pause" : "Resume"}
      </button>

      <p className="mt-3 text-sm text-gray-400">Press "Space" to reset the timer.</p>
    </div>
  );
}
