// app/api/matches/route.ts

import { NextResponse } from "next/server";
import { teamLogos } from "../../data/dummyData";

const baseURL = `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/teamlogos`;

// Convert overs (e.g., 18.5) to balls (113 balls), and back
const oversToBalls = (overs: string) => {
  const [over, ball] = overs.split(".").map(Number);
  return over * 6 + (ball || 0);
};

const ballsToOvers = (balls: number) => {
  const over = Math.floor(balls / 6);
  const ball = balls % 6;
  return `${over}.${ball}`;
};

// Simulate live score updates
function simulateLiveData(matches) {
  return matches.map((match) => {
    if (match.runningStatus === "LIVE") {
      const balls = oversToBalls(match.overs2 || "0.0");
      const newBalls = balls + 1;
      const runs = Math.floor(Math.random() * 7); // 0 to 6
      const isWicket = Math.random() < 0.1; // 10% chance

      // Parse score2 like "160/8"
      let [currentRuns, currentWickets] = match.score2
        ? match.score2.split("/").map(Number)
        : [0, 0];

      currentRuns += runs;
      if (isWicket) currentWickets += 1;
      if (currentWickets > 10) currentWickets = 10;

      return {
        ...match,
        score2: `${currentRuns}/${currentWickets}`,
        overs2: ballsToOvers(newBalls),
        liveSummary: `Live: ${match.team2.shortName} need ${Math.abs(parseInt(match.score1.split('/')[0]) - currentRuns)} in ${Math.abs(120 - newBalls)}`,
      };
    }
    return match;
  });
}

let cachedMatches = null;

export async function GET() {
  if (!cachedMatches) {
    cachedMatches = {
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
            logo: teamLogos["RCB"],
          },
          team2: {
            name: "Kolkata Knight Riders",
            shortName: "KKR",
            logo: teamLogos["KKR"],
          },
          score1: "202/7",
          score2: "160/8",
          overs1: "20.0",
          overs2: "18.3",
          venue: "Chinnaswamy Stadium",
          date: "2025-07-17",
          time: "3:30 PM",
          status: "LIVE",
          runningStatus: "LIVE",
          liveSummary: "KKR need 23 runs in 9 balls",
        },
        {
          id: 3,
          team1: {
            name: "Delhi Capitals",
            shortName: "DC",
            logo: teamLogos["DC"],
          },
          team2: {
            name: "Sunrisers Hyderabad",
            shortName: "SRH",
            logo: teamLogos["SRH"],
          },
          score1: "156/9",
          score2: "159/4",
          overs1: "20.0",
          overs2: "19.2",
          venue: "Arun Jaitley Stadium",
          date: "2025-07-15",
          time: "7:30 PM",
          status: "LIVE",
          runningStatus: "LIVE",
          liveSummary: "SRH won by 6 wickets",
        },
        {
          id: 4,
          team1: {
            name: "Rajasthan Royals",
            shortName: "RR",
            logo: teamLogos["RR"],
          },
          team2: {
            name: "Lucknow Super Giants",
            shortName: "LSG",
            logo: teamLogos["LSG"],
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
            logo: teamLogos["GT"],
          },
          team2: {
            name: "Punjab Kings",
            shortName: "PBKS",
            logo: teamLogos["PBKS"],
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
  }

  // Simulate only LIVE matches every fetch
  cachedMatches.data = simulateLiveData(cachedMatches.data);

  return NextResponse.json(cachedMatches);
}
