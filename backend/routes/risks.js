const express = require("express");
const router = express.Router();
const db = require("../db");
const { calculateRisk } = require("../utils/riskLogic");

router.post("/assess-risk", (req, res) => {
  const { asset, threat, likelihood, impact } = req.body;

  // Basic validation
  if (
    !asset ||
    !threat ||
    typeof likelihood !== "number" ||
    typeof impact !== "number"
  ) {
    return res.status(400).json({
      error: "Missing or invalid fields"
    });
  }

  if (likelihood < 1 || likelihood > 5 || impact < 1 || impact > 5) {
    return res.status(400).json({
      error: "Invalid range: Likelihood and Impact must be 1–5."
    });
  }

  const { score, level } = calculateRisk(likelihood, impact);

  const insertQuery = `
    INSERT INTO risks (asset, threat, likelihood, impact, score, level)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    insertQuery,
    [asset, threat, likelihood, impact, score, level],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      return res.status(201).json({
        id: this.lastID,
        asset,
        threat,
        likelihood,
        impact,
        score,
        level
      });
    }
  );
});

router.get("/risks", (req, res) => {
  const { level } = req.query;

  let query = "SELECT * FROM risks";
  let params = [];

  if (level) {
    query += " WHERE level = ?";
    params.push(level);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    // PDF requires: empty DB → return []
    return res.json(rows);
  });
});


module.exports = router;
