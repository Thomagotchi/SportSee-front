import { useState, useEffect } from "react";
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
    <div
      style={{
        background: "#282D30",
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart
          data={performanceData}
          margin={{ top: 24, right: 36, bottom: 24, left: 36 }}
        >
          <PolarGrid
            gridType="polygon"
            radialLines={false}
            stroke="rgba(255,255,255,0.25)"
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#fff", fontSize: 12, fontWeight: 500 }}
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
