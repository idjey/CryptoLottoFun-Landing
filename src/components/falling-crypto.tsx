
"use client";

import { useState, useEffect, type FC, useRef, createRef } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  const symbolRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const checkIsMobile = () => window.innerWidth < 768;
    setIsMobile(checkIsMobile());
    setScreenHeight(window.innerHeight);
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setIsMobile(checkIsMobile());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSymbolSize = () => {
    return isMobile ? Math.random() * 20 + 28 : Math.random() * 24 + 16;
  }

  const createSymbol = (id: number): CryptoSymbol => {
    return {
      id: id,
      Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      x: Math.random() * 100,
      y: Math.random() * -100 - 20,
      size: getSymbolSize(),
      speed: Math.random() * 0.5 + 0.2,
      opacity: gameStarted ? (Math.random() * 0.5 + 0.5) : (Math.random() * 0.2 + 0.2),
    };
  };

  useEffect(() => {
    if (screenHeight > 0) {
      const initialSymbols = Array.from({ length: NUM_ICONS }, (_, i) => createSymbol(i));
      setSymbols(initialSymbols);
      symbolRefs.current = initialSymbols.map(() => createRef<HTMLDivElement>());
    }
  }, [screenHeight, isMobile]);

  useEffect(() => {
    if (gameStarted) {
      setSymbols(s => s.map(symbol => ({ ...symbol, opacity: Math.random() * 0.5 + 0.5 })));
    }
  }, [gameStarted]);

  useEffect(() => {
    if (symbols.length === 0) return;

    const liveSymbols = [...symbols];

    const animate = () => {
      for (let i = 0; i < liveSymbols.length; i++) {
        const symbol = liveSymbols[i];
        let newY = symbol.y + symbol.speed;

        if (newY > 110) {
          const newSymbol = createSymbol(symbol.id);
          liveSymbols[i] = newSymbol;
          newY = newSymbol.y;
          // We need to update the state here so the new Icon component is rendered
          setSymbols(prev => prev.map(s => s.id === symbol.id ? newSymbol : s));
        } else {
          liveSymbols[i].y = newY;
        }

        const el = symbolRefs.current[i]?.current;
        if (el) {
          el.style.transform = `translate3d(${symbol.x}vw, ${newY}vh, 0)`;
        }
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [symbols.length]); // Only re-run when the number of symbols changes

  const handleIconClick = (e: React.MouseEvent, symbol: CryptoSymbol) => {
    e.stopPropagation();
    if (!gameStarted) return;
    onCollectCoin(symbol, e);
    // This will trigger the useEffect to reset the symbol state
    const newSymbol = createSymbol(symbol.id);
    setSymbols(prev => prev.map(s => s.id === symbol.id ? newSymbol : s));
  };

  return (
    <div className="absolute inset-0 z-0">
      {symbols.map((symbol, i) => (
        <div
          key={symbol.id}
          ref={symbolRefs.current[i]}
          className={`absolute ${gameStarted ? 'cursor-pointer' : 'pointer-events-none'}`}
          style={{
            transform: `translate3d(${symbol.x}vw, ${symbol.y}vh, 0)`,
            willChange: 'transform',
            WebkitWillChange: 'transform',
            MozWillChange: 'transform',
          }}
          onClick={(e: React.MouseEvent) => handleIconClick(e, symbol)}
        >
          <symbol.Icon
            className={`text-primary transition-all duration-300 ${gameStarted ? 'hover:scale-125 hover:opacity-100' : ''}`}
            style={{
              width: `${symbol.size}px`,
              height: `${symbol.size}px`,
              opacity: symbol.opacity,
              filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.7))',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FallingCrypto;
