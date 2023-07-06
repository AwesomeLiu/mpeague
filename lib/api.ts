import { db } from "@vercel/postgres";
import {
  GameDetail,
  GameRound,
  PlayerBrief,
  PlayerInfo,
  PlayerRankType,
  ScheduleDetail,
  ScheduleType,
  TeamDetail,
  TeamInfo,
  tMenu,
} from "./types";
import {
  handleGameDetail,
  handleGameRound,
  handlePlayerBrief,
  handlePlayerInfo,
  handleScheduleDetail,
  handleScheduleType,
  handleTeamDetail,
  handleTeamInfo
} from "./handler";
import formatDate from "./formatDate";

export async function fetchData(queryString: string) {
  /* console.log({
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
  }); */
  const client = await db.connect();
  const response = await client.query(queryString);
  client.release();
  return response;
}

export async function getTeamsById(teamId?: number[]): Promise<TeamInfo[]> {
  let constraint = "";
  if (Array.isArray(teamId) && teamId.length > 0) {
    constraint = `WHERE id in (${teamId.toString()})`;
  }

  const queryString = `
    SELECT 
      id,
      team_name AS name,
      team_theme AS theme,
      score,
      eliminated,
      num_matches AS matches
    FROM team
    ${constraint}
    ORDER BY id ASC
  `;
  const response = await fetchData(queryString);
  const data = handleTeamInfo(response.rows);
  return data;
}

export async function getTeamsRank(teamId?: number[], withPlayers: boolean = false): Promise<TeamDetail[]> {
  let constraint = "";
  if (Array.isArray(teamId) && teamId.length > 0) {
    constraint = `WHERE id in (${teamId.toString()})`;
  }

  const queryString = `
    SELECT 
      id,
      team_name AS name,
      team_theme AS theme,
      score,
      eliminated,
      num_matches AS matches,
      RANK() OVER (ORDER BY score DESC) AS rank
    FROM team
    ${constraint}
  `;
  const response = await fetchData(queryString);

  if (withPlayers) {
    let players = await getPlayersByTeamId(teamId);
    let data = handleTeamDetail(response.rows, players);
    return data;
  } else {
    let data = handleTeamDetail(response.rows);
    return data;
  }
}

export async function getPlayersById(playerId?: number[]): Promise<PlayerInfo[]> {
  let constraint = "";
  if (Array.isArray(playerId) && playerId.length > 0) {
    constraint = `WHERE id in (${playerId.toString()})`;
  }

  const queryString = `
    SELECT
      id,
      player_name AS name,
      team_id AS team,
      score,
      num_matches AS matches
    FROM player
    ${constraint}
  `;
  const response = await fetchData(queryString);
  const teams = await getTeamsById();
  const data = handlePlayerInfo(response.rows, teams);
  return data;
}

export async function getPlayerRank(orderType: PlayerRankType, playerId?: number[]): Promise<PlayerBrief[]> {
  let constraint = "";
  if (Array.isArray(playerId) && playerId.length > 0) {
    constraint = `WHERE id in (${playerId.toString()})`;
  }
  
  const queryString = `
    SELECT
      id,
      player_name AS name,
      team_id AS team,
      ${orderType} AS score,
      RANK() OVER (ORDER BY ${orderType} DESC NULLS LAST) AS rank
    FROM player
    ${constraint}
  `;
  const response = await fetchData(queryString);
  const data = handlePlayerBrief(response.rows, orderType);
  return data;
}

export async function getPlayersByTeamId(teamId?: number[]): Promise<PlayerBrief[]> {
  let constraint = "";
  if (Array.isArray(teamId) && teamId.length > 0) {
    constraint = `WHERE team_id in (${teamId.toString()})`;
  }

  const queryString = `
    SELECT
      id,
      player_name AS name,
      team_id AS team,
      score,
      RANK() OVER (ORDER BY score DESC NULLS LAST) AS rank
    FROM player
    ${constraint}
  `;
  const response = await fetchData(queryString);
  const data = handlePlayerBrief(response.rows);
  return data;
}

export async function getCurrentSchedule(): Promise<ScheduleType[]> {
  const queryString = `
    SELECT * FROM schedule
    WHERE game_round = (
      SELECT
        game_round
      FROM schedule
      WHERE game_date = current_date
    )
    ORDER BY game_date ASC;
  `;
  const response = await fetchData(queryString);

  if (response.rowCount === 0) {
    // query last round
    let res = await fetchData(`
      SELECT
        MAX(game_round) AS max_round
      FROM schedule
    `);
    let lastRound = res.rows[0].max_round;
    let result = await getScheduleByRound(lastRound);
    return result;
  }

  const teams = await getTeamsById();
  const data = handleScheduleType(response.rows, teams);
  return data;
}

export async function getScheduleByRound(round: number): Promise<ScheduleType[]> {
  const queryString = `
    SELECT * FROM schedule
    WHERE game_round = ${round}
    ORDER BY game_date ASC;
  `;
  const response = await fetchData(queryString);
  const teams = await getTeamsById();
  const data = handleScheduleType(response.rows, teams);
  return data;
}

export async function getScheduleByDate(startDate: Date, endDate: Date): Promise<ScheduleType[]> {
  const queryString = `
    SELECT * FROM schedule
    WHERE game_date BETWEEN ${startDate} AND ${endDate}
    ORDER BY game_date ASC;
  `;
  const response = await fetchData(queryString);
  const teams = await getTeamsById();
  const data = handleScheduleType(response.rows, teams);
  return data;
}

export async function getScheduleDetail(date: Date, teams: TeamInfo[]): Promise<ScheduleDetail[]> {
  const queryString = `
    SELECT
      game.*,
      schedule.team_1,
      schedule.team_2,
      schedule.team_3,
      schedule.team_4
    FROM game
    INNER JOIN schedule
    ON game.game_date = schedule.game_date
    WHERE game.game_date = '${formatDate(date, "yyyy-MM-dd")}'
    ORDER BY game_session ASC;
  `;
  const response = await fetchData(queryString);
  const players = await getPlayersById();
  const data = handleScheduleDetail(date, response.rows, players, teams);
  return data;
}

export async function getMenu(): Promise<tMenu[]> {
  const menu: tMenu[] = [
    {
      label: "赛程安排",
      path: "/schedule"
    },
    {
      label: "对战成绩",
      path: "/score"
    },
    {
      label: "队伍·选手",
      path: "/teams"
    },
    {
      label: "比赛规则",
      path: "/rule",
    },
    {
      label: "役满赏",
      path: "/yakuman",
    },
    {
      label: "往届回顾",
      path: "/history"
    },
    {
      label: "关于我们",
      path: "/about"
    }
  ];

  return menu;
}

export async function getGameRounds(): Promise<GameRound[]> {
  const queryString = `
    SELECT
      game_round AS round,
      remark
    FROM schedule
    GROUP BY game_round, remark
    ORDER BY game_round ASC;
  `;
  const response = await fetchData(queryString);
  const data = handleGameRound(response.rows);
  return data;
}

export async function getGameDetailByGameId(gameId: number[]): Promise<GameDetail[]> {
  if (Array.isArray(gameId) && gameId.length === 0) {
    return [];
  }

  let constraint = "";
  if (Array.isArray(gameId) && gameId.length > 0) {
    constraint = `WHERE game_id in (${gameId.toString()})`;
  }

  const queryString = `
    SELECT * FROM game_detail
    ${constraint}
    ORDER BY id ASC;
  `;
  const response = await fetchData(queryString);
  const data = handleGameDetail(response.rows, gameId);
  return data;
}
