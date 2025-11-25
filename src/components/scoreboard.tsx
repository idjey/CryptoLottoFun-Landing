"use client";

import { ICONS } from '@/components/crypto-icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type CollectedCoins } from '@/app/page';

interface ScoreboardProps {
  collectedCoins: CollectedCoins;
}

const iconMap = new Map(ICONS.map(icon => [icon.displayName, icon]));

const Scoreboard = ({ collectedCoins }: ScoreboardProps) => {
  const collectedEntries = Object.entries(collectedCoins).filter(([, count]) => count > 0);

  return (
    <Card className="bg-background/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Collection</CardTitle>
      </CardHeader>
      <CardContent>
        {collectedEntries.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {collectedEntries.map(([name, count]) => {
              const Icon = iconMap.get(name);
              return (
                <div key={name} className="flex items-center gap-2">
                  {Icon && <Icon className="h-6 w-6 text-primary" />}
                  <span className="text-lg font-bold">{count}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">Catch some coins!</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Scoreboard;

    