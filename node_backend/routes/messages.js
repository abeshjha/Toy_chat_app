const router = require("express").Router();
const Message = require("../models/Message");

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:sender/:receiver", async (req, res) => {
  try {
    
    console.log(req.params.sender);
    console.log(req.params.receiver);
    const messages = await Message.find({
      $and: [{sender: [req.params.sender,req.params.receiver]}, {receiver: [req.params.receiver,req.params.sender]}] },
      );
    console.log(messages);
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
