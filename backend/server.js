const express = require("express");
const cors = require("cors");
const initDatabase = require("./initDb");
const riskRoutes = require("./routes/risks");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

initDatabase();

app.use("/", riskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "GRC Risk API running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

