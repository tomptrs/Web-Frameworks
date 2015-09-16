
var model = require("../Model/Message");
var router = require("express").Router();


router.get("/api/posts",function(req,res){
	console.log("get posts");
			
		model.find(function(err,posts){
			if(err){return next(err);}
			res.json(posts);
		});
	
});

router.post("/api/posts",function(req,res){
	console.log("post bericht ontvangen");
	console.log(req.body.username);
	console.log(req.body.body);
	
	
	var bericht = new model({
		username: req.body.username,
		body: req.body.body
	});
	
	bericht.save(function(err){
		if(err){return next(err);}
		res.json(201,bericht);
		console.log("saved");
	});
});


module.exports = router;