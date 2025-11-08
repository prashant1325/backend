require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // your Mongo connection

const app = express();

// ✅ CORS configuration
app.use(cors({
  origin: [
    "https://lambent-selkie-e1be51.netlify.app", // your deployed frontend
    "http://localhost:5173"                       // local frontend
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ------------------ ROUTES ------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));

// ------------------ ROOT TEST ------------------
app.get("/", (req, res) => res.send("API running"));

// ------------------ CONNECT TO MONGO AND START SERVER ------------------
const startServer = async () => {
  try {
    await connectDB(); // ensure DB is connected before starting server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
