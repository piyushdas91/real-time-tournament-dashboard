import Image from "next/image"
const MatchResult = ({match}) => {
    const getMatchInfo = () => {
        let homeTeamCode, awayTeamCode, firstBattingSummary, secondBattingSummary;
        const {HomeTeamID, FirstBattingTeamID} = match;
        // console.log(HomeTeamID, FirstBattingTeamID);
        
        if (HomeTeamID.toString() === FirstBattingTeamID.toString()) {
          homeTeamCode = match.FirstBattingTeamCode;
          awayTeamCode = match.SecondBattingTeamCode;
          firstBattingSummary = match.FirstBattingSummary;
          secondBattingSummary = match.SecondBattingSummary;
        } else {
          homeTeamCode = match.SecondBattingTeamCode;
          awayTeamCode = match.FirstBattingTeamCode;
          firstBattingSummary = match.SecondBattingSummary;
          secondBattingSummary = match.FirstBattingSummary;
        }
        // console.log(homeTeamCode, awayTeamCode, firstBattingSummary, secondBattingSummary);
        return { homeTeamCode, awayTeamCode, firstBattingSummary, secondBattingSummary }
      }
    return (
        <div className="flex-1 p-4 flex flex-col gap-4">
        {/* Location & Time */}
        <div className="text-xs text-gray-500">
          {match.GroundName}<br />
          JUN, TUE 3, 7:30 pm IST
        </div>

        {/* Teams Row */}
        <div className="flex items-center justify-between text-center">
          {/* Team 1 */}
          <div className="flex flex-col items-center gap-1">
            <Image
              src={match.MatchHomeTeamLogo}
              alt="RCB"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-sm font-semibold">{getMatchInfo().homeTeamCode}</span>
            <span className="text-sm">{getMatchInfo().firstBattingSummary}</span>
            {/* <span className="text-xs text-gray-500">(20.0 OV)</span> */}
          </div>

          {/* VS */}
          <div className="text-gray-400 text-xl font-semibold">vs</div>

          {/* Team 2 */}
          <div className="flex flex-col items-center gap-1">
            <Image
              src={match.MatchAwayTeamLogo}
              alt="PBKS"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-sm font-semibold">{getMatchInfo().awayTeamCode}</span>
            <span className="text-sm">{getMatchInfo().secondBattingSummary}</span>
            {/* <span className="text-xs text-gray-500">(20.0 OV)</span> */}
          </div>
        </div>

        {/* Icons and CTA */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-4">
            {/* Replace these with actual icons if needed */}
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm">🏏</div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm">📝</div>
          </div>

          <button className="bg-red-500 text-white text-sm px-4 py-1.5 rounded hover:bg-red-600 transition">
            Match Centre
          </button>
        </div>
      </div>
    )
}

export default MatchResult;