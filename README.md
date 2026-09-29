# RoadRate — React + TypeScript Toll Estimator

![CI](https://github.com/timwmcqueen/Toll-Calculator/actions/workflows/ci.yml/badge.svg)

RoadRate is a small React and TypeScript toll calculator. I rebuilt an old Java exercise as a browser app so I could focus on frontend structure, accessibility, state, and testing.

The original Java implementation is preserved under `legacy/Main.java`; the current application lives under `src/`.

## Why this project exists

This project demonstrates how I approach modernization: isolate the business rules, give them strong tests, build an accessible interface around them, and automate verification in CI.

## Stack

- React 19
- TypeScript
- Vite
- Vitest
- React Testing Library
- Browser localStorage for recent estimates
- GitHub Actions
- Docker / nginx

## Features

- Weekday and weekend/holiday rate schedules
- Native time input with domain-level validation
- Typed rate calculation logic separated from presentation
- Accessible form labels and live result feedback
- Recent estimate history persisted in the browser
- Responsive layout
- Unit tests for pricing rules
- Component tests for key user flows
- Automated build and test checks on pull requests

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

Then open `http://localhost:8080`.

## Architecture

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

The core toll rules are intentionally kept in `src/lib/toll.ts`, independent of React. That keeps the business logic deterministic, reusable, and easy to test.

## Engineering practices demonstrated

- React component composition
- TypeScript domain modeling
- Separation of business logic from UI
- Accessible form design
- Unit and component testing
- Defensive state persistence
- Responsive CSS
- CI on pushes and pull requests
- Containerized static deployment
- Git branch / pull-request workflow

## Project history

This repository began as a small Java exercise. The original source remains in `legacy/` so the repository documents the progression from an introductory program to a maintainable modern frontend application.
