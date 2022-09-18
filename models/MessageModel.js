const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
  },
  messageSuccess: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
