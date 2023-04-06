import React, { useState, useEffect } from "react";

const Clock = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [displayTime, setDisplayTime] = useState("00:00");
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (min, sec) => {
    const formattedMinutes = String(min).padStart(2, "0");
    const formattedSeconds = String(sec).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const startCountdown = () => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds <= 0) return;
    setIsRunning(true);
    setCountdown(totalSeconds);
  };

  const pauseResumeCountdown = () => {
    setIsRunning(!isRunning);
  };

  const resetCountdown = () => {
    setMinutes(0);
    setSeconds(0);
    setCountdown(null);
    setDisplayTime("00:00");
  };

  useEffect(() => {
    let timer;
    if (isRunning && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, countdown]);

  useEffect(() => {
    setDisplayTime(formatTime(Math.floor(countdown / 60), countdown % 60));
  }, [countdown]);

  return (
    <div>
      <label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(+e.target.value)}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(+e.target.value)}
        />
        Seconds
      </label>
      <button onClick={startCountdown}>START</button>
      <button onClick={pauseResumeCountdown}>
        {isRunning ? "PAUSE" : "RESUME"}
      </button>
      <button onClick={resetCountdown}>RESET</button>
      <h1 data-testid="running-clock">{displayTime}</h1>
    </div>
  );
};

export default Clock;
