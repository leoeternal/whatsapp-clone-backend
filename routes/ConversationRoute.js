const express = require("express");
const router = express.Router();

const { fetchConversation } = require("../controllers/ConversationController");

router.post("/conversation", fetchConversation);

module.exports = router;
