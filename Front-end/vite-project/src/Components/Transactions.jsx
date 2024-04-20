
import { TextField,Button } from "@mui/material"
import { useState,useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router";
const Transactions = () => {

    const [isbn,setIsbn]=useState("");
    const [studentRegisternno,setStudentRegisterno]=useState("")
    const [returnDate,setReturnDate]=useState("")
    const [data2,setData]=useState([]);
    const navigate=useNavigate();

    const auth=localStorage.getItem("key")

    const fetchData=async()=>{
        
        try {
            const response = await fetch('http://localhost:3000/admin/booktransactions?auth='+auth, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Error fetching transaction details');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error updating student profile:', error.message);
            return null
        }
    }


    useEffect(()=>{
        fetchData()
    },[])



    const addBook=async()=>{
        if(isbn==""||studentRegisternno==""||returnDate==""){
            alert("Fill the details first")
            return;
        }
        const auth=localStorage.getItem("key")
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
        const year = currentDate.getFullYear();

        const formattedDate = `${year}-${month}-${day}`;
        try {
            const response = await fetch('http://localhost:3000/admin/booktransactions?auth='+auth, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ bookISBN:isbn,studentregisterno:studentRegisternno,transactiondate:formattedDate+"",returndate:returnDate})
            });
      
            if (!response.ok) {
              throw new Error('Adding book transaction failed');
            }
      
            const data = await response.text(); // Assuming the response is a plain text message
            alert(data); // Show response message in an alert
            
            // Clear form fields after successful signup
            const [type,message]=data.split(" ")
            if(type=="Error"){
              alert(type+":"+message)
              return;
            }
            
            setIsbn('');
            setStudentRegisterno('');
            setReturnDate('');

            fetchData()
          } catch (error) {
            console.error('Book transaction adding failed:', error.message);
            // Handle signup failure, show error message, etc.
          } 
        };


        const handleUpdate=(id)=>{
            navigate("/admin/booktransactions/updatetransaction?id="+id)
        }
        const handleDelete = async (id) => {
            try {
              await fetch(`http://localhost:3000/admin/booktransactions?Id=${id}&auth=${auth}`, {
                method: 'DELETE',
              });
              
              alert('Successfully deleted');
              // Call your function to fetch data here (assuming fetchData() is defined)
              fetchData()
            } catch (error) {
              console.error('Error:', error);
            }
          };

  return (
    <div className="containers">
        <div className="left">
        <TextField
          id="ISBN"
          label="Book ISBN"
          type='text'
          value={isbn}
          onChange={(e)=>setIsbn(e.target.value)}
          variant="outlined"
        />
        <TextField
          id="registerno"
          label="Student Register no"
          type='text'
          value={studentRegisternno}
          onChange={(e)=>setStudentRegisterno(e.target.value)}
          variant="outlined"
        />
        <TextField
          id="returnDate"
          label="Return Date"
          type='date'
          value={returnDate}
          onChange={(e)=>{setReturnDate(e.target.value)}}
          variant="outlined"
        />
        <br />
        <Button variant="contained"
          color="success" onClick={addBook}>Add</Button>

            </div>
            <div className="right">
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 ,height:"100%"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Book ISBN</TableCell>
            <TableCell align="right">Registerno</TableCell>
            <TableCell align="right">TransactionDate</TableCell>
            <TableCell align="right">ReturnDate</TableCell>
            <TableCell align="right">ReturnedDate</TableCell>
            <TableCell align="right">Penalty</TableCell>
            <TableCell align="right">  </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data2.map((data) => (
            <TableRow
              key={data._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.bookISBN}
              </TableCell>
              <TableCell align="right">{data.studentregisterno}</TableCell>
              <TableCell align="right">{data.transactiondate}</TableCell>
              <TableCell align="right">{data.returndate}</TableCell>
              <TableCell align="right">{(data.returneddate==null || data.returneddate=="") ? <ImCross /> : data.returneddate}</TableCell>
              <TableCell align="right">{data.penalty}</TableCell>
              <TableCell align="right"><span style={{display:"flex",gap:"10px"}}><Button variant="contained" color="success" onClick={()=>{handleUpdate(data._id)}}>Update</Button><Button variant="outlined" color="error" onClick={()=>{
                handleDelete(data._id)
              }} >Delete</Button></span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
            </div>
  )
}

export default Transactions