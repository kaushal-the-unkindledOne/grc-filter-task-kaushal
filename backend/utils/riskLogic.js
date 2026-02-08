function calculateRisk(likelihood, impact) {
  const score = likelihood * impact;

  let level;
  if (score >= 1 && score <= 5) {
    level = "Low";
  } else if (score >= 6 && score <= 12) {
    level = "Medium";
  } else if (score >= 13 && score <= 18) {
    level = "High";
  } else {
    level = "Critical";
  }

  return { score, level };
}

module.exports = { calculateRisk };
