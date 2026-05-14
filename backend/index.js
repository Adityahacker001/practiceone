// Entry point for backend server

require('dotenv').config();
require('./config/database');
const express = require('express');
const app = express();

// Middleware and routes will be added here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);