import { useEffect, useRef, useState } from 'react';

export function useCarousel(length: number, interval: number = 3000) {
  const [index, setIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex(prev => (prev + 1) % length);
    }, interval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [length, interval]);

  return [index, setIndex] as const;
} 