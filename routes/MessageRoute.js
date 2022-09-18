const express = require("express");
const router = express.Router();

const {
  fetchMessage,
  createMessage,
} = require("../controllers/MessageController");

router.get("/message/:convoId", fetchMessage);
router.post("/message", createMessage);

module.exports = router;
