import Image from "next/image";
const PointsTableRow = ({ team }) => {
  const TeamPositionChange = () => {
    return (
      <>
        {team.status === "UP" && <span className="text-green-500">▲</span>}
        {team.status === "DOWN" && <span className="text-red-500">▼</span>}
        {team.status === "SAME" && <span className="text-gray-400">-</span>}
      </>
    );
  };
  return (
    <div className="grid grid-cols-10 items-center gap-1 px-2 py-3 text-xs md:text-sm">
      <div className="col-span-1 text-center">{team.position}</div>
      <div className="col-span-1 text-center">
       {TeamPositionChange()}
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
      {/* <div className="col-span-1 text-center">{team.for}</div> */}
      {/* <div className="col-span-1 text-center">{team.against}</div> */}
      <div className="col-span-1 text-center font-bold">{team.points}</div>
      {/* <div className="col-span-1 text-center hidden md:flex gap-1 justify-center">
        {team.recentForm.map((res, i) => (
          <span
            key={i}
            className={clsx(
              "text-xs w-5 h-5 flex items-center justify-center rounded-full border",
              res === "W" && "border-green-500 text-green-500",
              res === "L" && "border-red-500 text-red-500",
              res === "N" && "border-black text-black"
            )}
          >
            {res}
          </span>
        ))}
      </div> */}
    </div>
  );
};

export default PointsTableRow;
