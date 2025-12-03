export type TournamentType = 'worldcup' | 'libertadores' | 'brasileiro' | 'escolar';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  flag: string; // emoji or URL
  pot?: number;
  country?: string;
}

export interface Tournament {
  id: TournamentType;
  name: string;
  description: string;
  icon: string;
  groupCount: number;
  teamsPerGroup: number;
  teams: Team[];
}

// World Cup teams with flag emojis
export const worldCupTeams: Team[] = [
  // Pot 1
  { id: 'qat', name: 'Qatar', shortName: 'QAT', flag: '🇶🇦', pot: 1 },
  { id: 'bra', name: 'Brasil', shortName: 'BRA', flag: '🇧🇷', pot: 1 },
  { id: 'bel', name: 'Bélgica', shortName: 'BEL', flag: '🇧🇪', pot: 1 },
  { id: 'fra', name: 'França', shortName: 'FRA', flag: '🇫🇷', pot: 1 },
  { id: 'arg', name: 'Argentina', shortName: 'ARG', flag: '🇦🇷', pot: 1 },
  { id: 'eng', name: 'Inglaterra', shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', pot: 1 },
  { id: 'esp', name: 'Espanha', shortName: 'ESP', flag: '🇪🇸', pot: 1 },
  { id: 'por', name: 'Portugal', shortName: 'POR', flag: '🇵🇹', pot: 1 },
  // Pot 2
  { id: 'ned', name: 'Holanda', shortName: 'NED', flag: '🇳🇱', pot: 2 },
  { id: 'den', name: 'Dinamarca', shortName: 'DEN', flag: '🇩🇰', pot: 2 },
  { id: 'ger', name: 'Alemanha', shortName: 'GER', flag: '🇩🇪', pot: 2 },
  { id: 'mex', name: 'México', shortName: 'MEX', flag: '🇲🇽', pot: 2 },
  { id: 'usa', name: 'EUA', shortName: 'USA', flag: '🇺🇸', pot: 2 },
  { id: 'swi', name: 'Suíça', shortName: 'SUI', flag: '🇨🇭', pot: 2 },
  { id: 'cro', name: 'Croácia', shortName: 'CRO', flag: '🇭🇷', pot: 2 },
  { id: 'uru', name: 'Uruguai', shortName: 'URU', flag: '🇺🇾', pot: 2 },
  // Pot 3
  { id: 'sen', name: 'Senegal', shortName: 'SEN', flag: '🇸🇳', pot: 3 },
  { id: 'irn', name: 'Irã', shortName: 'IRN', flag: '🇮🇷', pot: 3 },
  { id: 'jpn', name: 'Japão', shortName: 'JPN', flag: '🇯🇵', pot: 3 },
  { id: 'mar', name: 'Marrocos', shortName: 'MAR', flag: '🇲🇦', pot: 3 },
  { id: 'srb', name: 'Sérvia', shortName: 'SRB', flag: '🇷🇸', pot: 3 },
  { id: 'pol', name: 'Polônia', shortName: 'POL', flag: '🇵🇱', pot: 3 },
  { id: 'kor', name: 'Coreia do Sul', shortName: 'KOR', flag: '🇰🇷', pot: 3 },
  { id: 'tun', name: 'Tunísia', shortName: 'TUN', flag: '🇹🇳', pot: 3 },
  // Pot 4
  { id: 'crc', name: 'Costa Rica', shortName: 'CRC', flag: '🇨🇷', pot: 4 },
  { id: 'aus', name: 'Austrália', shortName: 'AUS', flag: '🇦🇺', pot: 4 },
  { id: 'can', name: 'Canadá', shortName: 'CAN', flag: '🇨🇦', pot: 4 },
  { id: 'cmr', name: 'Camarões', shortName: 'CMR', flag: '🇨🇲', pot: 4 },
  { id: 'ecu', name: 'Equador', shortName: 'ECU', flag: '🇪🇨', pot: 4 },
  { id: 'ksa', name: 'Arábia Saudita', shortName: 'KSA', flag: '🇸🇦', pot: 4 },
  { id: 'gha', name: 'Gana', shortName: 'GHA', flag: '🇬🇭', pot: 4 },
  { id: 'wal', name: 'País de Gales', shortName: 'WAL', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', pot: 4 },
];

// Libertadores teams
export const libertadoresTeams: Team[] = [
  // Brazil
  { id: 'fla', name: 'Flamengo', shortName: 'FLA', flag: '🔴⚫', country: 'Brasil' },
  { id: 'pal', name: 'Palmeiras', shortName: 'PAL', flag: '🟢⚪', country: 'Brasil' },
  { id: 'sao', name: 'São Paulo', shortName: 'SAO', flag: '🔴⚪⚫', country: 'Brasil' },
  { id: 'flu', name: 'Fluminense', shortName: 'FLU', flag: '🟢🔴⚪', country: 'Brasil' },
  { id: 'cor', name: 'Corinthians', shortName: 'COR', flag: '⚫⚪', country: 'Brasil' },
  { id: 'atl', name: 'Atlético-MG', shortName: 'CAM', flag: '⚫⚪', country: 'Brasil' },
  // Argentina
  { id: 'boc', name: 'Boca Juniors', shortName: 'BOC', flag: '🔵🟡', country: 'Argentina' },
  { id: 'riv', name: 'River Plate', shortName: 'RIV', flag: '⚪🔴', country: 'Argentina' },
  { id: 'rac', name: 'Racing Club', shortName: 'RAC', flag: '🔵⚪', country: 'Argentina' },
  { id: 'ind', name: 'Independiente', shortName: 'IND', flag: '🔴', country: 'Argentina' },
  // Others
  { id: 'pen', name: 'Peñarol', shortName: 'PEN', flag: '🟡⚫', country: 'Uruguai' },
  { id: 'nac', name: 'Nacional', shortName: 'NAC', flag: '🔵⚪🔴', country: 'Uruguai' },
  { id: 'col', name: 'Colo-Colo', shortName: 'COL', flag: '⚪⚫', country: 'Chile' },
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

// School tournament teams (generic)
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
    id: 'worldcup',
    name: 'Copa do Mundo',
    description: 'Sorteio estilo FIFA com 32 seleções em 8 grupos',
    icon: '🏆',
    groupCount: 8,
    teamsPerGroup: 4,
    teams: worldCupTeams,
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
