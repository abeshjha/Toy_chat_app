var mongoose = require('mongoose');
var Schema = mongoose.Schema;

roomSchema = new Schema( {
	name: String,
	created_by: String,

}),
Room = mongoose.model('Room', roomSchema);

module.exports = Room;