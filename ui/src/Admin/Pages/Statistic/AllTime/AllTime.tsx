import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { TitleAdmin } from "../../../../Components/TitleAdmin/TitleAdmin";
import { Visits } from "../Visits/Visits";
import { addMonths } from "date-fns";

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const AllTime = () => {
  const from = new Date("2000.01.01");
  const to = addMonths(
    `${new Date().getFullYear()}.${new Date().getMonth() + 1}.01`,
    1
  );
  const COLORS = [
    "hsl(208,100%,50%)",
    "hsl(169,100%,38%)",
    "hsl(41,100%,58%)",
    "hsl(20,100%,63%)"
  ];

  return (
    <>
      <TitleAdmin>Статистика за все время</TitleAdmin>
      <Visits from={from} to={to} />

      <ResponsiveContainer width={"100%"} height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey={"value"}
            nameKey={"name"}
            valueKey={"name"}
            legendType={"circle"}
            cy={150}
            startAngle={200}
            endAngle={-20}
            innerRadius={40}
            paddingAngle={2}
            label={true}
          >
            {COLORS.map((c) => (
              <Cell fill={c} key={c} />
            ))}
          </Pie>
          <Legend />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};
export default AllTime;
