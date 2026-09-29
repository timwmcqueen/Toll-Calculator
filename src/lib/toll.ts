export type DayType = "weekday" | "weekend";

export type TollEstimate = {
  dayType: DayType;
  time: string;
  amount: number;
  period: string;
};

type RateBand = {
  startHour: number;
  endHour: number;
  amount: number;
  label: string;
};

const weekdayRates: RateBand[] = [
  { startHour: 0, endHour: 6, amount: 1.55, label: "Off-peak" },
  { startHour: 6, endHour: 10, amount: 4.65, label: "Morning peak" },
  { startHour: 10, endHour: 18, amount: 2.35, label: "Daytime" },
  { startHour: 18, endHour: 24, amount: 1.55, label: "Off-peak" },
];

const weekendRates: RateBand[] = [
  { startHour: 0, endHour: 8, amount: 1.55, label: "Early off-peak" },
  { startHour: 8, endHour: 12, amount: 3.05, label: "Morning" },
  { startHour: 12, endHour: 16, amount: 3.45, label: "Midday" },
  { startHour: 16, endHour: 19, amount: 3.60, label: "Afternoon peak" },
  { startHour: 19, endHour: 22, amount: 3.05, label: "Evening" },
  { startHour: 22, endHour: 24, amount: 1.55, label: "Late off-peak" },
];

export function parseTime(time: string): { hour: number; minute: number } {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
  if (!match) {
    throw new Error("Time must be in 24-hour HH:MM format.");
  }

  return {
    hour: Number(match[1]),
    minute: Number(match[2]),
  };
}

export function calculateToll(dayType: DayType, time: string): TollEstimate {
  const { hour } = parseTime(time);
  const rates = dayType === "weekday" ? weekdayRates : weekendRates;
  const band = rates.find((rate) => hour >= rate.startHour && hour < rate.endHour);

  if (!band) {
    throw new Error("No toll rate is configured for the selected time.");
  }

  return {
    dayType,
    time,
    amount: band.amount,
    period: band.label,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
