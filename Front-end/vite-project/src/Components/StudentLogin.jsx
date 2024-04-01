import { useState ,useContext} from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { UserContext } from '../App';

const StudentLogin = () => {
  const [registerno, setRegisterno] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {loggedIn,setLoggedIn,setRole}=useContext(UserContext)
  if(loggedIn==true){
    navigate("/")
  }
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ registerno, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.text();

      const [role, key] = data.split(" ");
      if (role=== "Error") {
        alert(role + ":" + key);
        return;
      }

      // Store role and key in localStorage
      localStorage.setItem('role', role);
      localStorage.setItem('key', key);
      setLoggedIn(true)
      setRole("student")

      // Redirect to some other page upon successful login
      navigate("/home");
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ fontSize: "44px", textAlign: "center", marginBottom: "20px" }}>Student <span style={{ color: "green" }}>Login</span></h1>
        <TextField
          id="registerno"
          label="Register No"
          variant="outlined"
          value={registerno}
          onChange={(e) => setRegisterno(e.target.value)}
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
      </div>
    </div>
  );
};

export default StudentLogin;
