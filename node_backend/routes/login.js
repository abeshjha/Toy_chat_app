var express = require('express');
var router = express.Router();
const User = require("../models/User");


router.post('/', function (req, res, next) {
	try {
		User.findOne({username:req.body.username},function(err,data){
			if(data){
				
				if(data.password==req.body.password){
					req.session.userId = data.username;
					console.log("Login Success");
					console.log(data);
					res.status(200).json(data)
				}else{
					console.log("Wrong password");
					res.status(400).json("wrong password!!");
				//	res.send({"Success":"Wrong password!"});
				}
			}else{
				console.log("Email not registerd");
				res.status(400).json("This Email Is not regestered!");
				//res.send({"Success":"This Email Is not regestered!"});
			}
		});
	} catch (error) {
		res.status(500).json(err)

	}

});



router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});
module.exports = router;