const Conversation = require("../models/ConversationModel");

const fetchConversation = async (req, res) => {
  try {
    const findConvo = await Conversation.find({
      $or: [
        {
          member1: req.body.member1,
          member2: req.body.member2,
        },
        {
          member1: req.body.member2,
          member2: req.body.member1,
        },
      ],
    });
    if (findConvo.length === 0) {
      const createConvo = new Conversation(req.body);
      const saveConvo = await createConvo.save();
      res.status(201).send({
        status: "success",
        data: createConvo,
      });
    } else {
      res.status(201).send({
        status: "already exist",
        data: findConvo,
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "failed",
    });
  }
};

module.exports = { fetchConversation };
