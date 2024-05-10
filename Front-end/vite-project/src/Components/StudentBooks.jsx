import { useState,useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router";
const StudentBooks = () => {
    const [books,setBooks]=useState([]);
    const [search,setSearch]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/books', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'// Assuming 'auth' is your authorization header key
              }
            });
            
            if (!response.ok) {
              throw new Error('Error fetching data');
            }
          
            const data = await response.json(); // Parse response as JSON
            setBooks(data)
            
    
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
      
        fetchData(); // Call the fetchData function
      },[])

      const fetchData2=async()=>{
        const key = localStorage.getItem("key");
        if(search==""){
            alert("Enter any registerno")
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/books?author='+search, {
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
            setBooks(data);

        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }
  return (
    <div className="container">
    <div style={{ display: "flex", justifyContent: "center", gap: "20px", alignContent: "center",width:"100%" }}>
        <TextField id="outlined-basic" placeholder="Search" style={{ width: "60%" }} variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button variant="contained" color="success" onClick={fetchData2}>Search</Button>
    </div>
    <div className="container3">
    
        {books.map((book) => (
            <div key={book._id} className="card3" onClick={()=>{navigate("/student/books/book?id="+book._id)}}>
                <img style={{width:"100%"}} src={book.thumbnail}></img>
                <p><span>Title:</span> {book.title}</p>
                <p><span>Author:</span> {book.author}</p>
                <p><span>ISBN: </span>{book.ISBN}</p>
                <p><span>Description:</span> {(book.description).substring(0,20)}...</p>
               
            </div>
        ))}

        
    </div>
</div>
  )
}

export default StudentBooks