// routes/telegram.route.js
const express = require("express");
const router = express.Router();
const telegramController = require("../controllers/telegram.controller");

// POST /telegram
router.post("/", telegramController.sendMessage);

module.exports = router;
