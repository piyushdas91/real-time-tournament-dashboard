type TeamStats = {
    team: string;
    points: number;
  };
  
  export default function PointsTableCard({ table }: { table: TeamStats[] }) {
    return (
      <div className="bg-white p-4 rounded-xl shadow border">
        <h2 className="text-lg font-semibold mb-2">Points Table</h2>
        <div className="space-y-1">
          {table.map((team, index) => (
            <div key={team.team} className="flex justify-between text-sm">
              <span>{index + 1}. {team.team}</span>
              <span className="font-medium">{team.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  