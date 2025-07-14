type MatchSchedule = {
    date: string;
    teamA: string;
    teamB: string;
    venue: string;
    time: string;
  };
  
  export default function ScheduleCard({ match }: { match: MatchSchedule }) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-sm border text-sm mb-2">
        <div>🗓️ {match.date}: {match.teamA} vs {match.teamB}</div>
        <div className="text-gray-500">📍 {match.venue} | {match.time}</div>
      </div>
    );
  }
  