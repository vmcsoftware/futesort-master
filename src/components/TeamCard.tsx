import { Team } from '@/data/teams';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  isSelected?: boolean;
  isDrawn?: boolean;
  showRemove?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  animationDelay?: number;
}

export const TeamCard = ({
  team,
  isSelected,
  isDrawn,
  showRemove,
  onClick,
  onRemove,
  animationDelay = 0,
}: TeamCardProps) => {
  return (
    <div
      onClick={onClick}
      style={{ animationDelay: `${animationDelay}ms` }}
      className={cn(
        "card-team relative flex items-center gap-3 transition-all duration-300",
        "perspective-1000",
        onClick && "cursor-pointer hover:scale-105 hover:border-secondary/70",
        isSelected && "border-secondary bg-secondary/10",
        isDrawn && "animate-reveal border-primary bg-primary/10"
      )}
    >
      {/* Team flag/badge */}
      <div className={cn(
        "text-3xl transition-transform duration-300",
        isDrawn && "animate-float"
      )}>
        {team.flag}
      </div>
      
      {/* Team info */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          "font-medium truncate transition-colors duration-300",
          isSelected && "text-secondary",
          isDrawn && "text-primary"
        )}>
          {team.name}
        </p>
        {team.country && (
          <p className="text-xs text-muted-foreground truncate">{team.country}</p>
        )}
        {team.pot && (
          <p className="text-xs text-muted-foreground">Pote {team.pot}</p>
        )}
      </div>
      
      {/* Short name badge */}
      <div className={cn(
        "px-2 py-1 rounded text-xs font-bold",
        "bg-muted text-muted-foreground",
        isSelected && "bg-secondary text-secondary-foreground",
        isDrawn && "bg-primary text-primary-foreground"
      )}>
        {team.shortName}
      </div>
      
      {/* Remove button */}
      {showRemove && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground
                     flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity
                     hover:scale-110"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
