
import TextField from '@mui/material/TextField';

import Button from "@mui/material/Button";
const StudentLogin = () => {

    
  return (
    <div className="container">
        <div className="card">
        <h1 style={{fontSize:"44px",textAlign:"center",marginBottom:"20px"}}>Student <span style={{color:"green"}}>Login</span></h1>
        <TextField id="outlined-basic" label="Register No" variant="outlined" />
        <TextField id="outlined-basic" label="Password"  type='password' variant="outlined" />
        <Button 
 variant="contained" color="success">
          Login
        </Button>
        </div>
    </div>
  )
}

export default StudentLogin