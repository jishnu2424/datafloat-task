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
          <>
             <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
            <Route path="/userlist" element={<Userlist />} />
          </>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
