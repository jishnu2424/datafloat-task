import React, { useState } from "react";
import { useIndexedDB } from "react-indexed-db-hook";
import { useNavigate } from "react-router-dom";
import "../Styles/register.css";
import { Button } from "react-bootstrap";

function Register() {
  const { add } = useIndexedDB("users");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Active");
  const navigate = useNavigate();

  const handleRegister = () => {
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }
  
    if (!passwordPattern.test(password)) {
      alert("Password must be at least 8 characters long, contain at least one number, and one special character.");
      return;
    }
  
    add({ username, password, status, previousLogins: [] }).then(() => {
      alert("User Registered Successfully");
      setUsername("");
      setPassword("");
    });
    navigate("/");
  };
  
  return (
    <>
      <div style={{ backgroundColor: "black", height: "730px" }}>
        <h1 className="rlh1">Register your account</h1>

        <form className="regform">
          <label htmlFor="username" className="rl1">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            className="reginput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <label htmlFor="password" className="rl1">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="reginput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button className="regbtn" onClick={handleRegister}>
            Register
          </Button>
        </form>
      </div>
    </>
  );
}

export default Register;
