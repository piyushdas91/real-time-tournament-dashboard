import { NextResponse } from "next/server";

let cache: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 120 * 60 * 1000;

export async function GET(req: Request) {

    const now = Date.now();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const competitonCode = searchParams.get('code');

    //serve cache data if still fresh
    // if (cache && now - lastFetchTime < CACHE_DURATION && type == "points") {
    //     return NextResponse.json({data: cache, cached: true});
    // }

    try {
        if (type === 'points') {
            const data = await fetchPointsTable(competitonCode);
            // update cache
            cache = data;
            lastFetchTime = now;
            return NextResponse.json({ success: true, data });
        }
        if (type === 'schedule') {
            const data = await fetchMatchSchedule();
            return NextResponse.json({ success: true, data });
        }
        if (type === 'competition') {
            const data = await fetchCompetitionData();
            return NextResponse.json({ success: true, data });
        }
        // if (type === 'pointsTable') {
        //     const data = await fetchPointsTable();
        //     return Response.json({success: true, data});
        // }

        return NextResponse.json({
            error: 'Invalid type parameter'
        },
            { status: 400 }
        );

    } catch (err) {
        return NextResponse.json({
            error: 'failed to fetch or parse data', details: (err as Error).message
        }, { status: 500 })
    }
}

// Fetching functions

async function fetchCompetitionData() {
    const url = 'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/mc/competition.js?callback=oncomptetion&_=1752761240369';
    const res = await fetch(url);
        const text = await res.text();
        const jsonText = text.replace(/^oncomptetion\(/, '').replace(/\);$/, '');
        const data = JSON.parse(jsonText);
        //console.log(data);
        return data;
}

async function fetchPointsTable(competitonCode) {
    console.log(competitonCode);
    
    const url = `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/${competitonCode}-groupstandings.js?ongroupstandings=_jqjsp&_1752653829192=`;
    console.log(url);
    
        const res = await fetch(url);
        const text = await res.text();
        const jsonText = text.replace(/^ongroupstandings\(/, '').replace(/\);$/, '');
        const data = JSON.parse(jsonText);
        //console.log(data);
        return data;
}

async function fetchMatchSchedule() {
    const url = 'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp&_1752411360259=';
        const res = await fetch(url);
        const text = await res.text();
        const jsonText = text.replace(/^MatchSchedule\(/, '').replace(/\);$/, '');
        const data = JSON.parse(jsonText);
        //console.log(data);
        return data;
}

// async function fetchPointsTable() {
    
// }