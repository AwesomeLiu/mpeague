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
export enum PlayerRankEnum {
  SCORE = "score",
  POINT = "best_point",
  AVOID = "last_avoid_rate",
};
export type PlayerRankType = `${PlayerRankEnum}`;

export type TeamInfo = {
  id: number;
  name: string;
  theme: string;
  score: string;
  eliminated: boolean;
  matches: number;
  avatar: string;
};

export type TeamDetail = TeamInfo & {
  rank: number;
  diff: string;
  players?: PlayerBrief[];
}

export type PlayerInfo = {
  id: number;
  name: string;
  team: number;
  teamInfo: TeamInfo,
  score: string;
  matches: number;
  avatar: string;
}

export type PlayerBrief = {
  id: number;
  name: string;
  team: number;
  score: string;
  rank: number;
  avatar: string;
}

export type UnknownPlayer = {
  team: number;
  teamInfo: TeamInfo,
  score: string;
}

export type ScheduleType = {
  date: Date;
  round: number;
  teams: TeamInfo[];
  winner?: number;
};

export type UnionPlayer = PlayerInfo | UnknownPlayer;
export type ScheduleDetail = {
  date: Date;
  gameId: number;
  session: number;
  players: UnionPlayer[];
};

// ========== game round ========== //
export type GameRound = {
  round: string;
  remark: string;
  disabled?: boolean;
};

// ========== chart ========== //
export type GameDetail = {
  gameId: number;
  detail: Chart[];
}

export type Chart = {
  label: string;
  points: number[];
}
