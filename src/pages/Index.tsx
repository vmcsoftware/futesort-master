import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { TournamentCard } from '@/components/TournamentCard';
import { TeamSelector } from '@/components/TeamSelector';
import { DrawAnimation } from '@/components/DrawAnimation';
import { DrawResults } from '@/components/DrawResults';
import { Button } from '@/components/ui/button';
import { tournaments, getTournament, Team, TournamentType } from '@/data/teams';
import { useWorldCupDraw } from '@/hooks/useWorldCupDraw';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Play, ArrowLeft, Zap, Info } from 'lucide-react';

type DrawPhase = 'select-tournament' | 'select-teams' | 'drawing' | 'results';

const Index = () => {
  const [phase, setPhase] = useState<DrawPhase>('select-tournament');
  const [selectedTournament, setSelectedTournament] = useState<TournamentType | null>(null);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [groups, setGroups] = useState<{ [key: string]: Team[] }>({});
  const [drawingState, setDrawingState] = useState<{
    remainingTeams: Team[];
    currentGroup: string;
    isAnimating: boolean;
  } | null>(null);
  const [instantDraw, setInstantDraw] = useState(false);

  const { performDraw } = useWorldCupDraw();
  const tournament = selectedTournament ? getTournament(selectedTournament) : null;

  const handleSelectTournament = (type: TournamentType) => {
    setSelectedTournament(type);
    const t = getTournament(type);
    if (t) {
      setSelectedTeams([...t.teams]);
    }
  };

  const handleAddTeam = (team: Team) => {
    setSelectedTeams(prev => [...prev, team]);
  };

  const handleRemoveTeam = (teamId: string) => {
    setSelectedTeams(prev => prev.filter(t => t.id !== teamId));
  };

  const handleAddCustomTeam = (team: Team) => {
    setSelectedTeams(prev => [...prev, team]);
    toast.success(`${team.name} adicionada!`);
  };

  const handleClearSelection = () => {
    setSelectedTeams([]);
  };

  const handleSelectAll = () => {
    if (tournament) {
      setSelectedTeams([...tournament.teams]);
    }
  };

  const startDraw = (instant: boolean = false) => {
    if (!tournament) return;
    
    const minTeams = tournament.groupCount * tournament.teamsPerGroup;
    if (selectedTeams.length < minTeams) {
      toast.error(`Selecione pelo menos ${minTeams} seleções para este torneio`);
      return;
    }

    setInstantDraw(instant);

    // Use pot-based draw for World Cup
    if (tournament.usesPots) {
      const result = performDraw(
        selectedTeams,
        tournament.groupCount,
        tournament.teamsPerGroup,
        tournament.usesConfederationRules || false
      );

      if (!result.success) {
        toast.error(result.error || 'Erro no sorteio');
        return;
      }

      if (instant) {
        setGroups(result.groups);
        setPhase('results');
        toast.success('Sorteio concluído!');
      } else {
        // Animate the draw
        animateDrawFromGroups(result.groups, tournament.groupCount);
      }
    } else {
      // Simple random draw for other tournaments
      const groupLetters = 'ABCDEFGHIJKLMNOP'.slice(0, tournament.groupCount).split('');
      const initialGroups: { [key: string]: Team[] } = {};
      groupLetters.forEach(letter => {
        initialGroups[letter] = [];
      });

      const shuffled = [...selectedTeams].sort(() => Math.random() - 0.5);
      
      if (instant) {
        // Instant draw
        shuffled.forEach((team, index) => {
          const groupIndex = index % tournament.groupCount;
          initialGroups[groupLetters[groupIndex]].push(team);
        });
        setGroups(initialGroups);
        setPhase('results');
        toast.success('Sorteio concluído!');
      } else {
        setGroups(initialGroups);
        setDrawingState({
          remainingTeams: shuffled,
          currentGroup: 'A',
          isAnimating: true,
        });
        setPhase('drawing');
      }
    }
  };

  const animateDrawFromGroups = (finalGroups: Record<string, Team[]>, groupCount: number) => {
    const groupLetters = 'ABCDEFGHIJKLMNOP'.slice(0, groupCount).split('');
    const initialGroups: { [key: string]: Team[] } = {};
    groupLetters.forEach(letter => {
      initialGroups[letter] = [];
    });
    setGroups(initialGroups);

    // Create a queue of draws (pot by pot, group by group)
    const drawQueue: { team: Team; group: string }[] = [];
    
    // Go through each pot
    for (let pot = 1; pot <= 4; pot++) {
      for (const group of groupLetters) {
        const teamFromPot = finalGroups[group].find(t => t.pot === pot);
        if (teamFromPot) {
          drawQueue.push({ team: teamFromPot, group });
        }
      }
    }

    // Also add teams without pots
    for (const group of groupLetters) {
      const teamsWithoutPot = finalGroups[group].filter(t => !t.pot);
      teamsWithoutPot.forEach(team => {
        drawQueue.push({ team, group });
      });
    }

    if (drawQueue.length > 0) {
      const firstDraw = drawQueue[0];
      setDrawingState({
        remainingTeams: drawQueue.map(d => d.team),
        currentGroup: firstDraw.group,
        isAnimating: true,
      });
      setPhase('drawing');
    }
  };

  const handleDrawComplete = useCallback((team: Team) => {
    if (!drawingState || !tournament) return;

    // For pot-based tournaments, we already have the final groups computed
    if (tournament.usesPots) {
      const result = performDraw(
        selectedTeams,
        tournament.groupCount,
        tournament.teamsPerGroup,
        tournament.usesConfederationRules || false
      );

      setGroups(result.groups);
      setDrawingState(null);
      setPhase('results');
      toast.success('Sorteio concluído!');
      return;
    }

    // Simple draw logic for non-pot tournaments
    const newGroups = { ...groups };
    const currentGroupTeams = newGroups[drawingState.currentGroup] || [];
    currentGroupTeams.push(team);
    newGroups[drawingState.currentGroup] = currentGroupTeams;
    setGroups(newGroups);

    const newRemaining = drawingState.remainingTeams.filter(t => t.id !== team.id);
    
    if (newRemaining.length === 0) {
      setDrawingState(null);
      setPhase('results');
      toast.success('Sorteio concluído!');
      return;
    }

    const groupLetters = 'ABCDEFGHIJKLMNOP'.slice(0, tournament.groupCount).split('');
    const currentIndex = groupLetters.indexOf(drawingState.currentGroup);
    const isGroupFull = currentGroupTeams.length >= tournament.teamsPerGroup;
    
    let nextGroup = drawingState.currentGroup;
    if (isGroupFull) {
      nextGroup = groupLetters[(currentIndex + 1) % groupLetters.length];
    } else {
      for (let i = 1; i <= groupLetters.length; i++) {
        const checkIndex = (currentIndex + i) % groupLetters.length;
        const checkGroup = groupLetters[checkIndex];
        if ((newGroups[checkGroup]?.length || 0) < tournament.teamsPerGroup) {
          nextGroup = checkGroup;
          break;
        }
      }
    }

    setTimeout(() => {
      setDrawingState({
        remainingTeams: newRemaining,
        currentGroup: nextGroup,
        isAnimating: true,
      });
    }, 500);
  }, [drawingState, groups, tournament, selectedTeams, performDraw]);

  const handleReset = () => {
    setPhase('select-tournament');
    setSelectedTournament(null);
    setSelectedTeams([]);
    setGroups({});
    setDrawingState(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Phase: Select Tournament */}
        {phase === 'select-tournament' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="font-display text-3xl text-gradient-pitch mb-2">
                Escolha o Campeonato
              </h2>
              <p className="text-muted-foreground">
                Selecione o tipo de torneio para realizar o sorteio
              </p>
            </div>

            <div className={cn(
              "grid gap-4 max-w-6xl mx-auto",
              tournaments.length > 4 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1 md:grid-cols-2"
            )}>
              {tournaments.map((t) => (
                <TournamentCard
                  key={t.id}
                  tournament={t}
                  isSelected={selectedTournament === t.id}
                  onClick={() => handleSelectTournament(t.id)}
                />
              ))}
            </div>

            {selectedTournament && (
              <div className="text-center animate-scale-in">
                <Button
                  onClick={() => setPhase('select-teams')}
                  className="btn-gold text-lg px-8 py-6"
                >
                  Continuar
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Phase: Select Teams */}
        {phase === 'select-teams' && tournament && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setPhase('select-tournament')}
                className="gap-2"
              >
                <ArrowLeft size={18} />
                Voltar
              </Button>
              <div>
                <h2 className="font-display text-3xl text-gradient-pitch">
                  {tournament.icon} {tournament.name}
                </h2>
                <p className="text-muted-foreground">
                  Selecione as seleções participantes (mín. {tournament.groupCount * tournament.teamsPerGroup})
                </p>
              </div>
            </div>

            {/* Rules info for World Cup */}
            {tournament.usesConfederationRules && (
              <div className="card-tournament border-primary/30 bg-primary/5">
                <div className="flex items-start gap-3">
                  <Info className="text-primary mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-display text-lg text-primary mb-1">Regras FIFA do Sorteio</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Seleções divididas em <span className="text-secondary font-medium">4 potes</span> por ranking FIFA</li>
                      <li>• Cada grupo terá uma seleção de cada pote</li>
                      <li>• <span className="text-secondary font-medium">Máximo 1 seleção</span> por confederação em cada grupo</li>
                      <li>• Exceção: <span className="text-secondary font-medium">UEFA pode ter até 2</span> seleções por grupo</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <TeamSelector
              availableTeams={tournament.teams}
              selectedTeams={selectedTeams}
              usesPots={tournament.usesPots}
              onAddTeam={handleAddTeam}
              onRemoveTeam={handleRemoveTeam}
              onAddCustomTeam={handleAddCustomTeam}
              onClearSelection={handleClearSelection}
              onSelectAll={handleSelectAll}
            />

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => startDraw(false)}
                disabled={selectedTeams.length < tournament.groupCount * tournament.teamsPerGroup}
                className="btn-pitch text-lg px-8 py-6 gap-2"
              >
                <Play size={20} />
                Sorteio Animado
              </Button>
              <Button
                onClick={() => startDraw(true)}
                disabled={selectedTeams.length < tournament.groupCount * tournament.teamsPerGroup}
                variant="outline"
                className="text-lg px-8 py-6 gap-2"
              >
                <Zap size={20} />
                Sorteio Instantâneo
              </Button>
            </div>
          </div>
        )}

        {/* Phase: Drawing */}
        {phase === 'drawing' && drawingState && drawingState.isAnimating && (
          <DrawAnimation
            teams={drawingState.remainingTeams}
            onComplete={handleDrawComplete}
            targetGroup={drawingState.currentGroup}
          />
        )}

        {/* Phase: Results */}
        {phase === 'results' && tournament && (
          <DrawResults
            groups={groups}
            tournamentName={tournament.name}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>⚽ Simulador de Sorteios de Campeonatos de Futebol</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
