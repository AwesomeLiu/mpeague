import {
  BasicInfo,
  DailyScore,
  GameRound,
  Team,
  TeamScore,
  tMenu,
} from "./types";

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

export async function getTeamScore(): Promise<TeamScore[]> {
  const teamScore: TeamScore[] = [
    {
      id: 1,
      rank: 5,
      avatar: "/2.png",
      name: "风林火山",
      score: -150.4,
      diff: 52.6,
      eliminated: true
    },
    {
      id: 2,
      rank: 4,
      avatar: "/2.png",
      name: "风林火山",
      score: -150.4,
      diff: 52.6,
      eliminated: true
    },
    {
      id: 3,
      rank: 2,
      avatar: "/3.png",
      name: "格斗俱乐部",
      score: 204.6,
      diff: 290.8,
      eliminated: true
    },
    {
      id: 4,
      rank: 1,
      avatar: "/4.png",
      name: "ABEMAS",
      score: 495.4,
      diff: "-",
      eliminated: true
    },
    {
      id: 5,
      rank: 7,
      avatar: "/6.png",
      name: "雷电",
      score: -97.8,
      diff: 302.4,
      eliminated: false
    },
    {
      id: 6,
      rank: 3,
      avatar: "/6.png",
      name: "雷电",
      score: -97.8,
      diff: 302.4,
      eliminated: true
    },
    {
      id: 7,
      rank: 8,
      avatar: "/6.png",
      name: "雷电",
      score: -97.8,
      diff: 302.4,
      eliminated: false
    },
    {
      id: 8,
      rank: 6,
      avatar: "/6.png",
      name: "雷电",
      score: -97.8,
      diff: 302.4,
      eliminated: true
    },
  ];
  teamScore.sort((a, b) => a.rank - b.rank);

  return teamScore;
}

export async function getPlayerScore(size: number): Promise<BasicInfo[]> {
  const data: BasicInfo[] = Array(size).fill(null).map((d, i) => ({
      id: i + 1,
      avatar: "/profile_1.png",
      name: `选手 ${i + 1} 号`,
      score: Math.random() * 1000 - 500,
    }))
    .sort((a, b) => b.score - a.score)
    .map((d, i) => ({
      ...d,
      rank: i + 1,
      score: +d.score.toFixed(1)
    }));

  return data;
}

