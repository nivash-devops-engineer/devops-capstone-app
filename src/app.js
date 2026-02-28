const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Logging Setup
const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDir, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

// Routes
const userRoutes = require("./routes/userRoutes");
const healthRoutes = require("./routes/healthRoutes");

app.use("/api/users", userRoutes);
app.use("/health", healthRoutes);

app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 DevOps Capstone Project</h1>
    <h2>CI/CD with Jenkins, Docker & AWS</h2>
    <p>Monitoring with Prometheus & Grafana</p>
  `);
});

// Error Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
