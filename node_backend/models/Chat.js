var mongoose = require('mongoose');
var Schema = mongoose.Schema;

chatSchema = new Schema( {
	receiver: {
		type: String,
	  },
	  sender: {
		type: String,
	  },

}),
Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;