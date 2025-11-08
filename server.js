// backend/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Express
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Allowed Frontend Origins
const allowedOrigins = [
  "http://localhost:5173",                           // local dev
  "http://127.0.0.1:8080",                           // alternate local
  "https://eloquent-rolypoly-c037fd.netlify.app",   // deployed frontend 1
  "https://steady-peony-396f7e.netlify.app"        // deployed frontend 2
];

// ✅ CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  credentials: true, // allow cookies/auth headers
};

// Apply CORS to all routes
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight

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
