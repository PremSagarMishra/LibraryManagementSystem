import "./Style.css"
import { useEffect, useState } from "react"
import Admin from "../assets/admin.webp"
import { TextField,Button } from "@mui/material"
import { useNavigate } from "react-router"


const AdminProfile = () => {

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [doj,setDoj]=useState("");
    const [name,setName]=useState("");
    const navigate=useNavigate();


    const handleUpdate= async()=>{

        if(localStorage.getItem("role")!="admin"||localStorage.getItem("key")==""){
            alert("Unauthorised")
            navigate("/home")

        }

        const key=localStorage.getItem("key")
        try {
            const response = await fetch('http://localhost:3000/admin/profile?auth='+key, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    auth: key,
                    name: name,
                    username: username,
                    doj: doj,
                    password:password
                })
            });
    
            if (!response.ok) {
                throw new Error('Error updating student profile');
            }
            


            alert("Updated Successfully")
        } catch (error) {
            console.error('Error updating student profile:', error.message);
            return null
        }
    }

    useEffect(() => {
        const fetchData = async () => {
          const key = localStorage.getItem("key");
          try {
            const response = await fetch('http://localhost:3000/admin/profile?auth='+key, {
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
            setUsername(data.username)
            setName(data.name)
            setDoj(data.doj)
            setPassword(data.password)


          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
      
        fetchData(); // Call the fetchData function
      
      }, []); // Empty dependency array indicates that this effect runs only once after the initial render
      


  return (
    <div className='container'>
       <div className="home-card">
        <img src={Admin}/>

        <TextField id="outlined-basic" placeholder="Username" variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)} style={{width:"100%"}}/>
        <TextField id="outlined-basic" placeholder="Name" variant="outlined"  value={name} onChange={(e)=>{
                setName(e.target.value)
            }} style={{width:"100%"}}/>
        <TextField id="outlined-basic" type="password" placeholder="Password" variant="outlined"  value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:"100%"}}/>
            <TextField id="outlined-basic" placeholder="Date of Joining" variant="outlined"  value={doj} onChange={(e)=>setDoj(e.target.value)} style={{width:"100%"}}/>
            <Button variant="contained" color="success" onClick={handleUpdate}>Update</Button>
        </div> 

    </div>
  )
}

export default AdminProfile