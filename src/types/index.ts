export type Rank = 
  | 'Molecule' 
  | 'Sub3' 
  | 'Normie' 
  | 'LTN' 
  | 'MTN' 
  | 'HTN' 
  | 'PSL' 
  | 'Chadlite' 
  | 'Chad' 
  | 'Slayer';

export interface UserStats {
  id: string;
  username: string;
  elo: number;
  rank: Rank;
  wins: number;
  losses: number;
  streak: number;
  peak_elo: number;
  avatar_url?: string;
  discord_id?: string;
}

export interface Match {
  id: string;
  player1_id: string;
  player2_id: string;
  status: 'searching' | 'ongoing' | 'finished';
  winner_id?: string;
  p1_score?: number;
  p2_score?: number;
  created_at: string;
}

export interface AIScanResult {
  psl_score: number;
  symmetry: number;
  jawline_definition: number;
  canthal_tilt: 'positive' | 'neutral' | 'negative';
  midface_ratio: number;
  confidence: number;
}
