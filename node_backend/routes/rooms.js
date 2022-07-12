var express = require('express');
var router = express.Router();
const Room = require("../models/Room");

router.post("/", async (req, res) => {
	try {
			var newRoom = new Room({
				"name": req.body.name,
				"created_by": req.body.creator,
			});
		
			const savedRoom = await newRoom.save();
			console.log("new chat room created");
			res.status(200).json(savedRoom);

	} catch (err) {
	  res.status(500).json(err);
	}
  });
  
  //get all rooms
  
  router.get("/", async (req, res) => {
	try {
	  const room = await Room.find();
	  console.log(room);
	  res.status(200).json(room);
	} catch (err) {
	  res.status(500).json(err);
	}
  });




module.exports = router;