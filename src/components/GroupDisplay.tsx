import { Team } from '@/data/teams';
import { TeamCard } from './TeamCard';
import { cn } from '@/lib/utils';

interface GroupDisplayProps {
  groupName: string;
  teams: Team[];
  isRevealing?: boolean;
  revealedCount?: number;
}

export const GroupDisplay = ({ groupName, teams, isRevealing, revealedCount = 0 }: GroupDisplayProps) => {
  return (
    <div className={cn(
      "group-container transition-all duration-500",
      isRevealing && "glow-pitch"
    )}>
      <h3 className={cn(
        "font-display text-2xl mb-4 text-center",
        isRevealing ? "text-gradient-pitch" : "text-gradient-gold"
      )}>
        Grupo {groupName}
      </h3>
      
      <div className="space-y-2">
        {teams.map((team, index) => (
          <TeamCard
            key={team.id}
            team={team}
            isDrawn={index < revealedCount}
            animationDelay={index * 150}
          />
        ))}
        
        {/* Empty slots */}
        {Array.from({ length: Math.max(0, 4 - teams.length) }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="card-team flex items-center justify-center h-16 border-dashed opacity-50"
          >
            <span className="text-muted-foreground text-sm">—</span>
          </div>
        ))}
      </div>
    </div>
  );
};
