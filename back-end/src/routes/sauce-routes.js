"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorize");
const multer = require("../middleware/multer-config");
const sauceController = require("../controllers/sauce-controller");
router.get("/", auth, sauceController.getAllSauces);
router.get("/:id", auth, sauceController.getSingleSauce);
router.post("/", auth, multer, sauceController.createSauce);
router.put("/:id", auth, multer, sauceController.updateSauce);
router.delete("/:id", auth, sauceController.deleteSauce);
router.post("/:id/like", auth, sauceController.likeSauce);
module.exports = router;
//# sourceMappingURL=sauce-routes.js.map