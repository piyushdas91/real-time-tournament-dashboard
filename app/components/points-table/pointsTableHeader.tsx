const PointsTableHeader = () => {
  return (
    <div className="grid grid-cols-10 gap-0 text-xs md:text-sm font-semibold text-gray-500 px-2 py-2 border-b border-gray-300 bg-white">
      <div className="col-span-1 text-center">POS</div>
      <div className="col-span-1"></div>
      <div className="col-span-2">TEAM</div>
      <div className="col-span-1 text-center">P</div>
      <div className="col-span-1 text-center">W</div>
      <div className="col-span-1 text-center">L</div>
      <div className="col-span-1 text-center">NR</div>
      <div className="col-span-1 text-center">NRR</div>
      {/* <div className="col-span-1 text-center">FOR</div> */}
      {/* <div className="col-span-1 text-center">AGAINST</div> */}
      <div className="col-span-1 text-center font-bold">PTS</div>
      {/* <div className="col-span-1 text-center hidden md:block">FORM</div> */}
    </div>
  );
};

export default PointsTableHeader;
