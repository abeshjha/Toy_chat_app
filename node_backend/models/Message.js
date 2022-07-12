var mongoose = require('mongoose');
var Schema = mongoose.Schema;

messageSchema = new Schema( {
    receiver: {
		type: String,
	  },
	  sender: {
		type: String,
	  },
	  text: {
		type: String,
	  },
}),
Message = mongoose.model('Message', messageSchema);

module.exports = Message;