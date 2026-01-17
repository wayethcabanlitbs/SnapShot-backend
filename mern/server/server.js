// server/server.js
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import records from "./routes/record.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT || 5050;
const URI = process.env.ATLAS_URI;

const app = express();

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Connect to MongoDB with Mongoose
mongoose
  .connect(URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  })
  .then(() => console.log("✅ Mongoose connected to MongoDB"))
  .catch((err) => {
    console.error("❌ Mongoose connection error:", err);
    process.exit(1);
  });

// Monitor connection events
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected!");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Routes
app.get("/", (req, res) => res.send("API is running..."));
app.get("/api/test", (req, res) => {
  console.log("✅ Test endpoint hit!");
  res.json({ message: "Backend is working!", timestamp: new Date() });
});
app.use("/record", records);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
