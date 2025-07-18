// type MatchSchedule = {
//     date: string;
//     teamA: string;
//     teamB: string;
//     venue: string;
//     time: string;
//   };

import MatchInfo from "./match-schedule/matchInfo";
import MatchResult from "./match-schedule/matchResult";
  
  export default function ScheduleCard({ match }) {
    return (
      <div className="bg-white shadow-md rounded-md overflow-hidden flex flex-row md:flex-row w-full max-w-4xl mx-auto">
      {/* Left Status Column */}
      <MatchInfo matchOrder={match?.MatchOrder} matchComments={match?.Comments} />
      {/* Right Match Info Column */}
      <MatchResult match={match} />
    </div>
    );
  }
  