"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
router.post("/signup", userController.signup);
router.post("/login", userController.login);
module.exports = router;
//# sourceMappingURL=user-routes.js.map