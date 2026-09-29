import type { TollEstimate } from "../lib/toll";
import { formatCurrency } from "../lib/toll";

type Props = {
  estimates: TollEstimate[];
  onClear: () => void;
};

export function EstimateHistory({ estimates, onClear }: Props) {
  if (estimates.length === 0) {
    return (
      <section className="panel" aria-labelledby="history-title">
        <h2 id="history-title">Recent estimates</h2>
        <p className="muted">Your recent estimates will appear here.</p>
      </section>
    );
  }

  return (
    <section className="panel" aria-labelledby="history-title">
      <div className="panel-heading">
        <h2 id="history-title">Recent estimates</h2>
        <button className="text-button" type="button" onClick={onClear}>
          Clear
        </button>
      </div>

      <ul className="history-list">
        {estimates.map((estimate, index) => (
          <li key={`${estimate.dayType}-${estimate.time}-${index}`}>
            <div>
              <strong>{estimate.time}</strong>
              <span>
                {estimate.dayType === "weekday" ? "Weekday" : "Weekend / holiday"} · {estimate.period}
              </span>
            </div>
            <strong>{formatCurrency(estimate.amount)}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
