import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
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

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className={styles.bar_graph_tooltip}>
      <span>{payload[0]?.value}kg</span>
      <span>{payload[1]?.value}Kcal</span>
    </div>
  );
};

const CustomCursor = ({ x, y, width, height }) => {
  const cursorWidth = 56;
  return (
    <rect
      x={x + (width - cursorWidth) / 2}
      y={y}
      width={cursorWidth}
      height={height}
      fill="rgba(0,0,0,0.07)"
    />
  );
};

const CustomLegend = () => (
  <div className={styles.bar_graph_legend}>
    <span className={styles.bar_graph_legend_text}>
      <span className={styles.bar_graph_legend_circle} />
      Poids (kg)
    </span>
    <span className={styles.bar_graph_legend_text}>
      <span className={`${styles.bar_graph_legend_circle} ${styles.red}`} />
      Calories brûlées (kCal)
    </span>
  </div>
);

const BarGraphSectionDefault = ({ userId, isMock }) => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    getUserActivity({ id: userId, isMock })
      .then((data) => setActivityData(userActivityTransformer(data)))
      .catch(console.error);
  }, [userId, isMock]);

  const kgValues = activityData.map((d) => d.kilogram);
  const minKg = kgValues.length ? Math.floor(Math.min(...kgValues)) : 0;
  const maxKg = kgValues.length ? Math.ceil(Math.max(...kgValues)) : 0;
  const kgTicks = Array.from(
    { length: maxKg - minKg + 2 },
    (_, i) => minKg - 1 + i,
  );

  return (
    <div className={styles.bar_graph_default}>
      <div className={styles.bar_graph}>
        <h2 className={styles.bar_graph_title}>Activité quotidienne</h2>
        <CustomLegend />
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={activityData} barGap={8} barCategoryGap="55%">
          {kgTicks.map((tick) => (
            <ReferenceLine
              key={tick}
              y={tick}
              yAxisId="kilogram"
              stroke="#DEDEDE"
              strokeDasharray="3 3"
              zIndex={1}
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
            cursor={<CustomCursor />}
            offset={32}
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
