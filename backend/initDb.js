const db = require("./db");

function initDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS risks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      asset TEXT NOT NULL,
      threat TEXT NOT NULL,
      likelihood INTEGER NOT NULL,
      impact INTEGER NOT NULL,
      score INTEGER NOT NULL,
      level TEXT NOT NULL
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error("❌ Failed to create risks table", err);
    } else {
      console.log("✅ Risks table ready");
    }
  });
}

module.exports = initDatabase;
