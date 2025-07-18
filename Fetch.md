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


## 🐞 Challenges Faced During Scraping/Fetching Data

While building the data layer for the IPL Dashboard, the following challenges were encountered:

### 1. 🔐 Lack of Official Public API
- The official IPL website (`iplt20.com`) does not provide an authenticated or documented public API.
- We had to rely on reverse-engineering embedded API calls used internally by the website.

### 2. 🔍 Obscured Data Sources
- The JSON endpoints are buried deep inside third-party hosting (AWS S3 buckets).
- It required careful inspection of the Network tab during site load to discover the actual data URLs.

### 3. ⚠️ Inconsistent Data Structure
- The match schedule and results API serves a mixture of completed, live, and upcoming matches.
- The points table API has inconsistent response structure which leads to API failure for certain selection of years.

### 4. 🔄 No Real-Time Updates
- Since the APIs are static JSONs updated periodically by IPL’s backend team, there's no WebSocket or live data stream.
- To simulate live updates, we implemented a `simulateLiveData()` function with `setInterval` to update the frontend every 30 seconds.

### 5. 🔄 API response data not intuitive
- For match schedule, team scores for home and away and which team is home away is not present in a proper manner. 
- Had to implement logic using toss details.

### 6. 🧪 Testing and Edge Cases
- Certain matches had missing scores, especially those not yet started or recently completed.
- We had to handle conditional rendering to avoid crashing UI components during such cases.

### 7. 📦 CORS and Direct Fetch Limitations (if client-side)
- Direct client-side calls to `iplt20.com` JSONs would throw CORS errors.
- To overcome this, we routed all API requests through Next.js server-side functions (`app/api`) which act as middleware.

---