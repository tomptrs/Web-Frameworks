var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mytwitter",function(){
	console.log("connected with MongoDB");
});

module.exports = mongoose;
