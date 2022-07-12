const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    },
});

let users = [];

const addUser = (userId, socketId) => {
  if ((users.some((item) => item.userId === userId)==false)){
    users.push({ userId, socketId });
  }
    
};



io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
    console.log(users);
  });

   //send and get message
   socket.on("sendMessage", ({ sender, receiver, text }) => {
    const friend = users.find((item) => item.userId === receiver);
    console.log(sender)
    console.log(friend)
    console.log(text)
    io.to(friend.socketId).emit("getMessage", {
      sender,
      text,
    });
  });

  socket.on("sendRoom", ({text,receiver }) => {
    io.emit("getRoom", {
      text,
      receiver,
    });
  });
  
    //when disconnect
    socket.on("disconnect", () => {
        users.filter((item) => item.socketId !== socket.id);
        io.emit("getUsers", users);
       
      });


});
