// ========== component props ========== //
export type FCProps = {
  children?: React.ReactNode;
};

// ========== menu ========== //
export type tMenu = {
  label: string;
  path: string;
};

// ========== team & player ========== //
export type BasicInfo = {
  id: number;
  name: string;
  avatar: string;
  score: number;
  rank: number;
};

export type Team = BasicInfo & {
  eliminated: boolean;
};

export type Player = BasicInfo & {
  team: Team;
};

export type TeamScore = Team & {
  diff: number | "-";
};

// export type PlayerScore = Player;

export type DailyScore = {
  date: Date;
  teams: Team[];
  games: GameScore[];
};

export type GameScore = {
  session: number;
  result: Player[];
};

// ========== game round ========== //
/* export enum RoundNum {
  A = "1",
  B = "2",
  C = "3",
  D = "4",
  E = "5",
  F = "6",
  G = "7",
  H = "8",
  I = "9",
  J = "10",
} */

export type RoundNum = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"; 

export type GameRound = {
  round: RoundNum;
  start: Date;
  end: Date;
  remark: string;
  disabled?: boolean;
};

