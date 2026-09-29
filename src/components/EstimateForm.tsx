import { FormEvent, useState } from "react";
import type { DayType, TollEstimate } from "../lib/toll";
import { calculateToll } from "../lib/toll";

type Props = {
  onEstimate: (estimate: TollEstimate) => void;
};

export function EstimateForm({ onEstimate }: Props) {
  const [dayType, setDayType] = useState<DayType>("weekday");
  const [time, setTime] = useState("08:30");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      onEstimate(calculateToll(dayType, time));
      setError("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to calculate toll.");
    }
  }

  return (
    <form className="estimate-form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="dayType">Day type</label>
        <select
          id="dayType"
          value={dayType}
          onChange={(event) => setDayType(event.target.value as DayType)}
        >
          <option value="weekday">Weekday</option>
          <option value="weekend">Weekend / holiday</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="time">Travel time</label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          required
        />
        <span className="hint">Uses the rate schedule from the original Java exercise.</span>
      </div>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <button className="primary-button" type="submit">
        Estimate toll
      </button>
    </form>
  );
}
