import React, { useContext } from 'react'
import './style.css'
import Button from '@mui/material/Button';
import { AppContext } from '../App';

    interface AppContextType{
        loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    }

const Navbar: React.FC = () => {

    const {loggedIn,setLoggedIn}=useContext<AppContextType>(AppContext)
    return (
        <div className='navbar'>
            <p>Library Management System</p>
            {loggedIn?<Button onClick={()=>setLoggedIn(false)} variant="contained" color="success">
                Login
            </Button>:<Button onClick={()=>setLoggedIn(true)} variant="contained" color="error">
                Logout
            </Button>}
        </div>
    )
}

export default Navbar