import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { getUserPerformance } from "../../../services/userInfo";
import { userPerformanceTransformer } from "../../../utils/transformers/userInfoTransformer";

const USER_ID = 12;

const RadarGraphSection = () => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    getUserPerformance({ id: USER_ID })
      .then((data) => setPerformanceData(userPerformanceTransformer(data)))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.radar_graph}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={performanceData}
          margin={{ top: 12, right: 12, bottom: 12, left: 12 }}
        >
          <PolarGrid gridType="polygon" radialLines={false} stroke="#FFFFFF" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#fff", fontSize: "0.75rem", fontWeight: 500 }}
            tickLine={false}
          />
          <Radar
            dataKey="value"
            fill="#E60000"
            fillOpacity={0.7}
            stroke="none"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarGraphSection;
