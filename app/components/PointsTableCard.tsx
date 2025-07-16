"use client"

import { useEffect, useState } from "react";

const baseURL = `/api/scrape?`;

// type TeamStandings = {
//     teamCode: string;
//     matchesPlayed: number;
//     matchesWon: number;
//     matchesLost: number;
//     matchesTied: number;
//     matchesWithNoResult: number;
//     netRunRate: number;
//     points: number;
//   };

const PointsTableCard = ({ standings }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow border transition hover:shadow-md">
      <h2 className="text-lg font-semibold mb-2">Points Table</h2>
      <div className="space-y-1">
        {standings.map((team, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{index + 1}. {team.team}</span>
            <span className="font-medium">{team.TeamCode} pts</span>
            <span className="font-medium">{team.Matches} pts</span>
            <span className="font-medium">{team.Wins} pts</span>
            <span className="font-medium">{team.Loss} pts</span>
            <span className="font-medium">{team.NoResult} pts</span>
            <span className="font-medium">{team.NetRunRate} pts</span>
            <span className="font-medium">{team.Points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PointsTableCard;
