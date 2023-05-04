import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import _ from "lodash";
import { useMemo } from "react";
import { getDayOfYear, subDays } from "date-fns";
import {
  getDayOfMonthFromDayOfYear,
  getMonthFromYearDay
} from "../../../../functions/getMonthFromYearDay";

type BaseDataType = {
  [key: string]: number;
  dayOfYear: number;
  year: number;
};
type ChartProps = {
  data: BaseDataType[];
  from: Date;
  to: Date;
  isGtMonth: boolean;
};

type GetData = <T extends BaseDataType>(
  data: BaseDataType[],
  from: Date,
  to: Date,
  isGtMonth?: boolean
) => Record<keyof BaseDataType, number>[];

type GetFull = (batch: BaseDataType[]) => BaseDataType[];

export const numToMonth = {
  0: "января",
  1: "февраля",
  2: "марта",
  3: "апреля",
  4: "мая",
  5: "июня",
  6: "июля",
  7: "августа",
  8: "сентября",
  9: "октября",
  10: "ноября",
  11: "декабря"
};
const monthLabel = (day: number) => numToMonth[getMonthFromYearDay(day)!];
const numToNameMonth = {
  0: "январь",
  1: "февраль",
  2: "март",
  3: "апрель",
  4: "май",
  5: "июнь",
  6: "июль",
  7: "август",
  8: "сентябрь",
  9: "октябрь",
  10: "ноябрь",
  11: "декабрь"
};
const monthName = (day: number) => numToNameMonth[getMonthFromYearDay(day)!];

export const getData: GetData = (data, from, to, isGtMonth = true) => {
  const startYear = _.chain(data)
    .map(_.property<BaseDataType, number>("year"))
    .min()
    .value();
  const startDay = isGtMonth
    ? _.chain(data)
        .filter(({ year }) => year === startYear)
        .map(_.property<BaseDataType, number>("dayOfYear"))
        .min()
        .value()
    : getDayOfYear(from);
  const endDay =
    to > new Date()
      ? // на случай первого дня года
        getDayOfYear(subDays(new Date(), 1)) + 2
      : getDayOfYear(subDays(to, 1)) + 1;
  const getRange = (year: number): [number, number] => {
    if (to.getFullYear() - from.getFullYear() === 0)
      return [Number(startDay), endDay];
    else if (startYear === year) return [startDay, 366];
    else if (to.getFullYear() === year) return [1, endDay];
    else return [1, 366];
  };

  const getFull: GetFull = (batch) => {
    const year = batch[0].year;
    const [start, end] = getRange(Number(year));
    const dates = batch.map(({ dayOfYear }) => dayOfYear);
    return _.range(start, end).map((i) =>
      dates.indexOf(i) >= 0
        ? (batch.find(({ dayOfYear }) => dayOfYear === i) as typeof batch[0])
        : ({
            dayOfYear: i,
            year,
            hits: 0,
            clients: 0
          } as unknown as typeof batch[0])
    );
  };
  return _.chain(data)
    .groupBy(_.property("year"))
    .values()
    .map(getFull)
    .reduce((a, b) => _.concat(a, b), [] as ReturnType<GetData>)
    .value();
};

export const VisitsChart = ({ data, from, to, isGtMonth }: ChartProps) => {
  const fullData = useMemo(() => getData(data, from, to, isGtMonth), [data]);
  const ruLabelsData = useMemo(
    () =>
      fullData.map((day) => ({
        id: `${day.dayOfYear},${day.year}`,
        Посещений: day.hits,
        Уникальных: day.clients
      })),
    [data]
  );
  const tickFormatter = (value: string) => {
    const [dayOfYear, year] = value.split(",");
    const day =
      getDayOfMonthFromDayOfYear(Number(dayOfYear), Number(year)) || 0;
    return day.toString();
  };

  const tickForMonthPoint = (value: string) => {
    const [dayOfYear, year] = value.split(",");
    const [firstDay, firstYear] = ruLabelsData[0].id.split(",");
    const day =
      getDayOfMonthFromDayOfYear(Number(dayOfYear), Number(year)) || 0;
    if (day === 1 || (dayOfYear === firstDay && year === firstYear)) {
      return monthName(Number(dayOfYear));
    } else return "";
  };

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart
        data={ruLabelsData}
        margin={{ top: 5, right: 10, left: -25, bottom: -30 }}
      >
        <XAxis
          dataKey={"id"}
          tickFormatter={tickFormatter}
          interval={Math.floor(ruLabelsData.length / 32)}
          xAxisId={0}
        />
        <XAxis
          dataKey={"id"}
          type={"category"}
          axisLine={false}
          tickLine={false}
          tickFormatter={tickForMonthPoint}
          interval={0}
          tickMargin={-5}
          padding={{ left: 10 }}
          xAxisId={1}
        />
        <YAxis scale={"auto"} />
        <Tooltip
          contentStyle={{ backgroundColor: "hsla(0, 0%, 100%, .5)" }}
          labelFormatter={(label) =>
            `${getDayOfMonthFromDayOfYear(label.split(",")[0])} ${monthLabel(
              label.split(",")[0]
            )} ${label.split(",")[1]}`
          }
          labelStyle={{
            textAlign: "center"
          }}
        />
        <Legend
          wrapperStyle={{
            top: 20,
            right: 20,
            lineHeight: "15px",
            width: 150,
            border: "1px solid hsl(0, 0%, 80%)"
          }}
        />
        <CartesianGrid stroke={"hsl(0,0%,80%)"} strokeDasharray={"3 3"} />
        <Line
          type="monotone"
          dataKey="Уникальных"
          stroke={"hsl(27,100%,50%)"}
          yAxisId={0}
        />
        <Line
          type="monotone"
          dataKey="Посещений"
          stroke={"hsl(95,88%,25%)"}
          // yAxisId={1}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
