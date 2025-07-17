"use client";

import { useEffect, useState } from "react";
import LiveMatchCard from "./components/LiveMatchCard";
import PointsTableCard from "./components/PointsTableCard";
import ScheduleCard from "./components/ScheduleCard";
import SectionTitle from "./components/SectionTitle";
import {
  dummyPointsTable,
  dummyLiveMatch,
  dummySchedule,
} from "./data/dummyData";
import IPLDashboardHeader from "./components/header";
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { List, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css"; // Optional default styles

const baseURL = `/api/scrape?`;

export default function HomePage() {
  const [matchSchedule, setMatchSchedule] = useState<>([]);
  const [standings, setStandings] = useState<>([]);
  const [loading, setLoading] = useState<>(true);

  const ITEMS_PER_LOAD = 3;
  const [visibleMatches, setVisibleMatches] = useState([]);

  const fetchMoreMatches = () => {
    console.log(visibleMatches);

    const nextLength = visibleMatches.length + ITEMS_PER_LOAD;
    const nextMatches = matchSchedule.slice(0, nextLength);
    setVisibleMatches(nextMatches);
  };

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
    fetchPointsTable();
    // getMatchSchedule();
  }, []);

  // Sync fetched schedule to local state (for rendering)
  useEffect(() => {
    if (data?.data?.Matchsummary) {
      const schedule = data.data.Matchsummary;
      setMatchSchedule(schedule);
      setVisibleMatches(schedule.slice(0, ITEMS_PER_LOAD));
    }
  }, [data]);

  const getMovementIcon = (movement: string) => {
    if (movement === "UP") return "▲";
    if (movement === "DOWN") return "▼";
    return "–";
  };

  const fetchPointsTable = async () => {
    try {
      const response = await fetch(`${baseURL}type=points`);
      const json = await response.json();
      // console.log(json.data);
      const transformed = json?.data?.points.map(
        (team: any, index: number) => ({
          position: index + 1,
          teamShortName: team.TeamCode,
          teamLogoUrl: team.TeamLogo,
          played: team.Matches,
          won: team.Wins,
          lost: team.Loss,
          noResult: team.NoResult,
          netRunRate: parseFloat(team.NetRunRate),
          for: team.ForTeams,
          against: team.AgainstTeam,
          points: team.Points,
          recentForm: team.Performance?.split(",") ?? [],
          qualifier: team.Qualifier === "true",
          status: team.Status,
        })
      );
      setStandings(transformed);
    } catch (err) {
      console.error(err);
    }
  };

  const getMatchSchedule = async () => {
    try {
      const response = await fetch(`${baseURL}type=schedule`);
      const json = await response.json();
      console.log(json.data);
      return json;
      // setMatchSchedule(json?.data?.Matchsummary);
    } catch (err) {
      console.error(err);
    }
  };

  const rowRenderer = ({
    key,
    index,
    style,
  }: {
    key: string;
    index: number;
    style: React.CSSProperties;
  }) => {
    const match = matchSchedule[index];
    // console.log(match);
    
    return (
      <div key={key} style={style}>
        <ScheduleCard match={match} />
      </div>
    );
  };

  if (isLoading) return <p>Loading schedule...</p>;
  if (error) return <p>Error loading schedule</p>;

  return (
    // <main className="min-h-screen bg-gray-50 px-4 pt-4 pb-8 space-y-6 max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
    <main className="min-h-screen bg-gray-50 space-y-6 mx-auto">
      <IPLDashboardHeader />
      {/* Live Match Section */}
      <div className="px-2">
        <SectionTitle>Live / Upcoming Match</SectionTitle>
        <LiveMatchCard />
        {/* Points Table Section */}
        <SectionTitle>Points Table</SectionTitle>
        <PointsTableCard standings={standings} />
        {/* Schedule Section */}
        <SectionTitle>Match Schedule</SectionTitle>
        <div className="space-y-2">
          {/* {matchSchedule.map((match, index) => (
          <ScheduleCard key={index} match={match} />
        ))} */}
          {/* <InfiniteScroll
            key={matchSchedule.length} 
            dataLength={visibleMatches.length}
            next={fetchMoreMatches}
            hasMore={visibleMatches.length < matchSchedule.length}
            loader={
              <p className="text-center text-gray-500">
                Loading more matches...
              </p>
            }
            endMessage={
              <p className="text-center text-green-600">
                You've reached the end!
              </p>
            }
          >
            {visibleMatches.map((match, index) => (
              <ScheduleCard key={index} match={match} />
            ))}
          </InfiniteScroll> */}
          {matchSchedule.length > 0 && (
            <div style={{ height: 500 }}>
              {" "}
              {/* Set height as needed */}
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    width={width}
                    height={height}
                    rowCount={matchSchedule.length}
                    rowHeight={250} // Adjust this based on your ScheduleCard height
                    rowRenderer={rowRenderer}
                    onRowsRendered={({ startIndex, stopIndex }) => {
                      const visibleItems = stopIndex - startIndex + 1;
                      console.log("Visible items in viewport:", visibleItems);
                    }}
                  />
                )}
              </AutoSizer>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
