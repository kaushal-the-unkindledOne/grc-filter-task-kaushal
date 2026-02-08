const API_BASE_URL = "http://localhost:8000";

export async function createRisk(data) {
  const response = await fetch(`${API_BASE_URL}/assess-risk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Failed to create risk");
  }

  return response.json();
}

export async function fetchRisks(level) {
  const url = level
    ? `${API_BASE_URL}/risks?level=${level}`
    : `${API_BASE_URL}/risks`;

  const response = await fetch(url);
  return response.json();
}
