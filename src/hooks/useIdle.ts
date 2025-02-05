import { useState, useEffect } from 'react';

export const useIdle = (timeout: number): boolean => {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), timeout);
    };

    // Events to track user activity
    const events = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'wheel'
    ];

    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Initial timeout
    timeoutId = setTimeout(() => setIsIdle(true), timeout);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      clearTimeout(timeoutId);
    };
  }, [timeout]);

  return isIdle;
};
