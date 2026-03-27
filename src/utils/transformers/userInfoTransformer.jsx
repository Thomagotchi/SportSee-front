export function userActivityTransformer(response) {
  return response.data.sessions.map((session, index) => ({
    day: index + 1,
    kilogram: session.kilogram,
    calories: session.calories,
  }));
}

const WEEK_DAYS = ["L", "M", "M", "J", "V", "S", "D"];

export function userAverageTransformer(response) {
  return response.data.sessions.map((session, index) => ({
    day: WEEK_DAYS[index],
    sessionLength: session.sessionLength,
  }));
}

export function userScoreTransformer(response) {
  const score = response.data.todayScore ?? response.data.score ?? 0;
  return Math.round(score * 100);
}

const PERFORMANCE_LABELS = {
  1: "Cardio",
  2: "Energie",
  3: "Endurance",
  4: "Force",
  5: "Vitesse",
  6: "Intensité",
};

export function userPerformanceTransformer(response) {
  return [...response.data.data].reverse().map((item) => ({
    subject: PERFORMANCE_LABELS[item.kind],
    value: item.value,
  }));
}

export function userKeyInfo(response) {
  const data = response.data.keyData;

  return {
    calorie: `${data.calorieCount}kCal`,
    protein: `${data.proteinCount}g`,
    carbohydrate: `${data.carbohydrateCount}g`,
    lipid: `${data.lipidCount}g`,
  };
}
