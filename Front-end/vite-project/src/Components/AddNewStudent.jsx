import { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
const AddNewStudent = () => {
    const [registerno, setRegisterno] = useState('');
    const [name, setName] = useState('');
    const [course, setCourse] = useState('Select Course');
    const [yearofadmission, setYearOfAdmission] = useState('');
    const [password, setPassword] = useState('');
  
    const handleChange = (event) => {
      setCourse(event.target.value);
    };
  
    const handleSignup = async () => {
        const key=localStorage.getItem("key")
      try {
        const response = await fetch('http://localhost:3000/admin/students?auth='+key, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ registerno, name, course, yearofadmission, password })
        });
  
        if (!response.ok) {
          throw new Error('Student adding failed');
        }
  
        const data = await response.text();
        alert(data);
  
        const [type, message] = data.split(" ");
        if (type === "Error") {
          alert(type + ":" + message);
          return;
        }
  
        setRegisterno('');
        setName('');
        setCourse('Select Course');
        setYearOfAdmission('');
        setPassword('');
  
      } catch (error) {
        console.error('Student Adding failed:', error.message);
      }
    };
  
    return (
      <div className="container">
        <div className="card">
          <h1 style={{ fontSize: "44px", textAlign: "center", marginBottom: "20px" }}>Add <span style={{ color: "green" }}>Student</span></h1>
          <TextField
            id="registerno"
            label="Register No"
            variant="outlined"
            value={registerno}
            onChange={(e) => setRegisterno(e.target.value)}
          />
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl sx={{ m: 0, minWidth: 120 }}>
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              id="course"
              value={course}
              label="Course"
              onChange={handleChange}
            >
              <MenuItem value="BCA">BCA</MenuItem>
              <MenuItem value="BBA">BBA</MenuItem>
              <MenuItem value="Bcom">Bcom</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="yearofadmission"
            label="Year of Admission"
            type='number'
            variant="outlined"
            value={yearofadmission}
            onChange={(e) => setYearOfAdmission(e.target.value)}
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
            Add
          </Button>
        </div>
      </div>
    );
}

export default AddNewStudent