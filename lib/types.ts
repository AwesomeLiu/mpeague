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

// ========== sheet data ========== //
export enum PlayerSheetEnum {
  player_name = "昵称",
  best_point = "半庄最高分数",
  num_matches = "半庄数",
  score = "精算点",
  ho_rate = "和率",
  avg_point = "和了得点",
  hoju_rate = "铳率",
  avg_hoju_point = "铳点",
  richi_rate = "立直率",
  naki_rate = "副露率",
  num_1 = "一位",
  num_2 = "二位",
  num_3 = "三位",
  num_4 = "四位",
  top2_rate = "连对率",
  last_avoid_rate = "避四率",
};
export type PlayerJSONType = {
  [key in PlayerSheetEnum]?: any
};

export enum TeamSheetEnum {
  team_name = "队伍",
  score = "分数",
  num_matches = "对局数",
};
export type TeamJSONType = {
  [key in TeamSheetEnum]?: any
};

export enum ScheduleSheetEnum {
  game_date = "日期",
  game_round = "轮次",
  team_1 = "东",
  team_2 = "南",
  team_3 = "西",
  team_4 = "北",
  remark = "说明",
};
export type ScheduleJSONType = {
  [key in ScheduleSheetEnum]?: any
};

export enum SheetNameEnum {
  prePlayer = "初赛个人数据统计",
  preTeam = "初赛队伍排名",
  preSchedule = "初赛赛果统计",
  semiPlayer = "半决赛个人数据统计",
  semiTeam = "半决赛队伍排名",
  semiSchedule = "半决赛赛果统计",
  finalPlayer = "决赛个人数据统计",
  finalTeam = "决赛队伍排名",
  finalSchedule = "决赛赛果统计",
};
export type SheetNames = `${SheetNameEnum}`;