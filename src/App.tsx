import { useEffect, useState } from "react";
import { EstimateForm } from "./components/EstimateForm";
import { EstimateHistory } from "./components/EstimateHistory";
import type { TollEstimate } from "./lib/toll";
import { formatCurrency } from "./lib/toll";

const STORAGE_KEY = "road-rate-estimates";

function loadHistory(): TollEstimate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TollEstimate[]) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [estimate, setEstimate] = useState<TollEstimate | null>(null);
  const [history, setHistory] = useState<TollEstimate[]>(loadHistory);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  function handleEstimate(next: TollEstimate) {
    setEstimate(next);
    setHistory((current) => [next, ...current].slice(0, 6));
  }

  function clearHistory() {
    setHistory([]);
  }

  return (
    <main>
      <header className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">React + TypeScript portfolio project</p>
            <h1>RoadRate</h1>
            <p className="lede">
              A fast, accessible toll estimator built from a small Java console exercise and
              redesigned as a tested modern web application.
            </p>
          </div>
          <div className="hero-badge" aria-label="Project technologies">
            <span>React 19</span>
            <span>TypeScript</span>
            <span>Vitest</span>
            <span>CI/CD</span>
          </div>
        </div>
      </header>

      <div className="shell content-grid">
        <section className="panel" aria-labelledby="estimate-title">
          <p className="section-kicker">Calculator</p>
          <h2 id="estimate-title">Estimate your toll</h2>
          <p className="muted">
            Select the day type and travel time to evaluate the configured rate schedule.
          </p>

          <EstimateForm onEstimate={handleEstimate} />

          <div className="result" aria-live="polite">
            {estimate ? (
              <>
                <span>Estimated toll</span>
                <strong>{formatCurrency(estimate.amount)}</strong>
                <small>{estimate.period} rate · {estimate.time}</small>
              </>
            ) : (
              <>
                <span>Estimated toll</span>
                <strong>—</strong>
                <small>Submit the form to calculate a rate.</small>
              </>
            )}
          </div>
        </section>

        <aside>
          <EstimateHistory estimates={history} onClear={clearHistory} />

          <section className="panel engineering-panel">
            <p className="section-kicker">Engineering focus</p>
            <h2>What this demonstrates</h2>
            <ul>
              <li>Typed domain logic separated from UI code</li>
              <li>Accessible form controls and live result feedback</li>
              <li>Persistent client-side state with defensive parsing</li>
              <li>Unit and component testing</li>
              <li>Automated CI build and test checks</li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
