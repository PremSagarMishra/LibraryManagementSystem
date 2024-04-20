import { TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const UpdateTransaction = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const auth = localStorage.getItem("auth");

  const [isbn, setIsbn] = useState("");
  const [registerno, setRegisterno] = useState("");
  const [returndate, setReturndate] = useState("");
  const [returneddate, setReturneddate] = useState("");
  const [transactiondate, setTransactiondate] = useState("");
  const [penalty, setPenalty] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admin/booktransactions/${id}?auth=${auth}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error fetching transaction details');
      }

      const data = await response.json();
      console.log(data);
      setIsbn(data[0].bookISBN);
      setRegisterno(data[0].studentregisterno);
      setReturndate(formatDate(data[0].returndate));
      setTransactiondate(formatDate(data[0].transactiondate));
      setPenalty(data[0].penalty);
      setReturneddate(formatDate(data[0].returneddate));
    } catch (error) {
      console.error('Error updating student profile:', error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admin/booktransactions/${id}?auth=${auth}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth': auth
        },
        body: JSON.stringify({
          bookISBN: isbn,
          studentregisterno: registerno,
          transactiondate,
          returndate,
          returneddate,
          penalty
        })
      });

      if (response.ok) {
        alert('Transaction updated successfully');
        fetchData(); // Fetch updated data after successful update
      } else {
        throw new Error('Error updating transaction');
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/admin/booktransactions?Id=${id}&auth=${auth}`, {
        method: 'DELETE',
      });
      alert('Successfully deleted');
      fetchData(); // Fetch data again after successful deletion
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");

    if (year.length !== 4 || isNaN(year) || isNaN(month) || isNaN(day)) {
      // Handle cases where the date string is in an unexpected format
      return "";
    }

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  return (
    <div className='container'>
      <div className="card">
        <TextField
          type='text'
          variant="outlined"
          label="Book ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <TextField
          type='text'
          variant="outlined"
          label="Student Register No"
          value={registerno}
          onChange={(e) => setRegisterno(e.target.value)}
        />
        <TextField
          type='date'
          variant="outlined"
          label="Transaction Date"
          value={transactiondate}
          onChange={(e) => setTransactiondate(e.target.value)}
        />
        <TextField
          type='date'
          variant="outlined"
          label="Return Date"
          value={returndate}
          onChange={(e) => setReturndate(e.target.value)}
        />
        <TextField
          type='date'
          variant="outlined"
          label="Returned Date"
          value={returneddate}
          onChange={(e) => setReturneddate(e.target.value)}
        />
        <TextField
          type='number'
          variant="outlined"
          label="Penalty"
          value={penalty}
          onChange={(e) => setPenalty(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default UpdateTransaction;