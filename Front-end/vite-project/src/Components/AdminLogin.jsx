
import { TextField,Button } from '@mui/material'

const AdminLogin = () => {
  return (
    <div className="container">
        <div className="card">
        <h1 style={{fontSize:"44px",textAlign:"center",marginBottom:"20px"}}>Admin <span style={{color:"green"}}>Login</span></h1>
        <TextField id="outlined-basic" label="Username" variant="outlined" />
        <TextField id="outlined-basic" label="Password"  type='password' variant="outlined" />
        <Button 
 variant="contained" color="success">
          Login
        </Button>
        </div>
    </div>
  )
}

export default AdminLogin