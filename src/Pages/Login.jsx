import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  
  const handlelogin = async (e) => {
    e.preventDefault()
    try{
      const res = await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
      
    }catch(error){
        setErr(true)
      };
  };

  return (
    <div className="form__container">
      <div className="form__wrapper">
        <span className="logo">BSW Chat App</span>
        <span className="title">Login</span>
        <form onSubmit={handlelogin}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signup">Sign In</button>
          {err && <span className="error">Wrong username or password!</span>}
        </form>
        <p>Don't have an account? <Link to={"/register"}>Register</Link> </p>
      </div>
    </div>
  );
}
