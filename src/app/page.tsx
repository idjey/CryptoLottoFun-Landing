"use client";

import { useState } from 'react';
import { Info } from 'lucide-react';
import FallingCrypto from '@/components/falling-crypto';
import Scoreboard from '@/components/scoreboard';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type CryptoSymbol } from '@/components/falling-crypto';

export type CollectedCoins = {
  [key: string]: number;
};

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [collectedCoins, setCollectedCoins] = useState<CollectedCoins>({});
  const [key, setKey] = useState(Date.now()); // Used to reset the FallingCrypto component

  const handleGameStart = () => {
    if (!gameStarted) {
      setGameStarted(true);
      resetGame();
    }
  };

  const handleCollectCoin = (coin: CryptoSymbol) => {
    const coinName = coin.Icon.displayName || 'Unknown';
    setCollectedCoins(prev => ({
      ...prev,
      [coinName]: (prev[coinName] || 0) + 1,
    }));
  };

  const resetGame = () => {
    setCollectedCoins({});
    setKey(Date.now()); // Change key to force re-mount of FallingCrypto
  };

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-8 text-center"
      onClick={handleGameStart}
    >
      <FallingCrypto 
        key={key} 
        gameStarted={gameStarted} 
        onCollectCoin={handleCollectCoin}
      />
      
      {gameStarted && (
        <>
          <div className="absolute top-4 left-4 z-20">
            <Scoreboard collectedCoins={collectedCoins} />
          </div>
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click on the falling icons to collect them!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button onClick={(e) => { e.stopPropagation(); resetGame(); }}>Reset</Button>
          </div>
        </>
      )}

      <div className={`relative z-10 flex flex-col items-center transition-opacity duration-1000 ${gameStarted ? 'opacity-0' : 'opacity-100'}`}>
        <div className="relative font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-primary flex justify-center">
          <div className={`transition-transform duration-1000 ease-in-out ${gameStarted ? '-translate-x-full' : 'translate-x-0'}`}>
            Crypto
          </div>
          <div className={`transition-transform duration-1000 ease-in-out ${gameStarted ? 'translate-x-full' : 'translate-x-0'}`}>
            LottoFun
          </div>
        </div>

        <p className={`mt-4 font-headline text-2xl md:text-3xl text-foreground/80 transition-opacity duration-500 ${gameStarted ? 'opacity-0' : 'opacity-100'}`}>
          Click anywhere to start
        </p>
      </div>

    </main>
  );
}
