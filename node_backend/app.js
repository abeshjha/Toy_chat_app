
var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
var path = require("path");
var session = require('express-session');
//paths for apis

const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const chatRoute = require("./routes/chats");
const messageRoute = require("./routes/messages");
const uploadRoute = require("./routes/upload");
const roomRoute = require("./routes/rooms");


mongoose.connect('mongodb://localhost:27017/chat_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

var app=express()
app.use(session({
	secret: 'toy chat app',
	resave: true,
	saveUninitialized: false,
  }));
app.set('views', path.join(__dirname, 'uploads'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/rooms', roomRoute);
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 5000;
	app.listen(PORT, function () {
	  console.log('Server is started on http://127.0.0.1:'+PORT);
	});
	
