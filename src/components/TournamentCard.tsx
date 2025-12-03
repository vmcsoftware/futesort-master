import { Tournament } from '@/data/teams';
import { cn } from '@/lib/utils';

interface TournamentCardProps {
  tournament: Tournament;
  isSelected: boolean;
  onClick: () => void;
}

export const TournamentCard = ({ tournament, isSelected, onClick }: TournamentCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "card-tournament w-full text-left group relative overflow-hidden",
        "transform transition-all duration-300 hover:-translate-y-1",
        isSelected && "border-secondary glow-gold"
      )}
    >
      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-300",
        "bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10",
        isSelected && "opacity-100"
      )} />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-5xl animate-float">{tournament.icon}</span>
          <div>
            <h3 className={cn(
              "font-display text-2xl tracking-wide transition-colors duration-300",
              isSelected ? "text-gradient-gold" : "text-foreground group-hover:text-secondary"
            )}>
              {tournament.name}
            </h3>
            <p className="text-muted-foreground text-sm">{tournament.description}</p>
          </div>
        </div>
        
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="text-secondary">{tournament.groupCount}</span> grupos
          </span>
          <span className="flex items-center gap-1">
            <span className="text-secondary">{tournament.teams.length}</span> times
          </span>
        </div>
      </div>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
        </div>
      )}
    </button>
  );
};
