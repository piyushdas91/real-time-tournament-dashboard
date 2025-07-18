'use client'
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { List, AutoSizer } from "react-virtualized";
import ScheduleCard from "../components/ScheduleCard";
import IPLDashboardHeader from "../components/header";
import SectionTitle from "../components/SectionTitle";
import SectionHeader from "../components/sectionHeader";
const baseURL = `/api/scrape?`;

type Match = {
  id: string;
  team1: string;
  team2: string;
  date: string;
  venue: string;
};

const MatchSchedule = ({}) => {
  const [matchSchedule, setMatchSchedule] = useState([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['schedule'],
    queryFn: async () => {
      const response = await fetch(`${baseURL}type=schedule`);
      return response.json();
    },
    staleTime: Infinity, // to avoid refetch if already available
  });

  useEffect(() => {
    if(data?.data?.Matchsummary) {
      console.log(data);
      
      const schedule = data?.data?.Matchsummary;
      setMatchSchedule(schedule);
    }
  }, [data])

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading schedule</div>;
  console.log(data);
  
    return (
      <main className="min-h-screen bg-gray-200 space-y-6 mx-auto ">
      <IPLDashboardHeader header="matches" />
      {/* Live Match Section */}
      
      <div className="px-4">
      <SectionHeader header="Fixtures and Results" />
      <div className="space-y-2 pt-4">
          {matchSchedule?.length > 0 && (
            <div style={{ height: 1000 }}>
              {" "}
              
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
        
        // <></>
    )
}

export default MatchSchedule;