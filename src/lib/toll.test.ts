import { describe, expect, it } from "vitest";
import { calculateToll, formatCurrency, parseTime } from "./toll";

describe("toll domain", () => {
  it("uses the weekday morning peak rate", () => {
    expect(calculateToll("weekday", "08:30")).toMatchObject({
      amount: 4.65,
      period: "Morning peak",
    });
  });

  it("uses the weekend afternoon peak rate", () => {
    expect(calculateToll("weekend", "17:15")).toMatchObject({
      amount: 3.6,
      period: "Afternoon peak",
    });
  });

  it("rejects invalid time values", () => {
    expect(() => parseTime("25:00")).toThrow(/24-hour/);
  });

  it("formats US currency", () => {
    expect(formatCurrency(4.65)).toBe("$4.65");
  });
});
