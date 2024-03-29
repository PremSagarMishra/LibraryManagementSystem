import { TextField,Button } from "@mui/material"


const AdminSignup = () => {
  return (
    <div className="container">
        <div className="card">
            <h1 style={{fontSize:"44px",textAlign:"center",marginBottom:"20px"}}>Student <span style={{color:"green"}}>Signup</span></h1>
        <TextField id="outlined-basic" label="Username" variant="outlined" />
        <TextField id="outlined-basic" label="Name" variant="outlined" />

      <TextField id="outlined-basic" label="Date of Joining"  type='date' variant="outlined" />
        <TextField id="outlined-basic" label="Password"  type='password' variant="outlined" />
        
        <Button className="login"
 variant="outlined" color="success">
          Signup
        </Button>
        </div>
    </div>
  )
}

export default AdminSignup