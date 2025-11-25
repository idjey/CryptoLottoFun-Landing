
"use client";

import { useState, useEffect, type FC } from 'react';
import { ICONS } from '@/components/crypto-icons';

const NUM_ICONS = 40;

export interface CryptoSymbol {
  id: number;
  Icon: FC<any>;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface FallingCryptoProps {
  gameStarted: boolean;
  onCollectCoin: (coin: CryptoSymbol, event: React.MouseEvent) => void;
}

const FallingCrypto = ({ gameStarted, onCollectCoin }: FallingCryptoProps) => {
  const [symbols, setSymbols] = useState<CryptoSymbol[]>([]);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    setScreenHeight(window.innerHeight);
    const handleResize = () => setScreenHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resetSymbol = (symbol: CryptoSymbol): CryptoSymbol => {
    return {
      ...symbol,
      y: Math.random() * -20 - 5,
      x: Math.random() * 100,
      speed: Math.random() * 0.5 + 0.2,
      size: Math.random() * 24 + 16,
      opacity: gameStarted ? (Math.random() * 0.5 + 0.5) : (Math.random() * 0.2 + 0.2), // More opaque when game starts
      Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
    };
  };

  useEffect(() => {
    if (screenHeight > 0) {
      const initialSymbols = Array.from({ length: NUM_ICONS }, (_, i) => {
        const baseSymbol = {
          id: i,
          Icon: ICONS[i % ICONS.length],
          x: Math.random() * 100,
          y: Math.random() * -100 - 20,
          size: Math.random() * 24 + 16,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.2 + 0.2,
        };
        return baseSymbol;
      });
      setSymbols(initialSymbols);
    }
  }, [screenHeight]);

  useEffect(() => {
    if (gameStarted) {
        setSymbols(s => s.map(symbol => ({ ...symbol, opacity: Math.random() * 0.5 + 0.5 })));
    }
  }, [gameStarted]);

  useEffect(() => {
    if (symbols.length === 0) return;

    let animationFrameId: number;

    const animate = () => {
      setSymbols(prevSymbols =>
        prevSymbols.map(symbol => {
          let newY = symbol.y + symbol.speed;
          if (newY > 110) {
            return resetSymbol(symbol);
          }
          return { ...symbol, y: newY };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [symbols.length]);

  const handleIconClick = (e: React.MouseEvent, symbol: CryptoSymbol) => {
    e.stopPropagation();
    if (!gameStarted) return;
    onCollectCoin(symbol, e);
    setSymbols(prev => prev.map(s => s.id === symbol.id ? resetSymbol(s) : s));
  };

  return (
    <div className="absolute inset-0 z-0">
      {symbols.map((symbol) => (
        <symbol.Icon
          key={symbol.id}
          className={`absolute text-primary transition-all duration-300 ${gameStarted ? 'cursor-pointer hover:scale-125 hover:opacity-100' : 'pointer-events-none'}`}
          style={{
            left: `${symbol.x}vw`,
            top: `${symbol.y}vh`,
            width: `${symbol.size}px`,
            height: `${symbol.size}px`,
            opacity: symbol.opacity,
            filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.7))',
            willChange: 'transform, opacity',
          }}
          onClick={(e: React.MouseEvent) => handleIconClick(e, symbol)}
        />
      ))}
    </div>
  );
};

export default FallingCrypto;
