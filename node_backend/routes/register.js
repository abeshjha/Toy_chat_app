var express = require('express');
var router = express.Router();
const User = require("../models/User");

router.post('/', function(req,res){
    try {
        User.findOne({username:req.body.username},function(err,data){
			if(data){
				console.log("Already registerd");
				res.status(400).json(" Username already regestered!");
			}else{
                var username = req.body.username;
                var password =req.body.password;
              
                var newPerson = new User({
                    "username": username,
                    "password":password,
                });
            
                const user = newPerson.save(function(err, Person){
                    if(err)
                        console.log(err);
                    else
                        console.log('Success! User Registered');
                        res.status(200).json(user)
                });
			}
		});

    } catch (error) {
        res.status(500).json(err)

    }

          
    
})

module.exports = router;