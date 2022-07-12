import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Messanger from "./pages/messanger/Messanger";
import ChatHistory from "./pages/chatHistory/ChatHistory";
import ChatRoom from "./pages/chatRoom/ChatRoom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter , Route, Routes } from 'react-router-dom';

import React from 'react';
function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
    <Routes>

    <Route path="/" element={user ? <Messanger /> : <Login/>} />
  
    <Route path="/register" element={<Register />} />

    <Route path="/profile" element={<Profile />} />

    <Route path="/messanger" element={<Messanger />} />

    <Route path="/chatHistory" element={<ChatHistory />} />

    <Route path="/chatRoom" element={<ChatRoom />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
