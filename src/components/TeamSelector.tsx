import { useState } from 'react';
import { Team } from '@/data/teams';
import { TeamCard } from './TeamCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Shuffle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamSelectorProps {
  availableTeams: Team[];
  selectedTeams: Team[];
  onAddTeam: (team: Team) => void;
  onRemoveTeam: (teamId: string) => void;
  onAddCustomTeam: (team: Team) => void;
  onClearSelection: () => void;
  onSelectAll: () => void;
}

export const TeamSelector = ({
  availableTeams,
  selectedTeams,
  onAddTeam,
  onRemoveTeam,
  onAddCustomTeam,
  onClearSelection,
  onSelectAll,
}: TeamSelectorProps) => {
  const [search, setSearch] = useState('');
  const [customName, setCustomName] = useState('');
  const [customShortName, setCustomShortName] = useState('');

  const filteredTeams = availableTeams.filter(
    team =>
      team.name.toLowerCase().includes(search.toLowerCase()) ||
      team.shortName.toLowerCase().includes(search.toLowerCase())
  );

  const isTeamSelected = (teamId: string) => selectedTeams.some(t => t.id === teamId);

  const handleAddCustom = () => {
    if (customName && customShortName) {
      const newTeam: Team = {
        id: `custom-${Date.now()}`,
        name: customName,
        shortName: customShortName.toUpperCase().slice(0, 3),
        flag: '⚽',
        country: 'Personalizado',
      };
      onAddCustomTeam(newTeam);
      setCustomName('');
      setCustomShortName('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Buscar time..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-muted border-border"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={onSelectAll} variant="outline" size="sm" className="gap-2">
            <Shuffle size={16} />
            Todos
          </Button>
          <Button onClick={onClearSelection} variant="outline" size="sm" className="gap-2 text-destructive">
            <Trash2 size={16} />
            Limpar
          </Button>
        </div>
      </div>

      {/* Custom team form */}
      <div className="card-tournament">
        <h4 className="font-display text-lg text-gradient-gold mb-3">Adicionar Time Personalizado</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Nome do time"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="flex-1 bg-muted border-border"
          />
          <Input
            placeholder="Sigla (3 letras)"
            value={customShortName}
            onChange={(e) => setCustomShortName(e.target.value.slice(0, 3))}
            className="w-32 bg-muted border-border"
            maxLength={3}
          />
          <Button onClick={handleAddCustom} className="btn-gold gap-2">
            <Plus size={16} />
            Adicionar
          </Button>
        </div>
      </div>

      {/* Selected teams count */}
      <div className="flex items-center justify-between">
        <h4 className="font-display text-xl">
          Times Disponíveis{' '}
          <span className="text-secondary">({filteredTeams.length})</span>
        </h4>
        <span className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          selectedTeams.length >= 8 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          {selectedTeams.length} selecionados
        </span>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2">
        {filteredTeams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            isSelected={isTeamSelected(team.id)}
            onClick={() => {
              if (isTeamSelected(team.id)) {
                onRemoveTeam(team.id);
              } else {
                onAddTeam(team);
              }
            }}
          />
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum time encontrado
        </div>
      )}
    </div>
  );
};
