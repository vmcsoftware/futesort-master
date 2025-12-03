import { Team, confederationNames } from '@/data/teams';
import { cn } from '@/lib/utils';

interface PotDisplayProps {
  potNumber: number;
  teams: Team[];
  selectedTeamIds: string[];
}

export const PotDisplay = ({ potNumber, teams, selectedTeamIds }: PotDisplayProps) => {
  return (
    <div className="card-tournament">
      <h3 className="font-display text-xl text-gradient-gold mb-3 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
          {potNumber}
        </span>
        Pote {potNumber}
      </h3>
      
      <div className="space-y-2">
        {teams.map((team) => {
          const isSelected = selectedTeamIds.includes(team.id);
          return (
            <div
              key={team.id}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg transition-all duration-300",
                isSelected ? "bg-primary/20 border border-primary/30" : "bg-muted/30"
              )}
            >
              <span className="text-2xl">{team.flag}</span>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "font-medium text-sm truncate",
                  isSelected && "text-primary"
                )}>
                  {team.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {team.confederation && confederationNames[team.confederation]}
                  {team.fifaRanking && ` • #${team.fifaRanking}`}
                </p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                {team.shortName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
