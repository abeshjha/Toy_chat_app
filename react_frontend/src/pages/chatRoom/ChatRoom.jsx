import Header from '../../components/header/Header'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'
import { useState,useContext,useEffect,useRef } from 'react';
import Room from '../../components/room/room';
import io from "socket.io-client";
import Message from '../../components/message/message';

export default function Chatroom() {
    const [room, setRoom] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentChat, setCurrentChat] = useState(null);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const {user} = useContext(AuthContext);
    const socket = useRef();

    useEffect(() => {
      socket.current = io("ws://localhost:8900");
    }, []);

    useEffect(()=>{
      socket.current.on("getRoom", (data) => {
        setArrivalMessage({
          text: data.text,
          receiver:data.receiver,
        });
      });
    },[]);

    useEffect(() => {
      console.log(arrivalMessage)
  
      arrivalMessage &&
        currentChat?.name.includes(arrivalMessage.receiver) &&
        setText([...messages, socketMessage]);
    }, [arrivalMessage, currentChat]);
    
    useEffect(() => {
        const getRooms = async () => {
          try {
            const res = await axios.get("/rooms/");
                console.log(res.data);
                setRoom(res.data);
          } catch (err) {
              console.log("no rooms found");
            console.log(err);
          }
        };
        getRooms();
      }, []);


      useEffect(() => {
        const getMessages = async () => {
          try {
            const  receiver = currentChat.name;
            const res = await axios.get("/messages/all/" + receiver);
            console.log(res.data);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currentChat,user?.username]);  


    const handleSubmit = async (e) => {
        e.preventDefault();
  
        const room_name = {name:user?.username + "_room",creator:user?.username }
        try {
            const res = await axios.post("/rooms/", room_name);
            console.log(res);
          } catch (err) {
            console.log(err);
          }

    };
    const handleMesageSubmit = async (e) => {
      e.preventDefault();

      const message = {
        sender: "all",
        text: user.username + ": " + newMessage,
        receiver : currentChat.name,
       
      };
      try {
        console.log(message);
        await axios.post("/messages", message);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
      socket.current.emit("sendRoom", {
        text:user.username + ": "+ newMessage,
        receiver : currentChat.name,
          });

   };


 
    return (
        <>
        <Header/>
        <div className="chatHistory">          
            <div className="chatMenu">
                <div className="chatMenuFrame">
                <button className="chatSubmitButton" onClick={handleSubmit}>
                        Create Room
                 </button>
                 {room?.map((r) => (
                            <div onClick={() => setCurrentChat(r)}>
                                      <Room room={r}  />
                            </div>
                                  ))}
                </div>
            </div>
            <div className="messageMenu">
                <div className="messageFrame">
                {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m) => (
                   // <div ref={scrollRef}>
                      <Message message={m} own={m?.sender === user.username} />
                   // </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                   onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleMesageSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                No chat rooms selected.
              </span>
            )}
            
                </div>
            </div>
        </div>
        </>
    )
}
