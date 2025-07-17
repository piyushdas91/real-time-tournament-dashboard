// /data/dummyData.ts

// 🟥 Live/Upcoming Match Mock
export const dummyLiveMatch = {
    teamA: 'MI',
    teamB: 'RCB',
    time: '7:30 PM',
    venue: 'Wankhede Stadium',
    status: 'LIVE' as 'LIVE' | 'UPCOMING',
  };
  
  // 🟨 Points Table Mock
  export const dummyPointsTable = [
    { team: 'GT', points: 12 },
    { team: 'CSK', points: 10 },
    { team: 'RR', points: 10 },
    { team: 'LSG', points: 8 },
    { team: 'RCB', points: 8 },
    { team: 'MI', points: 6 },
    { team: 'KKR', points: 6 },
    { team: 'PBKS', points: 6 },
    { team: 'DC', points: 4 },
    { team: 'SRH', points: 4 },
  ];
  
  // 🟦 Match Schedule Mock
  export const dummySchedule = [
    {
      date: '12 Jul',
      teamA: 'DC',
      teamB: 'KKR',
      venue: 'Eden Gardens',
      time: '7:30 PM',
    },
    {
      date: '13 Jul',
      teamA: 'MI',
      teamB: 'CSK',
      venue: 'Wankhede',
      time: '7:30 PM',
    },
    {
      date: '14 Jul',
      teamA: 'RR',
      teamB: 'GT',
      venue: 'Jaipur',
      time: '7:30 PM',
    },
  ];

export const teamLogos = {
  PBKS: "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/teamlogos/PBKS.png?v=2",
  RCB: "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/teamlogos/RCB.png?v=2",
  GT: "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/teamlogos/GT.png?v=2",
  MI: "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/teamlogos/MI.png?v=2",
  DC: "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/teamlogos/DC.png?v=2",
  SRH: "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/teamlogos/SRH.png?v=2",
  LSG: "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/teamlogos/LSG.png?v=2",
  KKR: "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/teamlogos/KKR.png?v=2",
  RR: "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/teamlogos/RR.png?v=2",
  CSK: "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/teamlogos/CSK.png?v=2",
}
  