// server/routes/cartRoutes.js
import express from "express";
import mongoose from "mongoose";
import Cart from "../models/cart.js";

const router = express.Router();

// GET all cart items
router.get("/", async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// POST new item
router.post("/", async (req, res) => {
  try {
    const item = new Cart(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: "Failed to add item" });
  }
});

// DELETE item by ID
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete item" });
  }
});

export default router;
