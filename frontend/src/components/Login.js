import React, { useState } from 'react';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    const basicToken = btoa(username + ':' + password);

    try {
      const res = await fetch('http://localhost:8081/api/invoices', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${basicToken}`
        }
      });

      if (res.ok) {
        localStorage.setItem('token', basicToken);
        setToken(basicToken);
      } else if (res.status === 401) {
        alert('Invalid credentials. Try admin/adminpass or merchant/merchant or viewer/viewer');
      } else {
        alert('Unexpected error: ' + res.status);
      }

    } catch (err) {
      alert('Backend not reachable. Make sure backend is running on port 8081.');
    }
  };

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
      <div style={{width:360, padding:24, background:'#fff', borderRadius:8, boxShadow:'0 6px 18px rgba(0,0,0,0.08)'}}>
        <h2 style={{marginBottom:12}}>PayFlow Pro — Login</h2>
        <form onSubmit={submit}>
          <div style={{marginBottom:8}}>
            <input placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} style={{width:'100%', padding:10}}/>
          </div>
          <div style={{marginBottom:12}}>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:'100%', padding:10}}/>
          </div>
          <button className="button btn-primary" type="submit" style={{width:'100%'}}>Login</button>
        </form>
        <p style={{fontSize:12, marginTop:12}}>
          Demo users:<br/>
          admin/adminpass<br/>
          merchant/merchant<br/>
          viewer/viewer
        </p>
      </div>
    </div>
  );
}

export default Login;
