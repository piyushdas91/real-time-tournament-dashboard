"use client";

import Link from "@mui/material/Link";
// import Link from 'next/link';
import MatchInfo from "./matchInfo";
import MatchResult from "./matchResult";

export default function HomePageScheduleCard({ matches }) {
  const firstThreeMatches = matches.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 space-y-4 w-full max-w-xl md:max-w-full mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">
        Fixtures and Results
      </h2>

      {firstThreeMatches.map((match, idx) => (
        <div
          key={idx}
          className="bg-white shadow-md rounded-md overflow-hidden flex flex-row md:flex-row w-full max-w-4xl md:max-w-full mx-auto"
        >
          {/* Left Status Column */}
          <MatchInfo
            matchOrder={match?.MatchOrder}
            matchComments={match?.Comments}
          />
          {/* Right Match Info Column */}
          <MatchResult match={match} />
        </div>
      ))}

      {/* <Link href="/schedule">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-xl transition-all">
          View all fixtures and results
        </button>
      </Link> */}
      <div className="text-right font-bold">
      <Link href="/schedule" underline="none" >
        View all fixtures and results
      </Link>
      </div>
      
    </div>
  );
}
