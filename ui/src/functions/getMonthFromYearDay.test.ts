import "@testing-library/jest-dom/extend-expect";
import {
  getDayOfMonthFromDayOfYear,
  getMonthFromYearDay
} from "./getMonthFromYearDay";

describe("getMonthFromYearDay function", () => {
  it("work correct", () => {
    const dayOfYear = 31;
    const res = getMonthFromYearDay(dayOfYear);
    expect(res).toEqual(0);
  });
  it("last day of years", () => {
    const stdDay = 365;
    const res = getMonthFromYearDay(stdDay);
    expect(res).toEqual(11);
    const vesocostDay = 366;
    const res2 = getMonthFromYearDay(vesocostDay, 2024);
    expect(res2).toEqual(11);
    const notAllow = getMonthFromYearDay(vesocostDay);
    expect(notAllow).toBeNull();
  });
});

describe("getDayOfMonthFromDayOfYear function", () => {
  it("return correct month day", () => {
    const day = 60;
    const res = getDayOfMonthFromDayOfYear(day);
    expect(res).toEqual(1);
    const res2 = getDayOfMonthFromDayOfYear(day, 2024);
    expect(res2).toEqual(29);
    expect(getDayOfMonthFromDayOfYear(1000)).toBeNull();
  });
});
