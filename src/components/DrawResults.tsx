import { Team } from '@/data/teams';
import { GroupDisplay } from './GroupDisplay';
import { Button } from '@/components/ui/button';
import { Download, RefreshCcw, Share2 } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';

interface DrawResultsProps {
  groups: { [key: string]: Team[] };
  tournamentName: string;
  onReset: () => void;
}

export const DrawResults = ({ groups, tournamentName, onReset }: DrawResultsProps) => {
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    try {
      // Create a simple text representation for now
      let text = `🏆 ${tournamentName} - Resultado do Sorteio\n\n`;
      
      Object.entries(groups).forEach(([groupName, teams]) => {
        text += `📋 Grupo ${groupName}\n`;
        teams.forEach((team, index) => {
          text += `  ${index + 1}. ${team.flag} ${team.name} (${team.shortName})\n`;
        });
        text += '\n';
      });
      
      // Copy to clipboard
      await navigator.clipboard.writeText(text);
      toast.success('Resultado copiado para a área de transferência!');
    } catch {
      toast.error('Erro ao exportar resultado');
    }
  };

  const handleShare = async () => {
    const text = `🏆 ${tournamentName}\n\nConfira o resultado do sorteio!`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: tournamentName, text });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success('Link copiado!');
    }
  };

  const groupEntries = Object.entries(groups);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-display text-4xl md:text-5xl text-gradient-gold mb-2">
          Resultado do Sorteio
        </h2>
        <p className="text-muted-foreground text-lg">{tournamentName}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleExport} className="btn-gold gap-2">
          <Download size={18} />
          Exportar
        </Button>
        <Button onClick={handleShare} variant="outline" className="gap-2">
          <Share2 size={18} />
          Compartilhar
        </Button>
        <Button onClick={onReset} variant="outline" className="gap-2">
          <RefreshCcw size={18} />
          Novo Sorteio
        </Button>
      </div>

      {/* Groups grid */}
      <div ref={resultsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {groupEntries.map(([groupName, teams], index) => (
          <div
            key={groupName}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <GroupDisplay
              groupName={groupName}
              teams={teams}
              revealedCount={teams.length}
            />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="card-tournament text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-3xl font-display text-gradient-gold">
              {groupEntries.length}
            </p>
            <p className="text-muted-foreground text-sm">Grupos</p>
          </div>
          <div>
            <p className="text-3xl font-display text-gradient-pitch">
              {groupEntries.reduce((acc, [, teams]) => acc + teams.length, 0)}
            </p>
            <p className="text-muted-foreground text-sm">Times</p>
          </div>
          <div>
            <p className="text-3xl font-display text-foreground">
              {groupEntries.length > 0 ? groupEntries[0][1].length : 0}
            </p>
            <p className="text-muted-foreground text-sm">Times/Grupo</p>
          </div>
          <div>
            <p className="text-3xl font-display text-secondary">
              {groupEntries.length * (groupEntries[0]?.[1].length || 0) * ((groupEntries[0]?.[1].length || 0) - 1) / 2}
            </p>
            <p className="text-muted-foreground text-sm">Jogos na Fase</p>
          </div>
        </div>
      </div>
    </div>
  );
};
