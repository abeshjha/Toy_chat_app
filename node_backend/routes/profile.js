var express = require('express');
var router = express.Router();
const User = require("../models/User");

router.get('/', function (req, res, next) {
	console.log("profile");
	console.log(req.session.userId);
	User.findOne({username:req.session.userId},function(err,data){
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			return res.render('profile.ejs', {"username":data.username,"password":data.password});
		}
	});
});

module.exports = router;