import Conversation from '../../components/conversation/Conversation'
import Header from '../../components/header/Header'
import Message from '../../components/message/message';
import './chatHistory.css'
import axios from "axios";
import { useState,useContext,useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext'

export default function ChatHistory() {
    const {user} = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);

//To fetch the list of conversations of the given user
    useEffect(() => {
        const getConversations = async () => {
          try {
            const res = await axios.get("/chats/" + user.username);
          console.log(res.data);
           setConversations(res.data);
          } catch (err) {
              console.log("no value found");
            console.log(err);
          }
        };
        getConversations();
      }, [user?.username]);

//To fetch the list of messages from the clicked conversation
      useEffect(() => {
        const getMessages = async () => {
          try {
            const  receiver = currentChat.receiver;
            const sender = user.username;
            const res = await axios.get("/messages/" +sender+"/" +receiver);
            console.log(res.data);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currentChat,user?.username]);  

    return (
            <>
            <Header/>
              <div className="chatHistory">
                  <div className="chatMenu">
                    <div className="chatMenuFrame">
                        Chat history
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                              <Conversation conversation={c} />
                           </div>
                          ))}
                        
                    </div>
                    </div>
                    <div className="messageMenu">
                        <div className="messageFrame">
                          {currentChat ? (
                                  <>
                                      {messages.map((m) => (
                                      
                                          <Message message={m} own={m.sender === user.username} />

                                      ))}

                                  </>
                                ) : (
                                  <span className="noConversationText">
                                    Select a conversation for chat history.
                                  </span>
                                )}
                        </div>
                              
                    </div>
                </div>
              
        </>
    )
}
