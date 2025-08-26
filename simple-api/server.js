// server.js
const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json()); // allow JSON bodies

// Emoji quiz data
const emojiQuizzes = [
  { emojis: "🍕🍔🍟", answer: "fast food" },
  { emojis: "🚗💨", answer: "fast car" },
  { emojis: "🐶🐱🐭", answer: "animals" },
  { emojis: "🌞🌧️🌈", answer: "weather" },
  { emojis: "🎮🕹️👾", answer: "gaming" },
  { emojis: "🏀⚽🏈", answer: "sports" },
  { emojis: "🎵🎤🎸", answer: "music" },
  { emojis: "🍎🍌🍇", answer: "fruits" },
  { emojis: "✈️🌍🧳", answer: "travel" },
  { emojis: "📚✏️🏫", answer: "school" }
];

// ✅ GET all quizzes
app.get("/quizzes", (req, res) => {
  res.json(emojiQuizzes);
});

// ✅ GET random quiz
app.get("/quizzes/random", (req, res) => {
  const random = emojiQuizzes[Math.floor(Math.random() * emojiQuizzes.length)];
  res.json(random);
});

// ✅ Check answer
app.get("/quizzes/check", (req, res) => {
  const { emojis, guess } = req.query;
  if (!emojis || !guess) {
    return res.status(400).json({ error: "Provide both emojis and guess" });
  }

  const quiz = emojiQuizzes.find(q => q.emojis === emojis);
  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }

  const correct = quiz.answer.toLowerCase() === guess.toLowerCase();
  res.json({ correct, answer: quiz.answer });
});

// Start server
app.listen(port, () => {
  console.log(`Emoji Quiz API running at http://localhost:${port}`);
});
