import { useState } from 'react';
import { Team, getTeamsByPot, confederationNames } from '@/data/teams';
import { TeamCard } from './TeamCard';
import { PotDisplay } from './PotDisplay';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Shuffle, Trash2, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamSelectorProps {
  availableTeams: Team[];
  selectedTeams: Team[];
  usesPots?: boolean;
  onAddTeam: (team: Team) => void;
  onRemoveTeam: (teamId: string) => void;
  onAddCustomTeam: (team: Team) => void;
  onClearSelection: () => void;
  onSelectAll: () => void;
}

export const TeamSelector = ({
  availableTeams,
  selectedTeams,
  usesPots,
  onAddTeam,
  onRemoveTeam,
  onAddCustomTeam,
  onClearSelection,
  onSelectAll,
}: TeamSelectorProps) => {
  const [search, setSearch] = useState('');
  const [customName, setCustomName] = useState('');
  const [customShortName, setCustomShortName] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'pots'>(usesPots ? 'pots' : 'list');

  const filteredTeams = availableTeams.filter(
    team =>
      team.name.toLowerCase().includes(search.toLowerCase()) ||
      team.shortName.toLowerCase().includes(search.toLowerCase())
  );

  const teamsByPot = getTeamsByPot(availableTeams);
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

  // Count teams by confederation
  const confederationCounts = selectedTeams.reduce((acc, team) => {
    if (team.confederation) {
      acc[team.confederation] = (acc[team.confederation] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Search and actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Buscar seleção..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-muted border-border"
          />
        </div>
        <div className="flex gap-2">
          {usesPots && (
            <Button
              onClick={() => setViewMode(viewMode === 'list' ? 'pots' : 'list')}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Layers size={16} />
              {viewMode === 'list' ? 'Ver Potes' : 'Ver Lista'}
            </Button>
          )}
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

      {/* Confederation summary */}
      {usesPots && Object.keys(confederationCounts).length > 0 && (
        <div className="card-tournament">
          <h4 className="font-display text-lg text-gradient-pitch mb-3">Seleções por Confederação</h4>
          <div className="flex flex-wrap gap-3">
            {Object.entries(confederationCounts).map(([conf, count]) => (
              <div key={conf} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
                <span className="text-sm text-muted-foreground">
                  {confederationNames[conf as keyof typeof confederationNames]}:
                </span>
                <span className="font-bold text-secondary">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom team form */}
      <div className="card-tournament">
        <h4 className="font-display text-lg text-gradient-gold mb-3">Adicionar Seleção Personalizada</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Nome da seleção"
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
          {viewMode === 'pots' ? 'Seleções por Pote' : 'Seleções Disponíveis'}
          <span className="text-secondary ml-2">({availableTeams.length})</span>
        </h4>
        <span className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          selectedTeams.length >= 8 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          {selectedTeams.length} selecionadas
        </span>
      </div>

      {/* View by pots */}
      {viewMode === 'pots' && usesPots ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(pot => (
            <PotDisplay
              key={pot}
              potNumber={pot}
              teams={teamsByPot[pot] || []}
              selectedTeamIds={selectedTeams.map(t => t.id)}
            />
          ))}
        </div>
      ) : (
        /* List view */
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
      )}

      {filteredTeams.length === 0 && viewMode === 'list' && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhuma seleção encontrada
        </div>
      )}
    </div>
  );
};
