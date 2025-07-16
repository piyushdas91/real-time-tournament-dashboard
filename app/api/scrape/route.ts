export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    try {
        if (type === 'points') {
            const data = await fetchPointsTable();
            return Response.json({ success: true, data });
        }
        if (type === 'schedule') {
            const data = await fetchMatchSchedule();
            return Response.json({ success: true, data });
        }
        // if (type === 'pointsTable') {
        //     const data = await fetchPointsTable();
        //     return Response.json({success: true, data});
        // }

        return Response.json({
            error: 'Invalid type parameter'
        },
            { status: 400 }
        );

    } catch (err) {
        return Response.json({
            error: 'failed to fetch or parse data', details: (err as Error).message
        }, { status: 500 })
    }
}

// Fetching functions

async function fetchPointsTable() {
    const url = 'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js?ongroupstandings=_jqjsp&_1752653829192=';
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