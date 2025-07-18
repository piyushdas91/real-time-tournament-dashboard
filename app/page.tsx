"use client";

import { useEffect, useState } from "react";
import LiveMatchCard from "./components/LiveMatchCard";
import PointsTableCard from "./components/PointsTableCard";
import IPLDashboardHeader from "./components/header";
import { useQuery } from "@tanstack/react-query";
import "react-virtualized/styles.css"; // Optional default styles
import SectionHeader from "./components/sectionHeader";
import HomePageScheduleCard from "./components/match-schedule/homePageScheduleCard";
import SkeletonLoader from "./components/loader";

const baseURL = `/api/scrape?`;

export default function HomePage() {
  const [matchSchedule, setMatchSchedule] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [competitionData, setCompetitionData] = useState([]);
  const [divisionData, setDivisionData] = useState([]);

  const fetchCompetitionData = async () => {
    try {
      const response = await fetch(`${baseURL}type=competition`);
      const json = await response.json();
      // console.log(json.data);
      const seasons = json.data.division
        .filter((ele) => parseInt(ele.SeasonName) > 2021)
        .map((ele) => ele.SeasonName);
      // console.log(json.data.division.map((ele) => ele.SeasonName));
      setCompetitionData(json?.data?.competition);
      setDivisionData(seasons);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompetitionData();
  }, []);

  // React query + persistence to cache schedule for 24 hours in localstorage
  const { data, isLoading, error } = useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      const response = await fetch(`${baseURL}type=schedule`);
      return response.json();
    },
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (data?.data?.Matchsummary) {
      console.log(data);

      const schedule = data?.data?.Matchsummary;
      setMatchSchedule(schedule);
    }
  }, [data]);

  if (isLoading) return <p><SkeletonLoader /></p>;
  if (error) return <p>Error loading schedule</p>;

  return (
    // <main className="min-h-screen bg-gray-50 px-4 pt-4 pb-8 space-y-6 max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
    <main className="bg-[url('/images/ipl-bg-2.jpg')] bg-cover bg-center w-full space-y-6 mx-auto">
      <IPLDashboardHeader header={"Home"} />
      {/* Live Match Section */}
      <div className="px-4 pb-4 md:px-30">
        <SectionHeader header={"Matches"} />
        <LiveMatchCard />
        {/* Points Table Section */}
        <SectionHeader header={"Points Table"} />
        <PointsTableCard
          competition={competitionData}
          division={divisionData}
        />
        <div className="py-2">
          <SectionHeader header={"Match Schedule"} />
          <HomePageScheduleCard matches={matchSchedule} />
        </div>
      </div>
    </main>
  );
}
