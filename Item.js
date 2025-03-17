const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    imageUrl: String,
    type: { type: String, enum: ["lost", "found"] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);
