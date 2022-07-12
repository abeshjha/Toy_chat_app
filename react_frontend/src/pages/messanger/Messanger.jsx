//rfc
import React from 'react'
import './messanger.css'
import Header from "../../components/header/Header"
import Message from '../../components/message/message'
import Online from '../../components/online/Online'
import { AuthContext } from '../../context/AuthContext'
import { useContext,useEffect ,useState,useRef} from 'react'
import io from "socket.io-client";
import axios from "axios";
import Dropzone from 'react-dropzone';



export default function Messanger() {

  const [onlineFriends, setonlineFriends] = useState([]);
  const [currentBoxDisplay, setcurrentBoxDisplay] = useState(null);
  const [messages, setText] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketMessage, setsocketMessage] = useState(null);
  const socket = useRef();
  const {user} = useContext(AuthContext);
 
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setsocketMessage({
       sender:data.sender,
        text: data.text,
        receiver:user.username,
      });
    });
  }, [user.username]);

  useEffect(() => {
    console.log(socketMessage)

    socketMessage &&
      currentBoxDisplay?.userId.includes(socketMessage.sender) &&
      setText([...messages, socketMessage]);
  }, [socketMessage, currentBoxDisplay]);


  useEffect(() => {
    console.log(socket);
        socket.current.emit("addUser",user.username);
        socket.current.on("getUsers",online_users=>{
        setonlineFriends(online_users);
     })
  }, [user]);  
     
 const handleDrop = async (files) => {
    console.log(files)
    const formData = new FormData();

      const config = {
          header: { 'content-type': 'multipart/form-data' }
      }

      formData.append("file", files[0])

      try {
        const res = await axios.post('/upload/', formData, config);
          if(res){
                  console.log("file upload success")
                  const file_name = res.data;
                      const file_message = {
                        sender: user.username,
                        text: file_name,
                        receiver : currentBoxDisplay.userId,
                      
                      };

                      try {
                        const res = await axios.post("/messages", file_message);
                        setText([...messages, res.data]);
                        setNewMessage("");
                      } catch (err) {
                        console.log(err);
                      }

                      socket.current.emit("sendMessage", {
                        sender: user.username,
                        text: file_name,
                        receiver : currentBoxDisplay.userId,});

                  
          }
      } catch (err) {
        console.log(err);
      }

 
}
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        
        const message = {
          sender: user.username,
          text: newMessage,
          receiver : currentBoxDisplay.userId,
         
        };
        const convo ={
          sender: user.username,
          receiver : currentBoxDisplay.userId,
        }
        
        socket.current.emit("sendMessage", {
          sender: user.username,
          text: newMessage,
          receiver : currentBoxDisplay.userId,});
    
        try {
          const res = await axios.post("/messages", message);
          setText([...messages, res.data]);
          setNewMessage("");
        } catch (err) {
          console.log("the messages could not be fetched");
        }
        try {
          const res = await axios.post("/chats/", convo);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        const getMessages = async () => {
          try {
            const  receiver = currentBoxDisplay?.userId;
            console.log(receiver)
            console.log(user.username)
            const sender = user.username;
            const res = await axios.get("/messages/" +sender+"/" +receiver);
            console.log(res.data);
            setText(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currentBoxDisplay,user?.username]);  
      
    return (
        <>
        <Header/>
        <div className="messanger" style={{border:none}}>
            <div className="chatOnline" style={{border:none}}>
                <div className="chatMenuFrame" style={{border:none}}>
                {onlineFriends.map((o) => (
                    <div onClick={() => setcurrentBoxDisplay(o)}>
                      <Online friend={o.userId} />
                    </div>
                  ))}
                </div> 
            </div>

            <div className="chatBox" style={{border:none}}>
          <div className="chatBoxWrapper" style={{border:none}}>
            {currentBoxDisplay ? (
              <>
                <div className="chatBoxTop" style={{border:none}}>
                  {messages?.map((m) => (
                      <Message message={m} own={m?.sender === user.username} />
                  ))}
                </div>
                <div className="chatBoxBottom" style={{border:none}}>
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                   onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                 <Dropzone onDrop={handleDrop}>
                      {({getRootProps, getInputProps}) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <button className="chatSubmitButton">
                                File Upload
                            </button >
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  <button className="chatSubmitButton" style={{border:none}} onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noSelectedText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>

         
        </div>
        </>
    )
}
