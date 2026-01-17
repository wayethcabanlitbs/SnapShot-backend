// server/routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// POST /api/orders  → create new order
router.post("/", async (req, res) => {
  try {
    console.log("📨 Order request received:", JSON.stringify(req.body, null, 2));
    
    const { items, total, name, email, address, phone } = req.body;

    if (!items || !items.length) {
      console.error("❌ Items validation failed");
      return res.status(400).json({ error: "Cart items are required" });
    }

    console.log("✅ Validation passed, creating order...");
    const order = await Order.create({
      items,
      total,
      name,
      email,
      address,
      phone,
    });

    console.log("✅ Order created successfully:", order._id);
    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Error creating order:", err.message);
    console.error("Stack trace:", err.stack);
    res.status(500).json({ error: "Failed to create order", details: err.message });
  }
});

// (Optional) GET /api/orders  → list all orders (for testing)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;
