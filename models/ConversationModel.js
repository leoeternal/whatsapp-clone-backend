const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  member1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  member2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
