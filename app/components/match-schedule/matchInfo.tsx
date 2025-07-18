const MatchInfo = ({matchOrder, matchComments}) => {
    return (
        <div className="flex flex-col items-center justify-center border-r w-full md:w-1/4 px-3 max-w-33">
        {<span className="text-xs font-medium self-start text-green-600 border border-green-600 px-2 py-0.5 rounded mb-2">
          {matchOrder}
        </span>}
        <p className="text-xs font-semibold text-left text-gray-800">
          {/* ROYAL CHALLENGERS BENGALURU<br />WON BY 6 RUNS<br />(WINNERS) */}
          {matchComments.toUpperCase()}
        </p>
      </div>
    )
}

export default MatchInfo;