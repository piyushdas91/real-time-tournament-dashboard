// app/api/matches/route.ts

import { NextResponse } from "next/server";
import { teamLogos } from "../../data/dummyData";

// Simulate live score updates
// function simulateLiveData(matches: any[]) {
//     return matches.map((match) => {
//       if (match.runningStatus === "running") {
//         const maxIncrement = 6;
//         const runs = match.score.team1.runs + Math.floor(Math.random() * maxIncrement);
//         const wickets = match.score.team1.wickets + (Math.random() < 0.1 ? 1 : 0);
//         const overs = parseFloat((match.overs + 0.1).toFixed(1));
  
//         return {
//           ...match,
//           overs,
//           score: {
//             ...match.score,
//             team1: {
//               runs,
//               wickets: Math.min(wickets, 10) // prevent >10 wickets
//             }
//           }
//         };
//       }
  
//       return match;
//     });
//   }

const baseURL = `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/teamlogos`

export async function GET() {
  const matches = {
    success: true,
    data: [
      {
        id: 1,
        team1: {
          name: "Mumbai Indians",
          shortName: "MI",
          logo: `${baseURL}/MI.png?v=2`,
        },
        team2: {
          name: "Chennai Super Kings",
          shortName: "CSK",
          logo: `${baseURL}/CSK.png?v=2`,
        },
        score1: "154/5",
        score2: "187/6",
        overs1: "17.5",
        overs2: "20.0",
        venue: "Wankhede Stadium",
        date: "2025-07-17",
        time: "7:30 PM",
        status: "COMPLETED",
        runningStatus: "COMPLETED",
        liveSummary: "MI need 34 runs in 13 balls",
      },
      {
        id: 2,
        team1: {
          name: "Royal Challengers Bangalore",
          shortName: "RCB",
          logo: teamLogos['shortName'],
        },
        team2: {
          name: "Kolkata Knight Riders",
          shortName: "KKR",
          logo: teamLogos['shortName'],
        },
        score1: "202/7",
        score2: "160/8",
        overs1: "20.0",
        overs2: "18.3",
        venue: "Chinnaswamy Stadium",
        date: "2025-07-17",
        time: "3:30 PM",
        status: "COMPLETED",
        runningStatus: "COMPLETED",
        liveSummary: "KKR need 23 runs in 9 balls",
      },
      {
        id: 3,
        team1: {
          name: "Delhi Capitals",
          shortName: "DC",
          logo: teamLogos['shortName'],
        },
        team2: {
          name: "Sunrisers Hyderabad",
          shortName: "SRH",
          logo: teamLogos['shortName'],
        },
        score1: "156/9",
        score2: "159/4",
        overs1: "20.0",
        overs2: "19.2",
        venue: "Arun Jaitley Stadium",
        date: "2025-07-15",
        time: "7:30 PM",
        status: "COMPLETED",
        runningStatus: "COMPLETED",
        liveSummary: "SRH won by 6 wickets",
      },
      {
        id: 4,
        team1: {
          name: "Rajasthan Royals",
          shortName: "RR",
          logo: teamLogos['shortName'],
        },
        team2: {
          name: "Lucknow Super Giants",
          shortName: "LSG",
          logo: teamLogos['shortName'],
        },
        score1: "",
        score2: "",
        overs1: "",
        overs2: "",
        venue: "Sawai Mansingh Stadium",
        date: "2025-07-18",
        time: "7:30 PM",
        status: "UPCOMING",
        runningStatus: "UPCOMING",
        liveSummary: "",
      },
      {
        id: 5,
        team1: {
          name: "Gujarat Titans",
          shortName: "GT",
          logo: teamLogos['shortName'],
        },
        team2: {
          name: "Punjab Kings",
          shortName: "PBKS",
          logo: teamLogos['shortName'],
        },
        score1: "",
        score2: "",
        overs1: "",
        overs2: "",
        venue: "Narendra Modi Stadium",
        date: "2025-07-19",
        time: "7:30 PM",
        status: "UPCOMING",
        runningStatus: "UPCOMING",
        liveSummary: "",
      },
    ],
  };

  return NextResponse.json(matches);
}
