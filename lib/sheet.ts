import { read, utils } from 'xlsx';
import {
  PlayerSheetEnum,
  PlayerJSONType,
  ScheduleJSONType,
  ScheduleSheetEnum,
  SheetNameEnum,
  TeamJSONType,
  TeamSheetEnum,
} from './types';
import { insertSchedule, updatePlayer, updateTeam } from './update';
import { superset } from "d3-array";

export async function parseFromUrl(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("fetch failed");
  }
  const ab = await res.arrayBuffer();
  const wb = read(ab);
  return wb;
}

// example
/* (async() => {
  const wb = await parseFromUrl('https://sheetjs.com/pres.numbers');
  // print the first worksheet to console
  var ws = wb.Sheets[wb.SheetNames[0]];
  console.log(XLSX.utils.sheet_to_csv(ws));
})(); */

export async function validFileData(ab: ArrayBuffer): Promise<boolean> {
  const wb = read(ab);
  // let names = Object.values(SheetNameEnum);
  let names = ["排期"];
  // d3.superset([0, 2, 1, 3, 0], [1, 3]) // true
  let conclude = superset(wb.SheetNames, names);
  return conclude;
}

export async function handleSheetData(ab: ArrayBuffer): Promise<boolean> {
  const wb = read(ab, { cellDates: true });
  const prePlayerJSON: PlayerJSONType[] = utils.sheet_to_json(wb.Sheets[SheetNameEnum.prePlayer]);
  const preTeamJSON: TeamJSONType[] = utils.sheet_to_json(wb.Sheets[SheetNameEnum.preTeam], { range: 1 });
  const preScheduleJSON: ScheduleJSONType[] = utils.sheet_to_json(wb.Sheets["排期"], { UTC: true });

  // const r1 = await handlePlayerData(prePlayerJSON);
  // const r2 = await handleTeamData(preTeamJSON);
  const r3 = await handleScheduleData(preScheduleJSON);

  const results: boolean[] = [];
  const success = results.every(d => d === true);
  return success;
}

export async function handlePlayerData(data: PlayerJSONType[]): Promise<boolean> {
  if (data.length > 0) {
    let playerStats = data.filter(d => d[PlayerSheetEnum.player_name] !== "总计")
      .map(d => {
        let keys = Object.keys(PlayerSheetEnum);
        let values = Object.values(PlayerSheetEnum);

        let obj: Record<string, any> = {};
        for (let i = 0; i < values.length; i++) {
          obj[keys[i]] = d[values[i]];
        }
        return obj;
      });

    const success = await updatePlayer(playerStats);
    return success;
  } else {
    return false;
  }
}

export async function handleTeamData(data: TeamJSONType[]): Promise<boolean> {
  if (data.length > 0) {
    let teamStats = data.map(d => {
      let keys = Object.keys(TeamSheetEnum);
      let values = Object.values(TeamSheetEnum);

      let obj: Record<string, any> = {};
      for (let i = 0; i < values.length; i++) {
        obj[keys[i]] = d[values[i]];
      }
      return obj;
    });

    const success = await updateTeam(teamStats);
    return success;
  } else {
    return false;
  }
}

export async function handleScheduleData(data: ScheduleJSONType[]) {
  if (data.length > 0) {
    let scheduleStats = data.map(d => {
      let keys = Object.keys(ScheduleSheetEnum);
      let values = Object.values(ScheduleSheetEnum);

      let obj: Record<string, any> = {};
      for (let i = 0; i < values.length; i++) {
        obj[keys[i]] = d[values[i]];
      }
      return obj;
    });

    await insertSchedule(scheduleStats);
    return true;
  } else {
    return false;
  }
}
