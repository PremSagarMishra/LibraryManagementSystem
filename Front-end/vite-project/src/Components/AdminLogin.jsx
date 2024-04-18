import { useContext, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { UserContext } from '../App';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const {loggedIn,setLoggedIn,setRole}=useContext(UserContext)

  if(loggedIn==true){
    navigate("/home")
  }

  const handleLogin = async () => {

    
    try {
      const response = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.text(); // Assuming the response is in the format 'admin <role> <key>'
      const [role, key] = data.split(' '); // Split the response by space

      if(role=='Error'){
        alert(data)
        setUsername('')
        setPassword('')
        return;
      }
      

      // Store role and key in localStorage
      localStorage.setItem('role', role);
      localStorage.setItem('key', key);

      setLoggedIn(true)
      setRole("admin")
      

      // Continue with further processing if needed, e.g., redirect to another page
      setUsername('')
      setPassword('')
      navigate("/home")
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login failure, show error message, etc.
      setUsername('')
      setPassword('')
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ fontSize: "44px", textAlign: "center", marginBottom: "20px" }}>Admin <span style={{ color: "green" }}>Login</span></h1>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type='password'
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleLogin}
        >
          Login
        </Button>
        <br />
        <p style={{textAlign:"center"}}>New here? <span style={{color:"green"}} onClick={()=>{navigate("/admin/signup")}}>Signup</span></p>
      </div>
    </div>
  );
};

export default AdminLogin;
