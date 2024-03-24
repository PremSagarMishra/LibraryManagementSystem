import React from 'react'
import "./style.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const Studentlogin:React.FC = () => {
  return (<div className='form'>

    <h1>Student <span>Login</span></h1>
    <TextField className='input' id="outlined-basic" label="Register No" variant="outlined" />
    <TextField type='password' className='input' id="outlined-basic" label="Password" variant="outlined" />
    <Button type='submit' variant="contained" color="success">LogIn</Button>
    <p>Not registered? <span style={{color:"red"}}>Signup</span></p>
  </div>
  )
}
const Studentsignup:React.FC = () => {
    return (<div>

    <h1>Student <span>SignUp</span></h1>
    <TextField className='input' id="outlined-basic" label="Register No" variant="outlined" />
    <TextField type='password' className='input' id="outlined-basic" label="Password" variant="outlined" />
    <Button type='submit' variant="contained" color="success">LogIn</Button>
    <p>Not registered? <span style={{color:"red"}}>Signup</span></p>
    </div>
    )
  }

export {Studentlogin,Studentsignup}