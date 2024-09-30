import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Components/Register';
import Userlist from './Components/Userlist';
import Login from './Components/Login';
import { useState } from 'react';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/userlist"
            element={authenticated ? <Userlist /> : <Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
