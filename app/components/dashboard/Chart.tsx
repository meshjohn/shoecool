"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface iAppProps {
  // eslint-disable-next-line  @typescript-eslint/ban-types
  data: {}[];
}
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const aggregateData = (data: any) => {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const aggregated = data.reduce((acc: any, curr: any) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.revenue;
    } else {
      acc[curr.date] = curr.revenue;
    }
    return acc;
  }, {});
  return Object.keys(aggregated).map((date) => ({
    date,
    revenue: aggregated[date],
  }));
};

const Chart = ({ data }: iAppProps) => {
  const processData = aggregateData(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={processData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          stroke="#3b82f6"
          activeDot={{ r: 8 }}
          dataKey="revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
