import React, { useState, useEffect } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../Styles/login.css';

function Login({ setAuthenticated }) {

  const { getAll, update } = useIndexedDB('users');  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userPreviousLogins, setUserPreviousLogins] = useState([]); 
  const navigate = useNavigate();

  const handleLogin = () => {
    getAll().then((users) => {
      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        if (user.status === 'Blocked') {
          alert('Your account is blocked. Please contact support.');
        } else {
          setAuthenticated(true);
          alert('Login Successful');

          const currentTimestamp = new Date().toISOString();
          const updatedPreviousLogins = user.previousLogins ? [...user.previousLogins, currentTimestamp] : [currentTimestamp];

          const updatedUser = { ...user, previousLogins: updatedPreviousLogins };
          update(updatedUser).then(() => {
            setUserPreviousLogins(updatedPreviousLogins);
          });

          navigate('/userlist');
        }
      } else {
        alert('Invalid Credentials');
      }
    });
  };

  return (
    <>
      <div style={{ backgroundColor: "black", height: "930px" }}>
        <h1 className='llh1'>Login to your account</h1>

        <form className='loginform'>
          <label htmlFor="username" className='ll1'>Username</label>
          <input type="text" placeholder='Username' className='logininput' value={username}
            onChange={(e) => setUsername(e.target.value)} /><br />
          
          <label htmlFor="password" className='ll1'>Password</label>
          <input type="password" placeholder='Password' className='logininput' value={password}
            onChange={(e) => setPassword(e.target.value)} /><br /><br />
          
          <Button className='loginbtn' onClick={handleLogin}>Login</Button><br />
          
          <h3>New User</h3><br />
          <Link to={'/register'}><Button className='loginbtn'>Register</Button></Link>
        </form>

        {userPreviousLogins.length > 0 && (
          <div className="previous-logins" style={{color:"white",backgroundColor:"wheat"}}>
            <h3 >Previous Login Timestamps:</h3>
            <ul>
              {userPreviousLogins.map((login, index) => (
                <li key={index}>{new Date(login).toLocaleString()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
