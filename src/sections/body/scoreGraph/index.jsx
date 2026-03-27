import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { getUser } from "../../../services/userInfo";
import { userScoreTransformer } from "../../../utils/transformers/userInfoTransformer";

const USER_ID = 12;

const ScoreGraphSection = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    getUser({ id: USER_ID })
      .then((data) => setScore(userScoreTransformer(data)))
      .catch(console.error);
  }, []);

  const chartData = [{ value: score }, { value: 100 - score }];

  return (
    <div
      style={{
        background: "#FBFBFB",
        borderRadius: 5,
        padding: "24px",
        position: "relative",
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
        Score
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <PieChart width={200} height={200}>
          {/* Background track */}
          <Pie
            data={[{ value: 1 }]}
            cx="50%"
            cy="50%"
            innerRadius={68}
            outerRadius={80}
            startAngle={0}
            endAngle={360}
            dataKey="value"
            strokeWidth={0}
            fill="#EDEDED"
          />
          {/* Score arc */}
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={68}
            outerRadius={80}
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

        {/* Inner white circle + center text */}
        <div
          style={{
            position: "absolute",
            width: 136,
            height: 136,
            borderRadius: "50%",
            background: "#FBFBFB",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#282D30",
              lineHeight: 1,
            }}
          >
            {score}%
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#74798C",
              maxWidth: 90,
              lineHeight: 1.4,
              marginTop: 8,
            }}
          >
            de votre objectif
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGraphSection;
