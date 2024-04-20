import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import "./Style.css"

const ViewBooks = () => {
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const authKey = localStorage.getItem("key");

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/admin/books?auth='+authKey, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth': authKey
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
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData2 = async () => {
        if (search === "") {
            alert("Enter any search term");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/books?title=' + search, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth': authKey
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
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch('http://localhost:3000/admin/books?auth='+authKey, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': authKey
                },
                body: JSON.stringify({ id })
            });

            const data = await response.text();
            if (response.ok) {
                alert("Deleted Successfully")
                fetchData()
            } else {
                throw new Error(data); // Throw an error if deletion fails
            }
        } catch (error) {
            console.error('Error deleting book:', error.message);
        }
    };

    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", alignContent: "center" ,width:"100%"}}>
                <TextField id="outlined-basic" placeholder="Search" style={{ width: "60%" }} variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button variant="contained" color="success" onClick={fetchData2}>Search</Button>
            </div>
            <div className="container3">
            <div className="add2">
                <FaPlus style={{width:"100%",height:"100%"}} onClick={()=>navigate("/admin/books/addnewbook")}/>
                </div>
                {books.map((book )=> (
                    <div key={book._id} className="card3">
                        <img style={{width:"100%"}} src={book.thumbnail}></img>
                        
                        <p><span>Title:</span> {book.title}</p>
                        <p><span>ISBN:</span> {book.ISBN}</p>
                        <p><span>Author:</span> {book.author}</p>
                        <p><span>description:</span> {(book.description).substring(0,20)}...</p>
                       
                        <div className="button-group">

                         <Button variant="outlined" color="success" onClick={()=>{navigate("/admin/books/updatebook?id="+book._id)}}>Update</Button>
                         <Button variant="outlined" color="error" onClick={()=>{handleDelete(book._id)}}>Delete</Button>
                        </div>
                    </div>
                ))}

                
            </div>
        </div>
    );
}

export default ViewBooks;
