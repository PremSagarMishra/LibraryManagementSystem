import "./Style.css"
import Student from "../assets/student.png"
import { TextField, Button } from '@mui/material';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router";

const StudentProfile = () => {
    const {role,setRole,setLoggedIn,loggedIn}=useContext(UserContext);
    const navigate=useNavigate()
  if(!loggedIn){
    navigate("/")
  }
  if(role!=="student"&& role!=="admin"){
    navigate("/")
  }


    const [registerno,setRegisterno]=useState("")
    const [name,setName]=useState("")
    const [course, setCourse] = useState('Select Course');
    const [yearofadmission, setYearOfAdmission] = useState('');
    const key=localStorage.getItem("key")

    const handleChange = (event) => {
        setCourse(event.target.value);
      };


      const handleUpdate= async()=>{
        try {
            const response = await fetch('http://localhost:3000/student/profile?auth='+key, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    auth: key,
                    name: name,
                    course: course,
                    yearofadmission: yearofadmission
                })
            });
    
            if (!response.ok) {
                throw new Error('Error updating student profile');
            }
            
            const updatedStudent = await response.json();


            console.log("Updated Student:"+updatedStudent.name)
        } catch (error) {
            console.error('Error updating student profile:', error.message);
            return null
        }
      }

      const handleDelete=async()=>{
        try {
            const response = await fetch('http://localhost:3000/student/profile?auth='+key, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    auth: key
                })
            });
    
            const data = await response.text();
            if(data=="Successfully deleted")
            {
                alert("Student id succesfully deleted")
                setRole("")
                setLoggedIn(false)
                navigate("/")
            }
        } catch (error) {
            console.error('Error deleting student:', error.message);
            return null;
        }
      }
    useEffect(() => {
        const fetchData = async () => {
          const key = localStorage.getItem("key");
          try {
            const response = await fetch('http://localhost:3000/student/profile?auth='+key, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'auth': key // Assuming 'auth' is your authorization header key
              }
            });
            
            if (!response.ok) {
              throw new Error('Error fetching data');
            }
          
            const data = await response.json(); // Parse response as JSON
            setRegisterno(data.registerno)
            setName(data.name)
            setCourse(data.course)
            setYearOfAdmission(data.yearofadmission)


          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
      
        fetchData(); // Call the fetchData function
      
      }, []); // Empty dependency array indicates that this effect runs only once after the initial render
      

  return (
    <div className='container'>
        <div className="home-card">
            <img src={Student} alt="" />
            <TextField id="outlined-basic" style={{width:"100%"}} placeholder="Register No" variant="outlined" value={registerno}/>
            <TextField id="outlined-basic" style={{width:"100%"}} placeholder="Name" variant="outlined"  value={name} onChange={(e)=>{
                setName(e.target.value)
            }}/>
            <FormControl style={{width:"100%"}}>
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
            <TextField id="outlined-basic" style={{width:"100%"}} placeholder="Year of Admission" variant="outlined" type="number" value={yearofadmission} onChange={(e)=>{
                setYearOfAdmission(e.target.value)
            }}/>
            <div className="button-group">
            <Button variant="contained" color="success" onClick={handleUpdate}>Update</Button>
            <Button variant="outlined" color="error" onClick={handleDelete} >Delete</Button>
            </div>
            

        </div>
    </div>
  )
}

export default StudentProfile