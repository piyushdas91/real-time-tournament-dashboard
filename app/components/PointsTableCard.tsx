"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import PointsTableHeader from "./points-table/pointsTableHeader";

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
    // <div className="p-4 max-w-2xl mx-auto">
    //   <div className="bg-white shadow rounded overflow-x-auto">
    //     <table className="w-full text-sm">
    //       <thead className="bg-gray-100 text-gray-700 text-left">
    //         <tr>
    //           <th className="px-3 py-2">POS</th>
    //           <th className="px-3 py-2">TEAM</th>
    //           <th className="px-2 py-2 text-center">P</th>
    //           <th className="px-2 py-2 text-center">W</th>
    //           <th className="px-2 py-2 text-center">L</th>
    //           <th className="px-2 py-2 text-center">NR</th>
    //           <th className="px-2 py-2 text-center">NRR</th>
    //           <th className="px-2 py-2 text-center">FOR</th>
    //           <th className="px-2 py-2 text-center">AGAINST</th>
    //           <th className="px-2 py-2 text-center">PTS</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {standings.map((team, idx) => (
    //           <tr
    //             key={idx}
    //             className="border-b hover:bg-gray-50 transition duration-150"
    //           >
    //             <td className="px-3 py-2 font-semibold">{team.position}</td>
    //             <td className="px-3 py-2 flex items-center gap-2 ">
    //               <span>{getMovementIcon(team.Status)}</span>
    //               <img
    //                 src={team.TeamLogo}
    //                 alt={team.TeamCode}
    //                 className="w-6 h-6 rounded-full"
    //               />
    //               <span className="font-medium">{team.TeamCode}</span>
    //             </td>
    //             <td className="px-2 py-2 text-center">{team.Matches}</td>
    //             <td className="px-2 py-2 text-center">{team.Wins}</td>
    //             <td className="px-2 py-2 text-center">{team.Loss}</td>
    //             <td className="px-2 py-2 text-center">{team.NoResult}</td>
    //             <td className="px-2 py-2 text-center">{team.NetRunRate}</td>
    //             <td className="px-2 py-2 text-center">{team.ForTeams}</td>
    //             <td className="px-2 py-2 text-center">{team.AgainstTeam}</td>
    //             <td className="px-2 py-2 text-center">{team.Points}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    //   {/* )
    //   } */}
    // </div>
    <div className="w-full max-w-7xl mx-auto overflow-x-auto border-solid border-1 border-gray-300 rounded-lg bg-gray-50">
  <div className="min-w-[1000px]">
    {/* Header Row */}
    <PointsTableHeader />

    {/* Team Rows */}
    {standings.map((team, idx) => (
      <div
        key={idx}
        className="grid grid-cols-12 items-center gap-2 px-2 py-3 text-xs md:text-sm"
      >
        <div className="col-span-1 text-center">{team.position}</div>
        <div className="col-span-1 text-center">
          {team.status === 'UP' && <span className="text-green-500">▲</span>}
          {team.status === 'DOWN' && <span className="text-red-500">▼</span>}
          {team.status === 'SAME' && <span className="text-gray-400">-</span>}
        </div>
        <div className="col-span-2 flex items-center gap-1">
          <Image
            src={team.teamLogoUrl}
            alt={team.teamShortName}
            width={20}
            height={20}
            className="shrink-0"
          />
          <span className="whitespace-nowrap">{team.teamShortName}</span>
          {team.qualifier && (
            <Image
              src="/qualified-icon.svg"
              alt="Q"
              width={14}
              height={14}
              className="ml-1"
            />
          )}
        </div>
        <div className="col-span-1 text-center">{team.played}</div>
        <div className="col-span-1 text-center">{team.won}</div>
        <div className="col-span-1 text-center">{team.lost}</div>
        <div className="col-span-1 text-center">{team.noResult}</div>
        <div className="col-span-1 text-center">{team.netRunRate.toFixed(3)}</div>
        <div className="col-span-1 text-center">{team.for}</div>
        <div className="col-span-1 text-center">{team.against}</div>
        <div className="col-span-1 text-center font-bold">{team.points}</div>
        <div className="col-span-1 text-center hidden md:flex gap-1 justify-center">
          {team.recentForm.map((res, i) => (
            <span
              key={i}
              className={clsx(
                'text-xs w-5 h-5 flex items-center justify-center rounded-full border',
                res === 'W' && 'border-green-500 text-green-500',
                res === 'L' && 'border-red-500 text-red-500',
                res === 'N' && 'border-black text-black'
              )}
            >
              {res}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default PointsTableCard;
