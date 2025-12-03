export type TournamentType = 'worldcup32' | 'worldcup48' | 'libertadores' | 'brasileiro' | 'escolar';

export type Confederation = 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  pot?: number;
  country?: string;
  confederation?: Confederation;
  fifaRanking?: number;
}

export interface Tournament {
  id: TournamentType;
  name: string;
  description: string;
  icon: string;
  groupCount: number;
  teamsPerGroup: number;
  teams: Team[];
  usesPots?: boolean;
  usesConfederationRules?: boolean;
}

// World Cup 48 teams with confederations and FIFA ranking
export const worldCupTeams48: Team[] = [
  // Pot 1 - Top ranked (1-12)
  { id: 'arg', name: 'Argentina', shortName: 'ARG', flag: '🇦🇷', pot: 1, confederation: 'CONMEBOL', fifaRanking: 1 },
  { id: 'fra', name: 'França', shortName: 'FRA', flag: '🇫🇷', pot: 1, confederation: 'UEFA', fifaRanking: 2 },
  { id: 'bel', name: 'Bélgica', shortName: 'BEL', flag: '🇧🇪', pot: 1, confederation: 'UEFA', fifaRanking: 3 },
  { id: 'eng', name: 'Inglaterra', shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', pot: 1, confederation: 'UEFA', fifaRanking: 4 },
  { id: 'bra', name: 'Brasil', shortName: 'BRA', flag: '🇧🇷', pot: 1, confederation: 'CONMEBOL', fifaRanking: 5 },
  { id: 'por', name: 'Portugal', shortName: 'POR', flag: '🇵🇹', pot: 1, confederation: 'UEFA', fifaRanking: 6 },
  { id: 'ned', name: 'Holanda', shortName: 'NED', flag: '🇳🇱', pot: 1, confederation: 'UEFA', fifaRanking: 7 },
  { id: 'esp', name: 'Espanha', shortName: 'ESP', flag: '🇪🇸', pot: 1, confederation: 'UEFA', fifaRanking: 8 },
  { id: 'ita', name: 'Itália', shortName: 'ITA', flag: '🇮🇹', pot: 1, confederation: 'UEFA', fifaRanking: 9 },
  { id: 'cro', name: 'Croácia', shortName: 'CRO', flag: '🇭🇷', pot: 1, confederation: 'UEFA', fifaRanking: 10 },
  { id: 'usa', name: 'Estados Unidos', shortName: 'USA', flag: '🇺🇸', pot: 1, confederation: 'CONCACAF', fifaRanking: 11 },
  { id: 'mex', name: 'México', shortName: 'MEX', flag: '🇲🇽', pot: 1, confederation: 'CONCACAF', fifaRanking: 12 },
  
  // Pot 2 (13-24)
  { id: 'ger', name: 'Alemanha', shortName: 'GER', flag: '🇩🇪', pot: 2, confederation: 'UEFA', fifaRanking: 13 },
  { id: 'uru', name: 'Uruguai', shortName: 'URU', flag: '🇺🇾', pot: 2, confederation: 'CONMEBOL', fifaRanking: 14 },
  { id: 'col', name: 'Colômbia', shortName: 'COL', flag: '🇨🇴', pot: 2, confederation: 'CONMEBOL', fifaRanking: 15 },
  { id: 'den', name: 'Dinamarca', shortName: 'DEN', flag: '🇩🇰', pot: 2, confederation: 'UEFA', fifaRanking: 16 },
  { id: 'swi', name: 'Suíça', shortName: 'SUI', flag: '🇨🇭', pot: 2, confederation: 'UEFA', fifaRanking: 17 },
  { id: 'jpn', name: 'Japão', shortName: 'JPN', flag: '🇯🇵', pot: 2, confederation: 'AFC', fifaRanking: 18 },
  { id: 'mar', name: 'Marrocos', shortName: 'MAR', flag: '🇲🇦', pot: 2, confederation: 'CAF', fifaRanking: 19 },
  { id: 'sen', name: 'Senegal', shortName: 'SEN', flag: '🇸🇳', pot: 2, confederation: 'CAF', fifaRanking: 20 },
  { id: 'irn', name: 'Irã', shortName: 'IRN', flag: '🇮🇷', pot: 2, confederation: 'AFC', fifaRanking: 21 },
  { id: 'kor', name: 'Coreia do Sul', shortName: 'KOR', flag: '🇰🇷', pot: 2, confederation: 'AFC', fifaRanking: 22 },
  { id: 'aus', name: 'Austrália', shortName: 'AUS', flag: '🇦🇺', pot: 2, confederation: 'AFC', fifaRanking: 23 },
  { id: 'pol', name: 'Polônia', shortName: 'POL', flag: '🇵🇱', pot: 2, confederation: 'UEFA', fifaRanking: 24 },
  
  // Pot 3 (25-36)
  { id: 'ukr', name: 'Ucrânia', shortName: 'UKR', flag: '🇺🇦', pot: 3, confederation: 'UEFA', fifaRanking: 25 },
  { id: 'aut', name: 'Áustria', shortName: 'AUT', flag: '🇦🇹', pot: 3, confederation: 'UEFA', fifaRanking: 26 },
  { id: 'srb', name: 'Sérvia', shortName: 'SRB', flag: '🇷🇸', pot: 3, confederation: 'UEFA', fifaRanking: 27 },
  { id: 'tur', name: 'Turquia', shortName: 'TUR', flag: '🇹🇷', pot: 3, confederation: 'UEFA', fifaRanking: 28 },
  { id: 'hun', name: 'Hungria', shortName: 'HUN', flag: '🇭🇺', pot: 3, confederation: 'UEFA', fifaRanking: 29 },
  { id: 'ecu', name: 'Equador', shortName: 'ECU', flag: '🇪🇨', pot: 3, confederation: 'CONMEBOL', fifaRanking: 30 },
  { id: 'sco', name: 'Escócia', shortName: 'SCO', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', pot: 3, confederation: 'UEFA', fifaRanking: 31 },
  { id: 'can', name: 'Canadá', shortName: 'CAN', flag: '🇨🇦', pot: 3, confederation: 'CONCACAF', fifaRanking: 32 },
  { id: 'wal', name: 'País de Gales', shortName: 'WAL', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', pot: 3, confederation: 'UEFA', fifaRanking: 33 },
  { id: 'nga', name: 'Nigéria', shortName: 'NGA', flag: '🇳🇬', pot: 3, confederation: 'CAF', fifaRanking: 34 },
  { id: 'civ', name: 'Costa do Marfim', shortName: 'CIV', flag: '🇨🇮', pot: 3, confederation: 'CAF', fifaRanking: 35 },
  { id: 'egy', name: 'Egito', shortName: 'EGY', flag: '🇪🇬', pot: 3, confederation: 'CAF', fifaRanking: 36 },
  
  // Pot 4 (37-48)
  { id: 'chi', name: 'Chile', shortName: 'CHI', flag: '🇨🇱', pot: 4, confederation: 'CONMEBOL', fifaRanking: 37 },
  { id: 'per', name: 'Peru', shortName: 'PER', flag: '🇵🇪', pot: 4, confederation: 'CONMEBOL', fifaRanking: 38 },
  { id: 'par', name: 'Paraguai', shortName: 'PAR', flag: '🇵🇾', pot: 4, confederation: 'CONMEBOL', fifaRanking: 39 },
  { id: 'crc', name: 'Costa Rica', shortName: 'CRC', flag: '🇨🇷', pot: 4, confederation: 'CONCACAF', fifaRanking: 40 },
  { id: 'alg', name: 'Argélia', shortName: 'ALG', flag: '🇩🇿', pot: 4, confederation: 'CAF', fifaRanking: 41 },
  { id: 'cmr', name: 'Camarões', shortName: 'CMR', flag: '🇨🇲', pot: 4, confederation: 'CAF', fifaRanking: 42 },
  { id: 'gha', name: 'Gana', shortName: 'GHA', flag: '🇬🇭', pot: 4, confederation: 'CAF', fifaRanking: 43 },
  { id: 'tun', name: 'Tunísia', shortName: 'TUN', flag: '🇹🇳', pot: 4, confederation: 'CAF', fifaRanking: 44 },
  { id: 'ksa', name: 'Arábia Saudita', shortName: 'KSA', flag: '🇸🇦', pot: 4, confederation: 'AFC', fifaRanking: 45 },
  { id: 'qat', name: 'Catar', shortName: 'QAT', flag: '🇶🇦', pot: 4, confederation: 'AFC', fifaRanking: 46 },
  { id: 'uae', name: 'Emirados Árabes', shortName: 'UAE', flag: '🇦🇪', pot: 4, confederation: 'AFC', fifaRanking: 47 },
  { id: 'nzl', name: 'Nova Zelândia', shortName: 'NZL', flag: '🇳🇿', pot: 4, confederation: 'OFC', fifaRanking: 48 },
];

// World Cup 32 teams with confederations
export const worldCupTeams32: Team[] = [
  // Pot 1
  { id: 'arg', name: 'Argentina', shortName: 'ARG', flag: '🇦🇷', pot: 1, confederation: 'CONMEBOL', fifaRanking: 1 },
  { id: 'fra', name: 'França', shortName: 'FRA', flag: '🇫🇷', pot: 1, confederation: 'UEFA', fifaRanking: 2 },
  { id: 'bel', name: 'Bélgica', shortName: 'BEL', flag: '🇧🇪', pot: 1, confederation: 'UEFA', fifaRanking: 3 },
  { id: 'eng', name: 'Inglaterra', shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', pot: 1, confederation: 'UEFA', fifaRanking: 4 },
  { id: 'bra', name: 'Brasil', shortName: 'BRA', flag: '🇧🇷', pot: 1, confederation: 'CONMEBOL', fifaRanking: 5 },
  { id: 'por', name: 'Portugal', shortName: 'POR', flag: '🇵🇹', pot: 1, confederation: 'UEFA', fifaRanking: 6 },
  { id: 'ned', name: 'Holanda', shortName: 'NED', flag: '🇳🇱', pot: 1, confederation: 'UEFA', fifaRanking: 7 },
  { id: 'esp', name: 'Espanha', shortName: 'ESP', flag: '🇪🇸', pot: 1, confederation: 'UEFA', fifaRanking: 8 },
  // Pot 2
  { id: 'ita', name: 'Itália', shortName: 'ITA', flag: '🇮🇹', pot: 2, confederation: 'UEFA', fifaRanking: 9 },
  { id: 'cro', name: 'Croácia', shortName: 'CRO', flag: '🇭🇷', pot: 2, confederation: 'UEFA', fifaRanking: 10 },
  { id: 'usa', name: 'Estados Unidos', shortName: 'USA', flag: '🇺🇸', pot: 2, confederation: 'CONCACAF', fifaRanking: 11 },
  { id: 'mex', name: 'México', shortName: 'MEX', flag: '🇲🇽', pot: 2, confederation: 'CONCACAF', fifaRanking: 12 },
  { id: 'ger', name: 'Alemanha', shortName: 'GER', flag: '🇩🇪', pot: 2, confederation: 'UEFA', fifaRanking: 13 },
  { id: 'uru', name: 'Uruguai', shortName: 'URU', flag: '🇺🇾', pot: 2, confederation: 'CONMEBOL', fifaRanking: 14 },
  { id: 'col', name: 'Colômbia', shortName: 'COL', flag: '🇨🇴', pot: 2, confederation: 'CONMEBOL', fifaRanking: 15 },
  { id: 'den', name: 'Dinamarca', shortName: 'DEN', flag: '🇩🇰', pot: 2, confederation: 'UEFA', fifaRanking: 16 },
  // Pot 3
  { id: 'swi', name: 'Suíça', shortName: 'SUI', flag: '🇨🇭', pot: 3, confederation: 'UEFA', fifaRanking: 17 },
  { id: 'jpn', name: 'Japão', shortName: 'JPN', flag: '🇯🇵', pot: 3, confederation: 'AFC', fifaRanking: 18 },
  { id: 'mar', name: 'Marrocos', shortName: 'MAR', flag: '🇲🇦', pot: 3, confederation: 'CAF', fifaRanking: 19 },
  { id: 'sen', name: 'Senegal', shortName: 'SEN', flag: '🇸🇳', pot: 3, confederation: 'CAF', fifaRanking: 20 },
  { id: 'irn', name: 'Irã', shortName: 'IRN', flag: '🇮🇷', pot: 3, confederation: 'AFC', fifaRanking: 21 },
  { id: 'kor', name: 'Coreia do Sul', shortName: 'KOR', flag: '🇰🇷', pot: 3, confederation: 'AFC', fifaRanking: 22 },
  { id: 'aus', name: 'Austrália', shortName: 'AUS', flag: '🇦🇺', pot: 3, confederation: 'AFC', fifaRanking: 23 },
  { id: 'pol', name: 'Polônia', shortName: 'POL', flag: '🇵🇱', pot: 3, confederation: 'UEFA', fifaRanking: 24 },
  // Pot 4
  { id: 'ecu', name: 'Equador', shortName: 'ECU', flag: '🇪🇨', pot: 4, confederation: 'CONMEBOL', fifaRanking: 25 },
  { id: 'can', name: 'Canadá', shortName: 'CAN', flag: '🇨🇦', pot: 4, confederation: 'CONCACAF', fifaRanking: 26 },
  { id: 'crc', name: 'Costa Rica', shortName: 'CRC', flag: '🇨🇷', pot: 4, confederation: 'CONCACAF', fifaRanking: 27 },
  { id: 'cmr', name: 'Camarões', shortName: 'CMR', flag: '🇨🇲', pot: 4, confederation: 'CAF', fifaRanking: 28 },
  { id: 'gha', name: 'Gana', shortName: 'GHA', flag: '🇬🇭', pot: 4, confederation: 'CAF', fifaRanking: 29 },
  { id: 'tun', name: 'Tunísia', shortName: 'TUN', flag: '🇹🇳', pot: 4, confederation: 'CAF', fifaRanking: 30 },
  { id: 'ksa', name: 'Arábia Saudita', shortName: 'KSA', flag: '🇸🇦', pot: 4, confederation: 'AFC', fifaRanking: 31 },
  { id: 'qat', name: 'Catar', shortName: 'QAT', flag: '🇶🇦', pot: 4, confederation: 'AFC', fifaRanking: 32 },
];

// Libertadores teams
export const libertadoresTeams: Team[] = [
  { id: 'fla', name: 'Flamengo', shortName: 'FLA', flag: '🔴⚫', country: 'Brasil' },
  { id: 'pal', name: 'Palmeiras', shortName: 'PAL', flag: '🟢⚪', country: 'Brasil' },
  { id: 'sao', name: 'São Paulo', shortName: 'SAO', flag: '🔴⚪⚫', country: 'Brasil' },
  { id: 'flu', name: 'Fluminense', shortName: 'FLU', flag: '🟢🔴⚪', country: 'Brasil' },
  { id: 'cor', name: 'Corinthians', shortName: 'COR', flag: '⚫⚪', country: 'Brasil' },
  { id: 'atl', name: 'Atlético-MG', shortName: 'CAM', flag: '⚫⚪', country: 'Brasil' },
  { id: 'boc', name: 'Boca Juniors', shortName: 'BOC', flag: '🔵🟡', country: 'Argentina' },
  { id: 'riv', name: 'River Plate', shortName: 'RIV', flag: '⚪🔴', country: 'Argentina' },
  { id: 'rac', name: 'Racing Club', shortName: 'RAC', flag: '🔵⚪', country: 'Argentina' },
  { id: 'ind', name: 'Independiente', shortName: 'IND', flag: '🔴', country: 'Argentina' },
  { id: 'pen', name: 'Peñarol', shortName: 'PEN', flag: '🟡⚫', country: 'Uruguai' },
  { id: 'nac', name: 'Nacional', shortName: 'NAC', flag: '🔵⚪🔴', country: 'Uruguai' },
  { id: 'colo', name: 'Colo-Colo', shortName: 'COL', flag: '⚪⚫', country: 'Chile' },
  { id: 'uni', name: 'Universidad de Chile', shortName: 'UCH', flag: '🔵', country: 'Chile' },
  { id: 'ali', name: 'Alianza Lima', shortName: 'ALI', flag: '🔵⚪', country: 'Peru' },
  { id: 'cer', name: 'Cerro Porteño', shortName: 'CER', flag: '🔵🔴', country: 'Paraguai' },
];

// Brazilian Championship teams
export const brasileiroTeams: Team[] = [
  { id: 'fla', name: 'Flamengo', shortName: 'FLA', flag: '🔴⚫', country: 'RJ' },
  { id: 'pal', name: 'Palmeiras', shortName: 'PAL', flag: '🟢⚪', country: 'SP' },
  { id: 'cor', name: 'Corinthians', shortName: 'COR', flag: '⚫⚪', country: 'SP' },
  { id: 'sao', name: 'São Paulo', shortName: 'SAO', flag: '🔴⚪⚫', country: 'SP' },
  { id: 'flu', name: 'Fluminense', shortName: 'FLU', flag: '🟢🔴⚪', country: 'RJ' },
  { id: 'atl', name: 'Atlético-MG', shortName: 'CAM', flag: '⚫⚪', country: 'MG' },
  { id: 'bot', name: 'Botafogo', shortName: 'BOT', flag: '⚫⚪', country: 'RJ' },
  { id: 'vas', name: 'Vasco', shortName: 'VAS', flag: '⚫⚪', country: 'RJ' },
  { id: 'int', name: 'Internacional', shortName: 'INT', flag: '🔴⚪', country: 'RS' },
  { id: 'gre', name: 'Grêmio', shortName: 'GRE', flag: '🔵⚫⚪', country: 'RS' },
  { id: 'san', name: 'Santos', shortName: 'SAN', flag: '⚫⚪', country: 'SP' },
  { id: 'ath', name: 'Athletico-PR', shortName: 'CAP', flag: '🔴⚫', country: 'PR' },
  { id: 'bah', name: 'Bahia', shortName: 'BAH', flag: '🔵⚪🔴', country: 'BA' },
  { id: 'for', name: 'Fortaleza', shortName: 'FOR', flag: '🔵🔴⚪', country: 'CE' },
  { id: 'cea', name: 'Ceará', shortName: 'CEA', flag: '⚫⚪', country: 'CE' },
  { id: 'cru', name: 'Cruzeiro', shortName: 'CRU', flag: '🔵⚪', country: 'MG' },
];

// School tournament teams
export const escolarTeams: Team[] = [
  { id: 'tur1', name: 'Turma 1A', shortName: '1A', flag: '🔴', country: 'Escola' },
  { id: 'tur2', name: 'Turma 1B', shortName: '1B', flag: '🔵', country: 'Escola' },
  { id: 'tur3', name: 'Turma 2A', shortName: '2A', flag: '🟢', country: 'Escola' },
  { id: 'tur4', name: 'Turma 2B', shortName: '2B', flag: '🟡', country: 'Escola' },
  { id: 'tur5', name: 'Turma 3A', shortName: '3A', flag: '🟣', country: 'Escola' },
  { id: 'tur6', name: 'Turma 3B', shortName: '3B', flag: '🟠', country: 'Escola' },
  { id: 'tur7', name: 'Turma 4A', shortName: '4A', flag: '⚪', country: 'Escola' },
  { id: 'tur8', name: 'Turma 4B', shortName: '4B', flag: '⚫', country: 'Escola' },
];

export const tournaments: Tournament[] = [
  {
    id: 'worldcup48',
    name: 'Copa do Mundo 48',
    description: 'Formato 2026 com regras FIFA de potes e confederações',
    icon: '🏆',
    groupCount: 12,
    teamsPerGroup: 4,
    teams: worldCupTeams48,
    usesPots: true,
    usesConfederationRules: true,
  },
  {
    id: 'worldcup32',
    name: 'Copa do Mundo 32',
    description: 'Formato clássico com regras FIFA',
    icon: '🏆',
    groupCount: 8,
    teamsPerGroup: 4,
    teams: worldCupTeams32,
    usesPots: true,
    usesConfederationRules: true,
  },
  {
    id: 'libertadores',
    name: 'Libertadores',
    description: 'Sorteio da maior competição da América do Sul',
    icon: '⭐',
    groupCount: 4,
    teamsPerGroup: 4,
    teams: libertadoresTeams,
  },
  {
    id: 'brasileiro',
    name: 'Campeonato Brasileiro',
    description: 'Sorteio de grupos do Brasileirão',
    icon: '🇧🇷',
    groupCount: 4,
    teamsPerGroup: 4,
    teams: brasileiroTeams,
  },
  {
    id: 'escolar',
    name: 'Torneio Escolar',
    description: 'Sorteio para campeonatos escolares',
    icon: '🎓',
    groupCount: 2,
    teamsPerGroup: 4,
    teams: escolarTeams,
  },
];

export const getTournament = (type: TournamentType): Tournament | undefined => {
  return tournaments.find(t => t.id === type);
};

export const confederationNames: Record<Confederation, string> = {
  UEFA: 'Europa',
  CONMEBOL: 'América do Sul',
  CONCACAF: 'América do Norte',
  CAF: 'África',
  AFC: 'Ásia',
  OFC: 'Oceania',
};

// Check if a team can be placed in a group based on confederation rules
export const canPlaceInGroup = (team: Team, groupTeams: Team[]): boolean => {
  if (!team.confederation) return true;
  
  const confederationCount = groupTeams.filter(t => t.confederation === team.confederation).length;
  
  // UEFA can have up to 2 teams per group
  if (team.confederation === 'UEFA') {
    return confederationCount < 2;
  }
  
  // Other confederations can have only 1 team per group
  return confederationCount < 1;
};

// Get teams grouped by pot
export const getTeamsByPot = (teams: Team[]): Record<number, Team[]> => {
  return teams.reduce((acc, team) => {
    const pot = team.pot || 4;
    if (!acc[pot]) acc[pot] = [];
    acc[pot].push(team);
    return acc;
  }, {} as Record<number, Team[]>);
};
