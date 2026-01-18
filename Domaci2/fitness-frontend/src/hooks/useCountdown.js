import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for countdown timer
 * @param {number} initialSeconds - Starting time in seconds
 * @returns {Object} - { timeLeft, isRunning, isPaused, isFinished, start, pause, reset }
 */
export function useCountdown(initialSeconds = 60) {
  // Preostalo vreme u sekundama
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  // Da li tajmer trenutno odbrojava
  const [isRunning, setIsRunning] = useState(false);
  // Ref za čuvanje interval ID-a (ne triggeruje rerenderovanje)
  const intervalRef = useRef(null);

  useEffect(() => {
    // Ako tajmer radi i ima preostalog vremena
    if (isRunning && timeLeft > 0) {
      // Pokreni interval koji svake sekunde odbroji 1
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          // Ako je ostala 1 sekunda ili manje
          if (prev <= 1) {
            setIsRunning(false); // Zaustavi tajmer
            return 0; // Vrati na 0
          }
          return prev - 1; // Odbroji 1 sekundu
        });
      }, 1000);
    } else {
      // Ako tajmer nije u toku, očisti interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    // Cleanup funkcija: očisti interval kada se komponenta unmount-uje
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  // Pokreni tajmer (samo ako ima preostalog vremena)
  const start = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  // Pauziraj tajmer
  const pause = () => {
    setIsRunning(false);
  };

  // Resetuj tajmer na početno vreme (ili custom vreme)
  const reset = (newTime = initialSeconds) => {
    setIsRunning(false);
    setTimeLeft(newTime);
  };

  return {
    timeLeft,           // Preostalo vreme u sekundama
    isRunning,          // Da li tajmer trenutno radi
    // Computed: tajmer je pauziran ako nije u toku, ali ima vremena i nije na početku
    isPaused: !isRunning && timeLeft > 0 && timeLeft < initialSeconds,
    isFinished: timeLeft === 0, // Da li je odbrojavanje završeno
    start,              // Funkcija za pokretanje
    pause,              // Funkcija za pauziranje
    reset,              // Funkcija za resetovanje
  };
}
