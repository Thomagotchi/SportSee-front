import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getUserActivity } from "../../../services/userInfo";
import { userActivityTransformer } from "../../../utils/transformers/userInfoTransformer";

const USER_ID = 12;

// #region Sub-components

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: "#E60000",
        padding: "4px 6px",
        color: "#fff",
        fontSize: "7px",
        lineHeight: "24px",
        fontWeight: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <span>{payload[0]?.value}kg</span>
      <span>{payload[1]?.value}Kcal</span>
    </div>
  );
};

const CustomLegend = () => (
  <div style={{ display: "flex", gap: "32px" }}>
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#74798C",
        fontSize: "14px",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#282D30",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      Poids (kg)
    </span>
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#74798C",
        fontSize: "14px",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#E60000",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      Calories brûlées (kCal)
    </span>
  </div>
);

// #endregion

const BarGraphSectionDefault = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    getUserActivity({ id: USER_ID })
      .then((data) => setActivityData(userActivityTransformer(data)))
      .catch(console.error);
  }, []);

  const kgValues = activityData.map((d) => d.kilogram);
  const minKg = kgValues.length ? Math.floor(Math.min(...kgValues)) : 0;
  const maxKg = kgValues.length ? Math.ceil(Math.max(...kgValues)) : 0;
  const kgTicks = Array.from(
    { length: maxKg - minKg + 2 },
    (_, i) => minKg - 1 + i,
  );

  return (
    <div
      style={{
        background: "#FBFBFB",
        borderRadius: 5,
        padding: "24px 32px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <h2
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "#282D30",
            margin: 0,
          }}
        >
          Activité quotidienne
        </h2>
        <CustomLegend />
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={activityData} barGap={8} barCategoryGap="35%">
          {kgTicks.map((tick) => (
            <ReferenceLine
              key={tick}
              y={tick}
              yAxisId="kilogram"
              stroke="#DEDEDE"
              strokeDasharray="3 3"
            />
          ))}
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9B9EAC", fontSize: 14 }}
            dy={10}
          />
          <YAxis
            yAxisId="kilogram"
            orientation="right"
            dataKey="kilogram"
            ticks={kgTicks}
            domain={[minKg - 1, maxKg + 1]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9B9EAC", fontSize: 14 }}
            dx={16}
          />
          <YAxis yAxisId="calories" orientation="left" hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0,0,0,0.07)" }}
          />
          <Bar
            yAxisId="kilogram"
            dataKey="kilogram"
            fill="#282D30"
            barSize={7}
            radius={[3, 3, 0, 0]}
          />
          <Bar
            yAxisId="calories"
            dataKey="calories"
            fill="#E60000"
            barSize={7}
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraphSectionDefault;
