import "./header.css";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
export default function Header() {

  const {user} = useContext(AuthContext);
  //console.log(user)


  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Welcome {user?.username}</span>
        </Link>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
        <Link to="/messanger" style={{ textDecoration: "none" }}>
          <span className="topbarLink">Home</span>
          </Link>
        <Link to="/chatHistory" style={{ textDecoration: "none" }}>
          <span className="topbarLink">Chat History</span>
          </Link>
          <Link to="/chatRoom" style={{ textDecoration: "none" }}>
          <span className="topbarLink">Chat Room</span>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
          <span className="topbarLink">Logout</span>
          </Link>
        </div>


      </div>
    </div>
  );
}
