// app/components/LiveMatch.tsx
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { teamLogos } from '../data/dummyData';

export default function LiveMatch() {
  const [matchData, setMatchData] = useState<any>(null);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    // mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 16,
    },
  });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/liveMatches');
      const data = await res.json();
      const matches = data?.data;
      // console.log(matches);
      
      const liveMatches = matches.filter((m: any) => m.runningStatus === 'LIVE');
      const upcomingMatches = matches.filter((m: any) => m.runningStatus === 'UPCOMING');
      const completedMatches = matches.filter((m: any) => m.runningStatus === 'COMPLETED');
      // console.log(live, upcoming, last);
      const prioritizedMatches =
      liveMatches.length > 0
        ? liveMatches
        : upcomingMatches.length > 0
        ? upcomingMatches
        : completedMatches;
      setMatchData(prioritizedMatches);
    } catch (error) {
      console.error('Error fetching match data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // ⏱️ Now 10 seconds
  return () => clearInterval(interval);
    // const interval = setInterval(fetchData, 30000); // 30s refresh
    // return () => clearInterval(interval);
  }, []);

  // console.log(matchData);
  

  if (!matchData) return <div className="text-center p-4">Loading match info...</div>;

  return (
    <div ref={sliderRef} className="keen-slider py-2">
      {matchData.map((match) => (
        <div key={match.id} className="keen-slider__slide">
          <div className="bg-white rounded-xl shadow p-4 w-[90vw] max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Image
                  src={teamLogos[match?.team1?.shortName]}
                  alt={match.team1.shortName}
                  width={30}
                  height={30}
                />
                <span className="font-semibold">{match.team1.shortName}</span>
              </div>
              <span className="text-gray-700 font-bold">{match.score1}</span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Image
                  src={teamLogos[match?.team2?.shortName]}
                  alt={match.team2.shortName}
                  width={30}
                  height={30}
                />
                <span className="font-semibold">{match.team2.shortName}</span>
              </div>
              <span className="text-gray-700 font-bold">{match.score2}</span>
            </div>

            <div className="text-sm text-gray-600 mb-1">
              {match.runningStatus === "LIVE"
                ? `Overs: ${match.overs1} / ${match.overs2}`
                : `${match.date} • ${match.time}`}
            </div>

            <div
              className={`text-sm font-semibold ${
                match.runningStatus === "LIVE"
                  ? "text-red-500"
                  : match.runningStatus === "COMPLETED"
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            >
              {match.runningStatus === "LIVE"
                ? match.liveSummary
                : match.status}
            </div>

            <div className="text-xs text-gray-400 mt-1">{match.venue}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

