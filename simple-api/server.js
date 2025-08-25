// server.js
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // allow JSON bodies

// Simple GET endpoint
app.get("/", (req, res) => {
  res.send("Hello, Unity!");
});

// GET Player Info (example)
app.get("/player/:id", (req, res) => {
  const playerId = req.params.id;
  res.json({
    playerId: playerId,
    username: "Player_" + playerId,
    level: 3,
    xp: 1500
  });
});

// POST Save Progress
app.post("/progress", (req, res) => {
  const { playerId, level, xp } = req.body;
  console.log("Received progress:", req.body);
  res.json({
    message: "Progress saved successfully!",
    data: { playerId, level, xp }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
