// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Express
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS Middleware (works with local + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:8080",
  "https://eloquent-rolypoly-c037fd.netlify.app",
  "https://steady-peony-396f7e.netlify.app" // <-- added missing comma before
];

// Apply CORS headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Preflight request
  if (req.method === 'OPTIONS') return res.sendStatus(200);

  next();
});

// ✅ Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// ✅ Route imports
const cartRoutes = require("./routes/cart");
const adminRoutes = require("./routes/admin");
const featuredRoutes = require("./routes/featuredProducts");
const sellRoutes = require("./routes/sell");
const tradeRoutes = require("./routes/trade");
const authRoutes = require("./routes/auth");

// ✅ API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin/featured", featuredRoutes);
app.use("/api/sell", sellRoutes);
app.use("/api/trades", tradeRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('🚀 UpStyle API running successfully!');
});

// ✅ Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({ error: 'Server error', message: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🧩 Mongo URI: ${process.env.MONGO_URI ? 'Loaded' : 'Missing!'}`);
});
