import { useCallback } from 'react';
import { Team, canPlaceInGroup, getTeamsByPot } from '@/data/teams';

interface DrawResult {
  groups: Record<string, Team[]>;
  success: boolean;
  error?: string;
}

export const useWorldCupDraw = () => {
  const performDraw = useCallback((
    teams: Team[],
    groupCount: number,
    teamsPerGroup: number,
    usesConfederationRules: boolean
  ): DrawResult => {
    const groupLetters = 'ABCDEFGHIJKLMNOP'.slice(0, groupCount).split('');
    const groups: Record<string, Team[]> = {};
    groupLetters.forEach(letter => {
      groups[letter] = [];
    });

    // Get teams by pot
    const teamsByPot = getTeamsByPot(teams);
    const pots = Object.keys(teamsByPot).map(Number).sort((a, b) => a - b);

    // Draw from each pot
    for (const pot of pots) {
      const potTeams = [...(teamsByPot[pot] || [])];
      
      // Shuffle teams in this pot
      for (let i = potTeams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [potTeams[i], potTeams[j]] = [potTeams[j], potTeams[i]];
      }

      // Try to place each team
      for (const team of potTeams) {
        let placed = false;
        
        // Get available groups (groups that don't have a team from this pot yet and aren't full)
        const availableGroups = groupLetters.filter(group => {
          const groupTeams = groups[group];
          // Group must not be full
          if (groupTeams.length >= teamsPerGroup) return false;
          // Group must not have a team from this pot already
          if (groupTeams.some(t => t.pot === pot)) return false;
          return true;
        });

        // Shuffle available groups for randomness
        for (let i = availableGroups.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [availableGroups[i], availableGroups[j]] = [availableGroups[j], availableGroups[i]];
        }

        // Try to place in each available group, respecting confederation rules
        for (const group of availableGroups) {
          const groupTeams = groups[group];
          
          if (usesConfederationRules) {
            if (canPlaceInGroup(team, groupTeams)) {
              groups[group].push(team);
              placed = true;
              break;
            }
          } else {
            groups[group].push(team);
            placed = true;
            break;
          }
        }

        // If couldn't place respecting rules, try to swap with existing teams
        if (!placed && usesConfederationRules) {
          placed = trySwapAndPlace(team, groups, groupLetters, teamsPerGroup, pot);
        }

        // If still not placed, force place in first available group (fallback)
        if (!placed) {
          for (const group of groupLetters) {
            if (groups[group].length < teamsPerGroup && !groups[group].some(t => t.pot === pot)) {
              groups[group].push(team);
              placed = true;
              break;
            }
          }
        }

        if (!placed) {
          return {
            groups,
            success: false,
            error: `Não foi possível alocar ${team.name} seguindo as regras`,
          };
        }
      }
    }

    return { groups, success: true };
  }, []);

  return { performDraw };
};

// Helper function to try swapping teams to make room
function trySwapAndPlace(
  team: Team,
  groups: Record<string, Team[]>,
  groupLetters: string[],
  teamsPerGroup: number,
  currentPot: number
): boolean {
  // Find groups where we could swap a team to make this placement valid
  for (const targetGroup of groupLetters) {
    const targetGroupTeams = groups[targetGroup];
    
    // Skip if group is full or already has a team from this pot
    if (targetGroupTeams.length >= teamsPerGroup) continue;
    if (targetGroupTeams.some(t => t.pot === currentPot)) continue;
    
    // Check if we can place if we move a conflicting team
    if (!canPlaceInGroup(team, targetGroupTeams)) {
      // Find a team in this group that conflicts and try to move it
      const conflictingTeam = targetGroupTeams.find(t => 
        t.confederation === team.confederation && 
        (team.confederation !== 'UEFA' || targetGroupTeams.filter(gt => gt.confederation === 'UEFA').length >= 2)
      );
      
      if (conflictingTeam) {
        // Try to move conflicting team to another group
        for (const otherGroup of groupLetters) {
          if (otherGroup === targetGroup) continue;
          
          const otherGroupTeams = groups[otherGroup];
          
          // Check if other group can accept the conflicting team
          if (otherGroupTeams.length < teamsPerGroup &&
              !otherGroupTeams.some(t => t.pot === conflictingTeam.pot) &&
              canPlaceInGroup(conflictingTeam, otherGroupTeams)) {
            
            // Perform the swap
            groups[targetGroup] = targetGroupTeams.filter(t => t.id !== conflictingTeam.id);
            groups[otherGroup].push(conflictingTeam);
            groups[targetGroup].push(team);
            return true;
          }
        }
      }
    }
  }
  
  return false;
}
