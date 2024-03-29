import { TextField,Button } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import React from "react"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StudentSignup = () => {
    const [course, setCourse] = React.useState('Select Course');

    const handleChange = (event) => {
        setCourse(event.target.value)
    };
  return (
    <div className="container">
        <div className="card">
            <h1 style={{fontSize:"44px",textAlign:"center",marginBottom:"20px"}}>Student <span style={{color:"green"}}>Signup</span></h1>
        <TextField id="outlined-basic" label="Register No" variant="outlined" />
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <FormControl sx={{ m: 0, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={course}
          label="Course"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="BCA">BCA</MenuItem>
          <MenuItem value="BBA">BBA</MenuItem>
          <MenuItem value="Bcom">Bcom</MenuItem>
        </Select>
      </FormControl>
      <TextField id="outlined-basic" label="Year of admission"  type='number' variant="outlined" />
        <TextField id="outlined-basic" label="Password"  type='password' variant="outlined" />
        
        <Button className="login"
 variant="outlined" color="success">
          Signup
        </Button>
        </div>
    </div>
  )
}

export default StudentSignup



