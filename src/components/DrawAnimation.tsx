import { Team } from '@/data/teams';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface DrawAnimationProps {
  teams: Team[];
  onComplete: (team: Team) => void;
  targetGroup: string;
}

export const DrawAnimation = ({ teams, onComplete, targetGroup }: DrawAnimationProps) => {
  const [shuffling, setShuffling] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    if (teams.length === 0) return;

    // Shuffle animation
    const shuffleInterval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % teams.length);
    }, 80);

    // Stop shuffling after 2 seconds
    const stopTimeout = setTimeout(() => {
      clearInterval(shuffleInterval);
      setShuffling(false);
      
      // Select random team
      const randomIndex = Math.floor(Math.random() * teams.length);
      const selected = teams[randomIndex];
      setSelectedTeam(selected);
      
      // Complete after reveal animation
      setTimeout(() => {
        onComplete(selected);
      }, 1500);
    }, 2000);

    return () => {
      clearInterval(shuffleInterval);
      clearTimeout(stopTimeout);
    };
  }, [teams, onComplete]);

  const displayTeam = selectedTeam || teams[currentIndex];

  if (!displayTeam) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="text-center">
        {/* Target group indicator */}
        <div className="mb-8 animate-pulse">
          <span className="text-muted-foreground text-lg">Sorteando para</span>
          <h2 className="font-display text-4xl text-gradient-gold">Grupo {targetGroup}</h2>
        </div>

        {/* Card container */}
        <div className="perspective-1000">
          <div
            className={cn(
              "w-64 h-80 mx-auto rounded-2xl border-2 flex flex-col items-center justify-center gap-4",
              "transition-all duration-300 preserve-3d",
              shuffling ? "animate-shuffle border-muted bg-card" : "border-secondary bg-card glow-gold"
            )}
          >
            {/* Team flag */}
            <span className={cn(
              "text-8xl transition-transform duration-500",
              !shuffling && "animate-float"
            )}>
              {displayTeam.flag}
            </span>
            
            {/* Team name */}
            <div className={cn(
              "transition-all duration-500",
              shuffling && "blur-sm"
            )}>
              <h3 className={cn(
                "font-display text-3xl tracking-wide",
                selectedTeam ? "text-gradient-gold" : "text-foreground"
              )}>
                {displayTeam.name}
              </h3>
              {displayTeam.country && (
                <p className="text-muted-foreground mt-1">{displayTeam.country}</p>
              )}
            </div>
            
            {/* Short name badge */}
            <div className={cn(
              "px-4 py-2 rounded-lg font-bold text-lg",
              selectedTeam 
                ? "bg-secondary text-secondary-foreground" 
                : "bg-muted text-muted-foreground"
            )}>
              {displayTeam.shortName}
            </div>
          </div>
        </div>

        {/* Status text */}
        <p className={cn(
          "mt-8 text-lg",
          shuffling ? "text-muted-foreground animate-pulse" : "text-secondary"
        )}>
          {shuffling ? "Sorteando..." : "Sorteado!"}
        </p>
      </div>
    </div>
  );
};
