const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const Conversation = require("../models/ConversationModel");
const moment = require("moment");

const fetchMessage = async (req, res) => {
  try {
    const getMessages = await Message.find({
      conversationId: req.params.convoId,
    }).populate({
      path: "conversationId",
      populate: [
        {
          path: "member1",
        },
        {
          path: "member2",
        },
      ],
    });
    res.status(201).send({
      status: "success",
      data: getMessages,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
    });
  }
};

const createMessage = async (req, res) => {
  try {
    const messageCreated = new Message(req.body);
    messageCreated.messageSuccess = true;
    messageCreated.date = moment().toString();
    const messageSaved = await messageCreated.save();
    res.status(201).send({
      status: "success",
      data: messageCreated,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
    });
  }
};

module.exports = { fetchMessage, createMessage };
