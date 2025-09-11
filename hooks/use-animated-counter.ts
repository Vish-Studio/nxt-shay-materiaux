import { useState, useEffect } from 'react';

interface UseAnimatedCounterProps {
  targetValue: number;
  duration?: number;
  startValue?: number;
}

export const useAnimatedCounter = ({
  targetValue,
  duration = 1000,
  startValue = 0
}: UseAnimatedCounterProps) => {
  const [currentValue, setCurrentValue] = useState(startValue);

  useEffect(() => {
    if (targetValue === currentValue) return;

    const startTime = Date.now();
    const difference = targetValue - currentValue;

    const animateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use easeOutCubic for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const newValue = Math.round(currentValue + difference * easeProgress);
      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };

    const animation = requestAnimationFrame(animateValue);

    return () => cancelAnimationFrame(animation);
  }, [targetValue, currentValue, duration]);

  return currentValue;
};
