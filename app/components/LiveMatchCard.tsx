type LiveMatchCardProps = {
    teamA: string;
    teamB: string;
    time: string;
    venue: string;
    status: 'LIVE' | 'UPCOMING';
  };
  
  export default function LiveMatchCard({ teamA, teamB, time, venue, status }: LiveMatchCardProps) {
    return (
      <div className="bg-white p-4 rounded-xl shadow text-center border">
        <div className="text-lg font-semibold">{teamA} 🆚 {teamB}</div>
        <div className="text-sm text-gray-500">{time} | {venue}</div>
        <div
          className={`mt-2 text-sm font-bold ${
            status === 'LIVE' ? 'text-green-600' : 'text-yellow-500'
          }`}
        >
          {status === 'LIVE' ? '🟢 LIVE' : '⏳ UPCOMING'}
        </div>
      </div>
    );
  }
  