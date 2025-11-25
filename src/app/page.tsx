
"use client";

import { useState } from 'react';
import { Info } from 'lucide-react';
import FallingCrypto from '@/components/falling-crypto';
import Scoreboard from '@/components/scoreboard';
import Sparkle, { useSparkles } from '@/components/sparkle';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type CryptoSymbol } from '@/components/falling-crypto';
import { ResetIcon } from '@/components/crypto-icons';

export type CollectedCoins = {
  [key: string]: number;
};

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [collectedCoins, setCollectedCoins] = useState<CollectedCoins>({});
  const [key, setKey] = useState(Date.now()); // Used to reset the FallingCrypto component
  const { sparkles, triggerSparkles } = useSparkles();

  const handleGameStart = () => {
    if (!gameStarted) {
      setGameStarted(true);
      resetGame();
    }
  };

  const handleCollectCoin = (coin: CryptoSymbol, event: React.MouseEvent) => {
    triggerSparkles(event.clientX, event.clientY);
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
    <>
      {/* Visually hidden H1 for SEO */}
      <h1 className="sr-only">CryptoLotto.fun – A Fun Blockchain Lottery Experience</h1>
      <main
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-8 text-center"
        onClick={handleGameStart}
      >
        <FallingCrypto 
          key={key} 
          gameStarted={gameStarted} 
          onCollectCoin={handleCollectCoin}
        />

        {sparkles.map(sparkle => (
          <Sparkle key={sparkle.id} x={sparkle.x} y={sparkle.y} />
        ))}
        
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={(e) => { e.stopPropagation(); resetGame(); }}
                    >
                      <ResetIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset Game</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </>
        )}

        <header className={`relative z-10 flex flex-col items-center transition-opacity duration-1000 ${gameStarted ? 'opacity-0' : 'opacity-100'}`}>
          <div className="relative font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-primary flex justify-center">
            <div className={`transition-transform duration-1000 ease-in-out ${gameStarted ? '-translate-x-full' : 'translate-x-0'}`}>
              Crypto
            </div>
            <div className={`transition-transform duration-1000 ease-in-out ${gameStarted ? 'translate-x-full' : 'translate-x-0'}`}>
              LottoFun
            </div>
          </div>
          <h2 className="sr-only">Play Crypto Lottery Win on the Blockchain</h2>
          <h2 className="sr-only">Buy Decentralized Lottery Tickets with Bitcoin, Ethereum & Solana</h2>

          <p className={`mt-4 font-headline text-2xl md:text-3xl text-foreground/80 transition-opacity duration-500 ${gameStarted ? 'opacity-0' : 'opacity-100'}`}>
            Click anywhere to start
          </p>
        </header>

      </main>
    </>
  );
}
