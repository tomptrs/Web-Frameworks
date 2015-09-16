var db  = require("../db");

var Schema = db.Schema;

var berichtSchema = new Schema( {
	 username: String,
	 body: String,
 	created_at: Date

});

//Maak een model om het schema te kunnen gebruiken
var Bericht = db.model('messages', berichtSchema);

module.exports = Bericht;