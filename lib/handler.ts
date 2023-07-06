import {
  Chart,
  GameDetail,
  GameRound,
  PlayerBrief,
  PlayerInfo,
  ScheduleDetail,
  ScheduleType,
  TeamDetail,
  TeamInfo,
  UnionPlayer,
  UnknownPlayer
} from "./types";
import { PlayerRankEnum, PlayerRankType } from "./types";
import formatSurfix from "./formatSurfix";

export function handleTeamInfo(dataSource: any[]): TeamInfo[] {
  const result = dataSource.map(d => {
    d.score = formatSurfix(d.score, "pt") as string;
    d.avatar = `/${d.id}.png`;
    return d;
  }) as TeamInfo[];

  return result;
}

export function handleTeamDetail(dataSource: any[], players?: PlayerBrief[]): TeamDetail[] {
  dataSource.reduce((accu, cur) => {
    cur.diff = accu === "-" ? "-" : formatSurfix(+accu - cur.score, "pt") as string;
    return cur.score;
  }, "-");

  const result = dataSource.map(d => {
    d.rank = +d.rank as number;
    d.score = formatSurfix(d.score, "pt") as string;
    d.avatar = `/${d.id}.png`;
    d.players = players?.filter(p => p.team === d.id);
    return d;
  }) as TeamDetail[];

  return result;
}

export function handlePlayerInfo(dataSource: any[], teams: TeamInfo[]): PlayerInfo[] {
  const result = dataSource.map(d => {
    d.teamInfo = teams.find(t => t.id === d.team);
    d.score = formatSurfix(d.score, "pt");
    d.avatar = "/profile_1.png";
    return d;
  }) as PlayerInfo[];

  return result;
}

export function handlePlayerBrief(dataSource: any[], orderType?: PlayerRankType): PlayerBrief[] {
  const result = dataSource.map(d => {
    d.score = orderType === PlayerRankEnum.AVOID ?
      formatSurfix(d.score, "%")
      :
      formatSurfix(d.score);

    d.avatar = "/profile_1.png";
    d.rank = +d.rank;
    return d;
  }) as PlayerBrief[];

  return result;
}

export function handleScheduleType(dataSource: any[], teams: TeamInfo[]): ScheduleType[] {
  const result = dataSource.map(d => {
    let teamIds = [d.team_1, d.team_2, d.team_3, d.team_4];
    let teamData = teamIds.map(tid => teams.find(t => t.id === tid)) as TeamInfo[];
    let data = {
      date: d.game_date,
      round: d.game_round,
      teams: teamData,
      winner: d.winner,
    };
    return data;
  }) as ScheduleType[];

  return result;
}

export function handleScheduleDetail(
  date: Date,
  dataSource: any[],
  players: PlayerInfo[],
  teams: TeamInfo[]
): ScheduleDetail[] {
  const result = dataSource.map(d => {
    let playerIds = [d.player_1, d.player_2, d.player_3, d.player_4];
    let scores = [d.score_1, d.score_2, d.score_3, d.score_4];
    let teamIds = [d.team_1, d.team_2, d.team_3, d.team_4];
    
    let details: UnionPlayer[] = [];
    for (let i = 0; i < playerIds.length; i++) {
      if (playerIds[i] == null) {
        let playerTeam = teams.find(t => t.id === teamIds[i]) as TeamInfo;
        let data: UnknownPlayer = {
          team: teamIds[i],
          teamInfo: playerTeam,
          score: "0",
        };

        details.push(data);
      } else {
        let playerData = players.find(p => p.id === playerIds[i]) as PlayerInfo;
        playerData.score = scores[i];

        details.push(playerData);
      }
    }

    let data: ScheduleDetail = {
      date: date,
      gameId: d.id,
      session: d.game_session,
      players: details,
    };

    return data;
  }) as ScheduleDetail[];

  return result;
}

export function handleGameRound(dataSource: any[]): GameRound[] {
  const result = dataSource.map(d => {
    if (typeof d.remark === "string" && d.remark.indexOf("!!!") === 0) {
      d.remark = d.remark.substring(3);
      d.disabled = true;
    }
    d.round = d.round.toString();
    return d;
  }) as GameRound[];

  return result;
}

export function handleGameDetail(dataSource: any[], gameId: number[]): GameDetail[] {
  let tempData = gameId.map(gid => {
    let group = dataSource.filter(d => d.game_id === gid);
    return {
      gameId: gid,
      group: group,
    };
  });
  
  const result = tempData.map(g => {
    let detail = g.group.map(d => {
      let points: number[] = [d.point_1, d.point_2, d.point_3, d.point_4];
      let chart: Chart = {
        label: d.label,
        points: points,
      };
      return chart;
    }) as Chart[];

    let data: GameDetail = {
      gameId: g.gameId,
      detail: detail,
    };

    return data;
  }) as GameDetail[];

  return result;
}
