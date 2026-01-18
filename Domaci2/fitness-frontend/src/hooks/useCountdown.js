import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for countdown timer
 * @param {number} initialSeconds - Starting time in seconds
 * @returns {Object} - { timeLeft, isRunning, isPaused, isFinished, start, pause, reset }
 */
export function useCountdown(initialSeconds = 60) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const start = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = (newTime = initialSeconds) => {
    setIsRunning(false);
    setTimeLeft(newTime);
  };

  return {
    timeLeft,
    isRunning,
    isPaused: !isRunning && timeLeft > 0 && timeLeft < initialSeconds,
    isFinished: timeLeft === 0,
    start,
    pause,
    reset,
  };
}
