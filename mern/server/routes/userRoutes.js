import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Admin verification middleware
const verifyAdmin = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"];
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: "Error verifying admin status" });
  }
};

// Sign Up Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Please provide name, email, and password",
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: "User already exists with this email",
      });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      phone,
    });

    await user.save();

    // Return user data (without password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    console.log("✅ [SIGNUP] User registered successfully:", email);
    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (err) {
    console.error("❌ [SIGNUP] Error:", err.message);
    res.status(500).json({
      error: err.message || "Error creating user",
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: "Please provide email and password",
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    // Return user data (without password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
    };

    console.log("✅ [LOGIN] User logged in successfully:", email);
    res.status(200).json({
      message: "Login successful",
      user: userResponse,
    });
  } catch (err) {
    console.error("❌ [LOGIN] Error:", err.message);
    res.status(500).json({
      error: err.message || "Error logging in",
    });
  }
});

// Get user profile by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ [GET USER] Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ===== ADMIN ROUTES =====

// Get all users (admin only)
router.get("/admin/users-list", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    console.log("✅ [GET ALL USERS] Retrieved", users.length, "users");
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ [GET ALL USERS] Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Toggle admin status for a user (admin only)
router.put("/admin/users/:id/toggle-admin", verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isAdmin = !user.isAdmin;
    await user.save();

    console.log("✅ [TOGGLE ADMIN] User", user.email, "admin status:", user.isAdmin);
    res.status(200).json({
      message: "Admin status updated",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("❌ [TOGGLE ADMIN] Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete a user (admin only)
router.delete("/admin/users/:id", verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ [DELETE USER] Deleted user:", user.email);
    res.status(200).json({
      message: "User deleted successfully",
      user: user,
    });
  } catch (err) {
    console.error("❌ [DELETE USER] Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
