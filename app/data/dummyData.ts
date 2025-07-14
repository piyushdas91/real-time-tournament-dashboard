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
  