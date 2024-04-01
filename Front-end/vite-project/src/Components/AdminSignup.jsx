import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router';

const AdminSignup = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [doj, setDoj] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, name, doj, password })
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.text(); // Assuming the response is a plain text message
      alert(data); // Show response message in an alert
      
      // Clear form fields after successful signup
      const [type,message]=data.split(" ")
      if(type=="Error"){
        alert(type+":"+message)
        return;
      }
      
      setUsername('');
      setName('');
      setDoj('');
      setPassword('');
      navigate("/admin/login")
    } catch (error) {
      console.error('Signup failed:', error.message);
      // Handle signup failure, show error message, etc.
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ fontSize: "44px", textAlign: "center", marginBottom: "20px" }}>Admin <span style={{ color: "green" }}>Signup</span></h1>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="doj"
          label="Date of Joining"
          type='date'
          variant="outlined"
          value={doj}
          onChange={(e) => setDoj(e.target.value)}
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
          onClick={handleSignup}
        >
          Signup
        </Button>
      </div>
    </div>
  );
};

export default AdminSignup;
