
"use client";

import { useState, useCallback } from 'react';

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
const range = (start: number, end: number, step = 1) => {
  const output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

const PARTICLE_COUNT = 20;
const PARTICLE_SIZE = 10;
const SPREAD = 60;
const DURATION = 300;

interface SparkleParticle {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: React.CSSProperties;
}

const generateSparkle = (): Omit<SparkleParticle, 'id' | 'createdAt'> => {
  const color = `hsl(${random(0, 360)}, 100%, 70%)`;
  const size = random(PARTICLE_SIZE / 2, PARTICLE_SIZE);
  const up = random(0, 1) === 1;
  
  const style = {
    position: 'absolute' as 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    borderRadius: '50%',
    animation: `sparkle-animation ${DURATION}ms forwards`,
    transform: `translate(${random(-SPREAD, SPREAD)}px, ${random(-SPREAD, SPREAD)}px) scale(1)`,
    opacity: 1,
  };
  return { color, size, style };
};

export const useSparkles = () => {
  const [sparkles, setSparkles] = useState<Array<{ id: string; x: number; y: number }>>([]);

  const triggerSparkles = useCallback((x: number, y: number) => {
    const newSparkle = {
      id: String(new Date().getTime()),
      x,
      y,
    };
    setSparkles(currentSparkles => [...currentSparkles, newSparkle]);
  }, []);

  return { sparkles, triggerSparkles };
};

const Sparkle = ({ x, y }: { x: number; y: number }) => {
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  useState(() => {
    const now = Date.now();
    const newParticles = range(PARTICLE_COUNT).map(i => {
      const sparkle = generateSparkle();
      return {
        id: `particle-${i}`,
        createdAt: now,
        ...sparkle,
      };
    });
    setParticles(newParticles);
    
    setTimeout(() => {
        setParticles([]);
    }, DURATION);
  });
  
  const keyframes = `
    @keyframes sparkle-animation {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(${random(-SPREAD*1.5, SPREAD*1.5)}px, ${random(-SPREAD*1.5, SPREAD*1.5)}px) scale(0);
        opacity: 0;
      }
    }
  `;

  return (
    <span className="absolute z-50 pointer-events-none" style={{ left: x, top: y }}>
       <style>{keyframes}</style>
      {particles.map(particle => (
        <span key={particle.id} style={particle.style} />
      ))}
    </span>
  );
};

export default Sparkle;
