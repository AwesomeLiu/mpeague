import fetchData from "./fetch";
import { formatDate } from "./format";

export async function insertPlayer(players: any[]) {
  const sqls: string[] = players.map((d, i) => `('${d.player_name}', ${Math.floor(i / 4) + 1})`);
  const insertString = `
    INSERT INTO player (player_name, team_id)
    VALUES ${sqls.join(", ")};
  `;
  await fetchData(insertString);
}

export async function updatePlayer(players: any[]): Promise<boolean> {
  const sqls: string[] = players.map(d => {
    let values = Object.keys(d)
      .filter(key => key !== "player_name")
      .map(key => {
        return `${key}=${d[key] == null ? null : d[key]}`;
      }).join(", ");

    let sqlstr = `
      UPDATE player
      SET ${values}
      WHERE player_name = '${d.player_name}';
    `
    return sqlstr;
  });

  const updateString = `
    BEGIN;
      ${sqls.join(" ")}
    COMMIT;
  `

  const response = await fetchData(updateString);
  const count = Array.isArray(response) ?
    response.filter(res => res.command === "UPDATE").length
    :
    response.rowCount;
  
  return count === players.length;
}

export async function updateTeam(teams: any[]): Promise<boolean> {
  const sqls: string[] = teams.map(d => {
    let values = Object.keys(d)
      .filter(key => key !== "team_name")
      .map(key => {
        return `${key}=${d[key]}`;
      }).join(", ");

    let sqlstr = `
      UPDATE team
      SET ${values}
      WHERE team_name = '${d.team_name}';
    `
    return sqlstr;
  });

  const updateString = `
    BEGIN;
      ${sqls.join(" ")}
    COMMIT;
  `
  const response = await fetchData(updateString);
  const count = Array.isArray(response) ?
    response.filter(res => res.command === "UPDATE").length
    :
    response.rowCount;
  
  return count === teams.length;
}

export async function insertSchedule(schedules: any[]) {
  const sqls: string[] = schedules.map(d => `(
    '${formatDate(d.game_date as Date, "yyyy-MM-dd")}',
    ${d.game_round},
    ${d.team_1},
    ${d.team_2},
    ${d.team_3},
    ${d.team_4},
    '${d.remark}'
  )`);
  
  const insertString = `
    INSERT INTO schedule (game_date, game_round, team_1, team_2, team_3, team_4, remark)
    VALUES ${sqls.join(", ")};
  `;

  await fetchData(insertString);
}
