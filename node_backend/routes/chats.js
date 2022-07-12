var express = require('express');
var router = express.Router();
const Chat = require("../models/Chat");



router.post("/", async (req, res) => {

	try {
	const conversation = await Chat.find({
			$and: [{sender: req.body.sender}, {receiver: req.body.receiver}] },
			);		

		if(conversation.length > 0){
			res.status(500).json("coversation already exists");
		}
		else{
			var newConversation = new Chat({
				"sender": req.body.sender,
				"receiver":req.body.receiver,
			});
			console.log(newConversation);
			const savedConversation = await newConversation.save();
			console.log("new conversation added");
			res.status(200).json(savedConversation);
		}

	} catch (err) {
	  res.status(500).json(err);
	}
  });
  
  //get conv of a user
  
  router.get("/:userId", async (req, res) => {
	try {
	  const conversation = await Chat.find({
		sender: req.params.userId,
	  });
	  console.log(conversation);
	  res.status(200).json(conversation);
	} catch (err) {
	  res.status(500).json(err);
	}
  });




module.exports = router;