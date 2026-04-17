import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { getUser } from "../../../services/userInfo";
import { userScoreTransformer } from "../../../utils/transformers/userInfoTransformer";
import styles from "./styles.module.scss";

const ScoreGraphSection = ({ userId, isMock }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    getUser({ id: userId, isMock })
      .then((data) => setScore(userScoreTransformer(data)))
      .catch(console.error);
  }, [userId, isMock]);

  const chartData = [{ value: score }, { value: 100 - score }];

  return (
    <div className={styles.score_graph_wrap}>
      <h2 className={styles.score_graph_title}>Score</h2>
      <div className={styles.radar_graph_content}>
        <PieChart width="100%" height="100%">
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={66}
            outerRadius={74}
            startAngle={90}
            endAngle={90 + 360}
            dataKey="value"
            strokeWidth={0}
            cornerRadius={10}
          >
            <Cell fill="#E60000" />
            <Cell fill="transparent" />
          </Pie>
        </PieChart>
        <div className={styles.radar_graph_text}>
          <span className={styles.radar_graph_title}>{score}%</span>
          <span className={styles.radar_graph_subtitle}>de votre objectif</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGraphSection;
