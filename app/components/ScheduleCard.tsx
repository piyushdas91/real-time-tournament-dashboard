// type MatchSchedule = {
//     date: string;
//     teamA: string;
//     teamB: string;
//     venue: string;
//     time: string;
//   };
  
  export default function ScheduleCard({ match }) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-sm border text-sm mb-2 transition hover:shadow-md">
        <div>🗓️ {match.MatchDateNew}: {match.MatchName}</div>
        <div className="text-gray-500">📍 {match.GroundName} | {match.MatchTime}</div>
      </div>
    );
  }
  