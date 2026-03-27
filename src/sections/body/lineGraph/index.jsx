import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getUserAverage } from "../../../services/userInfo";
import { userAverageTransformer } from "../../../utils/transformers/userInfoTransformer";

const USER_ID = 12;

// #region Sub-components

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#fff",
        padding: "8px 10px",
        fontSize: "8px",
        fontWeight: 500,
        color: "#282D30",
        lineHeight: "24px",
      }}
    >
      {payload[0]?.value} min
    </div>
  );
};

const CustomCursor = ({ points, height }) => {
  if (!points?.length) return null;
  return (
    <rect
      x={points[0].x}
      y={0}
      width={9999}
      height={height}
      fill="rgba(0,0,0,0.1)"
    />
  );
};

// #endregion

const LineGraphSection = () => {
  const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    getUserAverage({ id: USER_ID })
      .then((data) => setSessionData(userAverageTransformer(data)))
      .catch(console.error);
  }, []);

  return (
    <div
      style={{
        background: "#FF0000",
        borderRadius: 5,
        paddingTop: 24,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: "rgba(255,255,255,0.7)",
          margin: "0 0 0 24px",
          lineHeight: 1.4,
          maxWidth: 130,
        }}
      >
        Durée moyenne des sessions
      </h2>

      <ResponsiveContainer width="100%" height={160}>
        <LineChart
          data={sessionData}
          margin={{ top: 20, right: 0, left: 0, bottom: 10 }}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
            dy={6}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
          />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: "#fff",
              stroke: "rgba(255,255,255,0.3)",
              strokeWidth: 8,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraphSection;
