import React, { useState } from "react";
import RiskForm from "./components/riskForm";
import RiskTable from "./components/riskTable";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container">
      <h2>📊 GRC Risk Assessment Dashboard</h2>
      <p style={{ color: "#6b7280", marginBottom: "20px" }}>
        Assess, prioritize, and visualize organizational risks
      </p>

      <RiskForm onRiskAdded={() => setRefresh(!refresh)} />
      <hr />
      <RiskTable key={refresh} />
    </div>
  );
}

export default App;
