"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0, required: true },
    dislikes: { type: Number, default: 0, required: true },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
});
// TODO add like method
// TODO add dislike method
module.exports = mongoose.model("Sauce", sauceSchema);
//# sourceMappingURL=sauce-model.js.map