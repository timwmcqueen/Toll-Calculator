# RoadRate — React + TypeScript Toll Estimator

![CI](https://github.com/timwmcqueen/Toll-Calculator/actions/workflows/ci.yml/badge.svg)

RoadRate is a React and TypeScript app for calculating toll rates based on the day and time of travel.

The original Java version is kept in `legacy/Main.java`.

## Stack

- React 19
- TypeScript
- Vite
- Vitest
- React Testing Library
- Browser localStorage
- GitHub Actions
- Docker / nginx

## Features

- Weekday and weekend/holiday rate schedules
- Native time input
- Toll calculation logic kept separate from React components
- Accessible labels and live result feedback
- Recent estimate history saved in the browser
- Responsive layout
- Unit tests for rate calculations
- Component tests for the main user flows

## Run locally

Requires Node.js 22+.

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

## Production build

```bash
npm run build
npm run preview
```

## Docker

```bash
docker build -t road-rate .
docker run -p 8080:80 road-rate
```

Open `http://localhost:8080`.

## Project structure

```
src/
├── components/
│   ├── EstimateForm.tsx
│   └── EstimateHistory.tsx
├── lib/
│   ├── toll.ts
│   └── toll.test.ts
├── App.tsx
├── App.test.tsx
├── main.tsx
└── styles.css
```

The toll rules live in `src/lib/toll.ts`, separate from the React components, so they can be tested without rendering the UI.
