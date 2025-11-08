require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // make sure this exists

const app = express();

// ✅ CORS
app.use(cors({
  origin: [
    "https://lambent-selkie-e1be51.netlify.app",
    "http://localhost:5173"
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));

// ✅ Test root
app.get("/", (req,res)=> res.send("API running"));

// ✅ Connect to Mongo
connectDB();

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
