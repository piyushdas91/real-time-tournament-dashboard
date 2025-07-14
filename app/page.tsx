import LiveMatchCard from './components/LiveMatchCard';
import PointsTableCard from './components/PointsTableCard';
import ScheduleCard from './components/ScheduleCard';
import SectionTitle from './components/SectionTitle';
import { dummyPointsTable, dummyLiveMatch, dummySchedule } from './data/dummyData';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 space-y-6 max-w-md mx-auto">
      {/* Live Match Section */}
      <SectionTitle>Live / Upcoming Match</SectionTitle>
      <LiveMatchCard {...dummyLiveMatch} />

      {/* Points Table Section */}
      <SectionTitle>Points Table</SectionTitle>
      <PointsTableCard table={dummyPointsTable} />

      {/* Schedule Section */}
      <SectionTitle>Match Schedule</SectionTitle>
      <div className="space-y-2">
        {dummySchedule.map((match) => (
          <ScheduleCard key={`${match.date}-${match.teamA}`} match={match} />
        ))}
      </div>
    </main>
  );
}
