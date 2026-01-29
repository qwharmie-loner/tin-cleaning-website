'use client';

import { useState, useEffect } from 'react';

interface AnimatedServiceTextProps {
  englishText: string;
  hungarianText: string;
  duration?: number;
}

export default function AnimatedServiceText({ englishText, hungarianText, duration = 3 }: AnimatedServiceTextProps) {
  const [isEnglish, setIsEnglish] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsEnglish(prev => !prev);
        setIsTransitioning(false);
      }, 500);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <span
      className={`inline-block transition-all duration-500 ${
        isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {isEnglish ? englishText : hungarianText}
    </span>
  );
}
