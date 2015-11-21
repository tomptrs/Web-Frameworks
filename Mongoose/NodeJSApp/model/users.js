var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/nodeApp");

var userSchema = new mongoose.Schema(
    {
       
        voornaam: {
            type: String,
            required:true
        },
        naam: {
            type: String,
            required:true
        }
    });


//Maak een model om het schema te kunnen gebruiken
var User = mongoose.model('User', userSchema);

module.exports = User;