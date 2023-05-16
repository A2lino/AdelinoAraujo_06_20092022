"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
// we pass the userSchema to mongoose unique validator to handle errors
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
//# sourceMappingURL=user-model.js.map