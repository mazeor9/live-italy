# live-italy — Live Italy API Wrapper

**Live Italy API wrapper** — Fetch Italian statistics across economy, population, health, politics, society, security, work, and media. Full TypeScript support included.

  <div align="center">
  <p>
    <a href="https://github.com/mazeor9/live-italy/releases/latest">
  <img src="https://img.shields.io/github/v/release/mazeor9/live-italy?style=for-the-badge" alt="GitHub release (latest SemVer)" /></a>
    <a href="https://github.com/mazeor9/live-italy/releases/latest">
    <img src="https://img.shields.io/github/release-date/mazeor9/live-italy?label=latest%20release&style=for-the-badge" alt="Latest release" /></a>
   <a href="https://www.npmjs.com/package/live-italy"><img src="https://img.shields.io/npm/v/live-italy.svg?logo=npm&style=for-the-badge" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/live-italy"><img src="https://img.shields.io/npm/dt/live-italy.svg?style=for-the-badge" alt="NPM downloads" /></a>
  </p>
</div>

**Base URL:** `https://live-italy.vercel.app/api`

* Unified data model (single `statistics` table)
* Language output: Italian or English via `?lang=it|en`
* Pagination & sorting included

---

## Installation

```sh
npm i live-italy
```

---

## TypeScript Support

Full TypeScript types and IntelliSense are included.

```ts
// ES Module
import { getStatistics, getCategories, getMetrics, getHealth, type StatisticsResponse } from 'live-italy';

const res: StatisticsResponse = await getStatistics({ category: 'economy', lang: 'en', format: 'compact' });
console.log(res.data);
```

```js
// CommonJS
const { getStatistics, getCategories, getMetrics, getHealth } = require('live-italy');

(async () => {
  const health = await getHealth();
  console.log(health.status);
})();
```

---

## Getting Statistics

The `getStatistics()` method retrieves values directly from the `statistics` table, exactly as stored. It supports filtering, pagination, sorting, and output translation.

```js
const { getStatistics } = require('live-italy');

async function main() {
  try {
    // Economy (English), compact output
    const economyCompact = await getStatistics({
      category: 'economy',
      lang: 'en',
      format: 'compact'
    });
    console.log('Economy (compact):', economyCompact.data);

    // Single metric (GDP), full output with ordering
    const gdpFull = await getStatistics({
      metric: 'gdp',
      lang: 'en',
      sort: 'updated_at',
      order: 'desc',
      limit: 50
    });
    console.log('GDP (full):', gdpFull.data);

    // Pagination example
    const page2 = await getStatistics({ offset: 100, limit: 50 });
    console.log('Page 2 size:', page2.data.length);

  } catch (err) {
    console.error('Statistics error:', err.message);
  }
}

main();
```

### Parameters

```ts
type Lang = 'it' | 'en';
type SortField = 'category' | 'metric' | 'value' | 'updated_at' | 'last_updated';
type SortOrder = 'asc' | 'desc';
type Format = 'full' | 'compact';
```

* `category` — (optional) Filter by category (IT or EN), e.g. `"economia"` / `"economy"`
* `metric` — (optional) Filter by metric (IT or EN), e.g. `"pil"` / `"gdp"`
* `lang` — (optional) `"it"` | `"en"`; default `"it"` (translates output labels only)
* `limit` — (optional) default `100`, max `1000`
* `offset` — (optional) default `0`
* `sort` — (optional) `"category" | "metric" | "value" | "updated_at" | "last_updated"` (default `"updated_at"`)
* `order` — (optional) `"asc"` | `"desc"` (default `"desc"`)
* `format` — (optional) `"full"` | `"compact"` (default `"full"`)

### Notes

* Counters like `births_today`, `deaths_today`, `current_population` are stored as `calculated` rows and updated by the DB procedure. There’s **no** `?realtime=true` flag.

---

## Getting Categories

The `getCategories()` method returns available categories in the selected language.

```js
const { getCategories } = require('live-italy');

(async () => {
  const it = await getCategories();            // default 'it'
  const en = await getCategories({ lang: 'en' });
  console.log('IT categories:', it.data);
  console.log('EN categories:', en.data);
})();
```

### Parameters

* `lang` — (optional) `"it"` | `"en"`; default `"it"`

**Example Response**

```json
{
  "success": true,
  "data": ["population", "economy", "society", "work", "media", "politics", "security", "health"],
  "total_categories": 8,
  "filters_applied": { "language": "en" }
}
```

---

## Getting Metrics

The `getMetrics()` method lists metrics, optionally filtered by category, and translated according to `lang`.

```js
const { getMetrics } = require('live-italy');

async function list() {
  // All metrics (IT)
  const all = await getMetrics();

  // Metrics for economy (EN)
  const economy = await getMetrics({ category: 'economy', lang: 'en' });

  console.log('All (IT):', all.data.length, 'blocks');
  console.log('Economy (EN):', economy.data[0]);
}
list();
```

### Parameters

* `category` — (optional) Filter by category (IT or EN)
* `lang` — (optional) `"it"` | `"en"`; default `"it"`

**Example Response**

```json
{
  "success": true,
  "data": [
    { "category": "economy", "metrics": ["gdp", "public_debt", "debt_interest", "tax_evasion", "wealthy", "poor"] },
    { "category": "population", "metrics": ["total", "births_per_year", "deaths_per_year", "immigrants_per_year", "emigrants_per_year", "total_immigrants", "births_today", "deaths_today", "current_population"] }
  ],
  "total_categories": 8,
  "filters_applied": { "category": null, "language": "en" }
}
```

---

## Health Check

The `getHealth()` method retrieves a simple API and database status snapshot.

```js
const { getHealth } = require('live-italy');

(async () => {
  const health = await getHealth();
  console.log(health.status, health.database?.status);
})();
```

**Example Response**

```json
{
  "status": "healthy",
  "api_version": "2.0.0",
  "timestamp": "2025-10-26T00:00:00.000Z",
  "database": {
    "status": "connected",
    "server_time": "2025-10-26T00:00:00.000Z",
    "total_statistics": 65
  },
  "endpoints": ["/api/statistics", "/api/categories", "/api/metrics", "/api/health"]
}
```

---

## Error Handling

All methods throw an `Error` on failure. Use `try/catch`:

```js
try {
  const stats = await getStatistics({ metric: 'gdp', lang: 'en' });
  console.log(stats.data);
} catch (error) {
  console.error('Request failed:', error.message);
}
```

---

## Category & Metric Translations

The SDK translates **output labels** based on `?lang=it|en`.
Examples:

**Categories**

| Italian     | English    |
| ----------- | ---------- |
| popolazione | population |
| economia    | economy    |
| societa     | society    |
| lavoro      | work       |
| media       | media      |
| politica    | politics   |
| sicurezza   | security   |
| salute      | health     |
