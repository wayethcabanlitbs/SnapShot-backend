import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact → create new contact message
router.post("/", async (req, res) => {
  try {
    console.log("📨 [CONTACT] POST request received");
    console.log("📨 [CONTACT] Body:", JSON.stringify(req.body, null, 2));
    
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !phone || !subject || !message) {
      console.error("❌ [CONTACT] Validation failed: missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    console.log("✅ [CONTACT] Validation passed, creating contact message...");
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    console.log("✅ [CONTACT] Message saved successfully:", contact._id);
    res.status(201).json({ message: "Message sent successfully", contact });
  } catch (err) {
    console.error("❌ [CONTACT] Error creating contact message:", err.message);
    console.error("❌ [CONTACT] Stack trace:", err.stack);
    res.status(500).json({ error: "Failed to send message", details: err.message });
  }
});

// GET /api/contact → list all contact messages (for admin purposes)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
