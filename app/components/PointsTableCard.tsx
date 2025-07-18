"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PointsTableHeader from "./points-table/pointsTableHeader";
import PointsTableRow from "./points-table/tableRow";
import Dropdown from "./dropdown";

const baseURL = `/api/scrape?`;
const PointsTableCard = ({ competition, division }) => {
  // console.log(competition, division);

  const [seasons, setSeasons] = useState(division);
  // console.log(seasons);

  const [season, setSeason] = useState("2025");
  const [competitionCode, setCompetionCode] = useState("203");
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    setSeasons(division);
  }, [division]);

  const fetchPointsTable = async (competitionCode) => {
    try {
      const response = await fetch(
        `${baseURL}type=points&code=${competitionCode}`
      );
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
  useEffect(() => {
    const code =
      competition.filter((item) => item.CompetitionName.includes(season))[0]
        ?.CompetitionID || "203";
    fetchPointsTable(code);
    // getMatchSchedule();
  }, [season]);

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  return (
    <>
      <Dropdown
        label="SEASON"
        value={season}
        onChange={handleSeasonChange}
        setValue={setSeason}
        setCompetitionCode={setCompetionCode}
        options={seasons}
      />
      <div className="w-full mx-auto mb-4 overflow-x-scroll border-solid border-1 border-gray-300 rounded-lg bg-gray-50">
        {/* Header Row */}
        <PointsTableHeader />
        {/* Team Rows */}
        {standings?.map((team, idx) => (
          <PointsTableRow key={idx} team={team} />
        ))}
      </div>
    </>
  );
};

export default PointsTableCard;
