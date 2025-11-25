"use client";

import { useState, useEffect, useMemo, type FC } from 'react';
import { Bitcoin, CircleDollarSign } from 'lucide-react';
import { EthereumIcon, DogecoinIcon } from '@/components/crypto-icons';

const ICONS: FC<any>[] = [Bitcoin, EthereumIcon, DogecoinIcon, CircleDollarSign];
const NUM_ICONS = 40;

interface CryptoSymbol {
  id: number;
  Icon: FC<any>;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const FallingCrypto = () => {
  const [symbols, setSymbols] = useState<CryptoSymbol[]>([]);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    setScreenHeight(window.innerHeight);
    const handleResize = () => setScreenHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenHeight > 0) {
      const initialSymbols = Array.from({ length: NUM_ICONS }, (_, i) => ({
        id: i,
        Icon: ICONS[i % ICONS.length],
        x: Math.random() * 100,
        y: Math.random() * -100 - 20, // Start above the screen
        size: Math.random() * 24 + 16,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.2 + 0.2, // 20-40% opacity
      }));
      setSymbols(initialSymbols);
    }
  }, [screenHeight]);

  useEffect(() => {
    if (symbols.length === 0) return;

    let animationFrameId: number;

    const animate = () => {
      setSymbols(prevSymbols =>
        prevSymbols.map(symbol => {
          let newY = symbol.y + symbol.speed;
          let newX = symbol.x;

          // Reset when it goes off-screen
          if (newY > 110) {
            newY = Math.random() * -10 - 5;
            newX = Math.random() * 100;
          }

          // Fade out at the bottom
          const fadeStart = 70; // Start fading at 70% of screen height
          const newOpacity =
            newY > fadeStart
              ? symbol.opacity * (1 - (newY - fadeStart) / (100 - fadeStart))
              : symbol.opacity;

          return {
            ...symbol,
            y: newY,
            x: newX,
            opacity: Math.max(0, newOpacity),
          };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [symbols.length]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {symbols.map(({ id, Icon, x, y, size, opacity }) => (
        <Icon
          key={id}
          className="absolute text-primary"
          style={{
            left: `${x}vw`,
            top: `${y}vh`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity,
            filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.7))',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
};

export default FallingCrypto;
