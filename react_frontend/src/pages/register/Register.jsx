
import React from './register.css'
import axios from "axios";
import {useRef,useState} from "react";

export default function Register() {
  const username = useRef();
  const password = useRef();  
  const [error, setError] = useState(false);

  const HandleSubmitClicked = async (e) => {
    e.preventDefault();
    setError(false);
      const User = {
        username: username.current.value,
        password: password.current.value,
      };
      try {
         await axios.post("/register/", User);
        window.location.replace("/");
      } catch (err) {
        setError(true);
        console.log(err);
      }
    
  };
    return (
        <div >
            <h1>Register Page</h1>
        <div className="login">   
              <form  onSubmit={HandleSubmitClicked}>
              <label><b>User Name  </b></label>     
              <input type="text" name="username" id="Uname" ref={username} placeholder="Username"/> 
             
              <label><b>Password </b> </label>  
              <input type="password" name="password" id="Pass" ref={password}  placeholder="Password"/> 
                
              <input type="submit" name="login" id="log" value="Register"/> 
               
              </form>
        </div>
        {error && <span style={{color:"red",marginTop:"20px"}}> <center>Username already registered</center></span>}
        </div>
      );
}
