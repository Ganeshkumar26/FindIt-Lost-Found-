const express = require("express");
const multer = require("multer");
const Item = require("../models/Item");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // File upload

// Report Lost Item
router.post("/lost", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        const { name, description, location } = req.body;
        const item = new Item({ 
            name, 
            description, 
            location, 
            type: "lost", 
            userId: req.user.userId,
            imageUrl: req.file ? req.file.path : "" 
        });
        await item.save();
        res.json({ message: "Lost item reported" });
    } catch (error) {
        res.status(500).json({ error: "Failed to report lost item" });
    }
});

// Report Found Item
router.post("/found", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        const { name, description, location } = req.body;
        const item = new Item({ 
            name, 
            description, 
            location, 
            type: "found", 
            userId: req.user.userId,
            imageUrl: req.file ? req.file.path : "" 
        });
        await item.save();
        res.json({ message: "Found item reported" });
    } catch (error) {
        res.status(500).json({ error: "Failed to report found item" });
    }
});

// Get All Items
router.get("/", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items" });
    }
});

module.exports = router;
