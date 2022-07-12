import "./login.css"
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import {useContext,useRef, useState} from "react";
import axios from "axios";



export default function Login() {
  const username = useRef();
  const password = useRef();  
  const [error, setError] = useState(false);
  const { user,dispatch } = useContext(AuthContext);

   const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/login/", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      <span>Username or Password mismatch</span>
    }
  };

  const HandleSubmitClicked = async (e) => {
    e.preventDefault();
    setError(false);
    loginCall({ username: username.current.value, password: password.current.value }, dispatch );
    
  };
  console.log(user);
    return (
        <div >
            <h1>Toy Chat Application by Abesh</h1>
        <div className="login">   
              <form  onSubmit={HandleSubmitClicked}>
              <label><b>User Name  </b></label>     
              <input type="text" name="username" id="Uname" ref={username} placeholder="Username"/> 
             
              <label><b>Password </b> </label>  
              <input type="password" name="password" id="Pass" ref={password} placeholder="Password"/> 
                
              <input type="submit" name="login" id="log" value="Login"/>

              <center><Link to = "/register">Not a user yet? Register Here </Link></center>
              </form>
        </div>
        {error && <span style={{color:"red",marginTop:"20px"}}> <center>Username or passowrd doesn't match</center></span>}
        </div>
      );
}