export async function getLastSchedule(): Promise<DailyScore[]> {
  const teams: Team[] = [
    {
      id: 2,
      rank: 4,
      avatar: "/2.png",
      name: "风林火山",
      score: -150.4,
      eliminated: false,
    },
    {
      id: 3,
      rank: 2,
      avatar: "/3.png",
      name: "格斗俱乐部",
      score: 204.6,
      eliminated: false,
    },
    {
      id: 4,
      rank: 1,
      avatar: "/4.png",
      name: "ABEMAS",
      score: 495.4,
      eliminated: false,
    },
    {
      id: 5,
      rank: 7,
      avatar: "/6.png",
      name: "雷电",
      score: -97.8,
      eliminated: false,
    },
  ];

  const data: DailyScore = {
    date: new Date(),
    teams: teams,
    games: [
      {
        session: 1,
        result: [
          {
            id: 1,
            rank: 1,
            avatar: "/profile_1.png",
            name: "xs1h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/2.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 2,
            rank: 2,
            avatar: "/profile_1.png",
            name: "xs2h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/4.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 3,
            rank: 4,
            avatar: "/profile_1.png",
            name: "xs22332h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/6.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 4,
            rank: 3,
            avatar: "/profile_1.png",
            name: "xs42343h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/3.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
        ]
      },
      {
        session: 2,
        result: [
          {
            id: 1,
            rank: 3,
            avatar: "/profile_1.png",
            name: "xs1h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/2.png",
              name: "风林火山",
              score: -10.4,
              eliminated: false,
            },
          },
          {
            id: 2,
            rank: 1,
            avatar: "/profile_1.png",
            name: "xs2h",
            score: -15.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/4.png",
              name: "风林火山",
              score: -50.4,
              eliminated: false,
            },
          },
          {
            id: 3,
            rank: 4,
            avatar: "/profile_1.png",
            name: "xs22332h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/6.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 4,
            rank: 2,
            avatar: "/profile_1.png",
            name: "xs42343h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/3.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
        ]
      },
      {
        session: 3,
        result: [
          {
            id: 1,
            rank: 1,
            avatar: "/profile_1.png",
            name: "xs1h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/2.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 2,
            rank: 2,
            avatar: "/profile_1.png",
            name: "xs2h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/4.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 3,
            rank: 4,
            avatar: "/profile_1.png",
            name: "xs22332h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/6.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 4,
            rank: 3,
            avatar: "/profile_1.png",
            name: "xs42343h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/3.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
        ]
      },
    ]
  };

  return [data, data, data, data, data, data];
}

export async function getScheduleByDate(startDate: Date, endDate: Date): Promise<DailyScore[]> {
  const teams: Team[] = [
    {
      id: 2,
      rank: 4,
      avatar: "/2.png",
      name: "风林火山",
      score: -150.4,
      eliminated: false,
    },
    {
      id: 3,
      rank: 2,
      avatar: "/3.png",
      name: "格斗俱乐部",
      score: 204.6,
      eliminated: false,
    },
    {
      id: 4,
      rank: 1,
      avatar: "/4.png",
      name: "ABEMAS",
      score: 495.4,
      eliminated: false,
    },
    {
      id: 5,
      rank: 7,
      avatar: "/6.png",
      name: "雷电",
      score: -97.8,
      eliminated: false,
    },
  ];

  const data: DailyScore = {
    date: startDate,
    teams: teams,
    games: [
      {
        session: 1,
        result: [
          {
            id: 1,
            rank: 1,
            avatar: "/profile_1.png",
            name: "xs1h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/2.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 2,
            rank: 2,
            avatar: "/profile_1.png",
            name: "xs2h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/4.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 3,
            rank: 4,
            avatar: "/profile_1.png",
            name: "xs22332h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/6.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 4,
            rank: 3,
            avatar: "/profile_1.png",
            name: "xs42343h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/3.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
        ]
      },
      {
        session: 2,
        result: [
          {
            id: 1,
            rank: 3,
            avatar: "/profile_1.png",
            name: "xs1h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/2.png",
              name: "风林火山",
              score: -10.4,
              eliminated: false,
            },
          },
          {
            id: 2,
            rank: 1,
            avatar: "/profile_1.png",
            name: "xs2h",
            score: -15.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/4.png",
              name: "风林火山",
              score: -50.4,
              eliminated: false,
            },
          },
          {
            id: 3,
            rank: 4,
            avatar: "/profile_1.png",
            name: "xs22332h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/6.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 4,
            rank: 2,
            avatar: "/profile_1.png",
            name: "xs42343h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/3.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
        ]
      },
      {
        session: 3,
        result: [
          {
            id: 1,
            rank: 1,
            avatar: "/profile_1.png",
            name: "xs1h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/2.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 2,
            rank: 2,
            avatar: "/profile_1.png",
            name: "xs2h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/4.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 3,
            rank: 4,
            avatar: "/profile_1.png",
            name: "xs22332h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/6.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
          {
            id: 4,
            rank: 3,
            avatar: "/profile_1.png",
            name: "xs42343h",
            score: -150.4,
            team: {
              id: 2,
              rank: 4,
              avatar: "/3.png",
              name: "风林火山",
              score: -150.4,
              eliminated: false,
            },
          },
        ]
      },
    ]
  };

  return [data, data, data, data, data, data];
}

export async function getGameRounds(): Promise<GameRound[]> {
  const rounds: GameRound[] = [
    {
      "round": "1",
      "start": new Date("2023-04-03"),
      "end": new Date("2023-04-08"),
      "remark": "第一周",
    },
    {
      "round": "2",
      "start": new Date("2023-04-10"),
      "end": new Date("2023-04-15"),
      "remark": "第二周",
    },
    {
      "round": "3",
      "start": new Date("2023-04-17"),
      "end": new Date("2023-04-22"),
      "remark": "第三周",
    },
    {
      "round": "4",
      "start": new Date("2023-04-24"),
      "end": new Date("2023-04-29"),
      "remark": "第四周",
    },
    {
      "round": "5",
      "start": new Date("2023-05-01"),
      "end": new Date("2023-05-06"),
      "remark": "第五周",
    },
    {
      "round": "6",
      "start": new Date("2023-05-08"),
      "end": new Date("2023-05-13"),
      "remark": "第六周",
    },
    {
      "round": "7",
      "start": new Date("2023-05-15"),
      "end": new Date("2023-05-20"),
      "remark": "第七周",
    },
    {
      "round": "8",
      "start": new Date("2023-05-22"),
      "end": new Date("2023-05-27"),
      "remark": "第八周",
    },
    {
      "round": "9",
      "start": new Date("2023-05-29"),
      "end": new Date("2023-06-10"),
      "remark": "半决赛",
      "disabled": true,
    },
    {
      "round": "10",
      "start": new Date("2023-06-12"),
      "end": new Date("2023-06-17"),
      "remark": "决赛",
      "disabled": true,
    },
  ];

  return rounds;
}