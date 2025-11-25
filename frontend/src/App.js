import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App(){
  const [token, setToken] = useState(localStorage.getItem('token')||'');
  return (
    <div className="min-h-screen bg-gray-100">
      {token ? <Dashboard token={token} setToken={setToken}/> : <Login setToken={setToken}/>}
    </div>
  );
}

export default App;
