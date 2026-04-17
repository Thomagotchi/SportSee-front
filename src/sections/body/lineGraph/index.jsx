import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getUserAverage } from "../../../services/userInfo";
import { userAverageTransformer } from "../../../utils/transformers/userInfoTransformer";
import styles from "./styles.module.scss";

const USER_ID = 12;

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.line_graph_tooltip}>{payload[0]?.value} min</div>
  );
};

const CustomCursor = ({ points }) => {
  if (!points?.length) return null;
  return (
    <rect
      x={points[0].x}
      y={-9999}
      width={9999}
      height={99999}
      fill="rgba(0,0,0,0.1)"
    />
  );
};

const LineGraphSection = () => {
  const [sessionData, setSessionData] = useState([]);
  useEffect(() => {
    getUserAverage({ id: USER_ID })
      .then((data) => setSessionData(userAverageTransformer(data)))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.line_graph_wrap}>
      <h2 className={styles.line_graph_heading}>Durée moyenne des sessions</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sessionData}
          margin={{ top: 120, right: 0, left: 0, bottom: 40 }}
        >
          <XAxis dataKey="day" hide />
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
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
      <div className={styles.xaxis_row}>
        {sessionData.map((d, i) => (
          <span key={i} className={styles.xaxis_label}>
            {d.day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LineGraphSection;
