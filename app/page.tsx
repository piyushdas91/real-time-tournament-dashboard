'use client'

import { useEffect, useState } from 'react';
import LiveMatchCard from './components/LiveMatchCard';
import PointsTableCard from './components/PointsTableCard';
import ScheduleCard from './components/ScheduleCard';
import SectionTitle from './components/SectionTitle';
import { dummyPointsTable, dummyLiveMatch, dummySchedule } from './data/dummyData';
const baseURL  = `/api/scrape?`;

export default function HomePage() {

  const [matchSchedule, setMatchSchedule] = useState<>([]);
  const [standings, setStandings] = useState<>([]);
  const [loading, setLoading] = useState<>(true);


  const fetchPointsTable = async () => {
    try {
      const response = await fetch(`${baseURL}type=points`);
      const json = await response.json();
      console.log(json.data);
      setStandings(json?.data?.points);
    } catch (err) {
      console.error(err);
    }
  }

  const getMatchSchedule = async () => {
    try {
      const response = await fetch(`${baseURL}type=schedule`);
      const json = await response.json();
      console.log(json.data);
      setMatchSchedule(json?.data?.Matchsummary);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPointsTable();
    getMatchSchedule();
  }, []);
  
  return (
    <main className="min-h-screen bg-gray-50 px-4 pt-4 pb-8 space-y-6 max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
      {/* Live Match Section */}
      <SectionTitle>Live / Upcoming Match</SectionTitle>
      <LiveMatchCard {...dummyLiveMatch} />

      {/* Points Table Section */}
      <SectionTitle>Points Table</SectionTitle>
      <PointsTableCard standings={standings} />

      {/* Schedule Section */}
      <SectionTitle>Match Schedule</SectionTitle>
      <div className="space-y-2">
        {matchSchedule.map((match, index) => (
          <ScheduleCard key={index} match={match} />
        ))}
      </div>
    </main>
  );
}
