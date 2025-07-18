# IPL Dashboard – Data Architecture and Fetching Strategy

This document outlines the architecture of the IPL Dashboard project, particularly how data (points table, match schedule, and results) is fetched from IPLT20.com using embedded APIs and served via Next.js API routes.

---

## 🏗️ Fetch Architecture

├── app/
│ ├── api/
│ │ ├── scraper/route.ts # Serves other data such as competition info, points table and match schedule/results
│ │ ├── liveMatches/route.ts # serves live match data(automatically polled every 15s to update the match cards)
│ └── ...
├── public/
├── components/
├── README.md


## 🔗 Data Sources from IPLT20.com

We used embedded APIs directly available from the IPLT20.com frontend to fetch dynamic data such as the points table and match schedule. These APIs are publicly available and can be found by inspecting network requests on IPLT20.com.

### 📊 Points Table API

- **Endpoint Used**:
https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/${competitonCode}-groupstandings.js?ongroupstandings=_jqjsp&_1752653829192=`

- **Details**:
- Returns a JSONP node containing team standings which required coversion to JSON using regex.
- Includes attributes like matches played, won, lost, NR, NRR, and points.

### 📅 Match Schedule & Results API

- **Endpoint Used**:
https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp&_1752411360259=


- **Details**:
- Returns a JSONP node containing match schedule and results which required coversion to JSON using regex.
- Fields include team names, short codes, match status, scores, venue, date, and time.

---

## ⚙️ Data Serving via Next.js API Routes

To maintain modularity and allow reusability in frontend components, we serve scraped and processed data through Next.js API routes (`/app/api/...`). Each route handles fetching, parsing, and formatting of the raw data.

### 1. `/api/scrape?type=points`

- Fetches the standings JSON from IPLT20.
- Parses team details and table positions.
- Returns a clean, frontend-friendly response.

### 2. `/api/scrape?type=schedule`

- Fetches match results/schedule JSON.
- Splits data into categories: `UPCOMING`, `LIVE`, and `COMPLETED`.
- Serves structured data including scores, overs, venue, and match status.

### 3. `/api/liveMatches`

As there are no live IPL matches available, I have created a dummy JSON structure that mocks an IPL match with runningStatus as 'LIVE', 'UPCOMING' or 'COMPLETED'.

The logic implemented is to show live match cards if any, else show upcoming matches. If even upcoming matches are not present, then latest completed matches are shown.

One can tamper with this JSON object present in /api/liveMatches/route.ts in 'cachedMatches' variable and monitor the results in the frontend where the API is called every 15 seconds to get real time data.

A function simulateLiveData() has been implemented to randomly increase runs, balls and wickets in the JSON object to ensure a feeling of real time ,match update even though dummy data is used.



To summarise:

- Combines hardcoded mock data and live simulation logic.
- Uses a `simulateLiveData()` function to mimic real-time updates.
- Returns consistent JSON structure across all match types.

---

## 🧠 Why This Approach?

- ✅ **No web scraping needed** – We use official IPLT20-hosted static JSON APIs.
- ✅ **Efficient updates** – `simulateLiveData()` allows periodic front-end refreshing for live matches.
- ✅ **Maintainability** – API logic is separated from UI, making it easier to extend or refactor.

---

Additionally, implemented 'React query + persistence' using localStorage to cache match schedule data as schedule is not likely to change.