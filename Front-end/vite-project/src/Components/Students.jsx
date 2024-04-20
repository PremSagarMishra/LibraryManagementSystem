import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

import { useNavigate } from "react-router"
const Students = () => {
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState([]);
    const navigate=useNavigate()
    const fetchData = async () => {
        const key = localStorage.getItem("key");
        try {
            const response = await fetch('http://localhost:3000/admin/students?auth=' + key, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': key
                }
            });

            if (!response.ok) {
                throw new Error('Error fetching data');
            }

            const data = await response.json();
            setStudents(data);

        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        fetchData();

    }, []);

    const fetchData2=async()=>{
        const key = localStorage.getItem("key");
        if(search==""){
            alert("Enter any registerno")
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/admin/students?auth=' + key+'&registerno='+search, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': key
                }
            });

            if (!response.ok) {
                throw new Error('Error fetching data');
            }

            const data = await response.json();
            setStudents(data);

        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    const handleDelete=async(id)=>{
        const key = localStorage.getItem("key");
        try {
            const response = await fetch('http://localhost:3000/admin/students?auth=' + key, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': localStorage.getItem("key")
                },
                body: JSON.stringify({ registerno: id })
            });

            const data = await response.text();
            if (response.ok) {
                // Remove the deleted student from the state
                setStudents(students.filter(student => student._id !== id));
                alert(data); // Show success message
                fetchData();
            } else {
                throw new Error(data); // Throw an error if deletion fails
            }
        } catch (error) {
            console.error('Error deleting student:', error.message);
        }
    }

    return (
        <div className="container2">
            <div style={{ display: "flex", justifyContent: "center", gap: "20px",width:"100%", alignContent: "center" }}>
                <TextField id="outlined-basic" placeholder="Search" style={{ width: "60%" }} variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button variant="contained" color="success" onClick={fetchData2}>Search</Button>
            </div>
            <div className="container3">
            <div className="add">
                <FaPlus style={{width:"100%",height:"100%"}} onClick={()=>navigate("/admin/students/addnewstudent")}/>
                </div>
                {students.map((student) => (
                    <div key={student._id} className="card2">
                        <p><span>Registerno:</span> {student.registerno}</p>
                        <p><span>Name: </span>{student.name}</p>
                        <p><span>Course:</span> {student.course}</p>
                        <p><span>Year of Admission:</span> {student.yearofadmission}</p>
                       
                        <div className="button-group">
                         <Button variant="outlined" color="error" onClick={()=>{handleDelete(student.registerno)}}>Delete</Button>
    
                        </div>
                    </div>
                ))}

                
            </div>
        </div>
    );
}

export default Students;
