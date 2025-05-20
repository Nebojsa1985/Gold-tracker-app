import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const YearDollarChart = ({ goldhistory }) => (
  <ResponsiveContainer width="94%" height="100%">
    <LineChart data={goldhistory}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="year"
        tick={{ fontSize: 12, fontFamily: "Arial", fill: "#555" }}
      />
      <YAxis tick={{ fontSize: 12, fontFamily: "Arial", fill: "#555" }} />
      <Tooltip />
      <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default YearDollarChart;
