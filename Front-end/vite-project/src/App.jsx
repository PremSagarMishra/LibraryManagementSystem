import './App.css'
import RoleSelection from './Components/RoleSelection.'
import Navbar from './Components/Navbar'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import StudentLogin from './Components/StudentLogin';
import AdminLogin from './Components/AdminLogin';
import StudentSignup from './Components/StudentSignup';
import AdminSignup from './Components/AdminSignup';
import Home from './Components/Home';
import { createContext, useEffect, useState } from 'react';
import Logout from './Components/Logout';
import StudentProfile from './Components/StudentProfile';
import AdminProfile from './Components/AdminProfile';
import Students from "./Components/Students"
import AddNewStudent from './Components/AddNewStudent';
import ViewBooks from './Components/ViewBooks';
import AddNewBooks from './Components/AddNewBooks';
import UpdateBook from './Components/UpdateBook';
import StudentBooks from './Components/StudentBooks';
import Book from './Components/Book';
import Transactions from './Components/Transactions';

export const UserContext=createContext()
function App() {

  const [loggedIn,setLoggedIn]=useState(false);
  const [role,setRole]=useState("");
  
  useEffect(() => {
    if (localStorage.getItem("role") !== null && localStorage.getItem("key") !== null) {
      setLoggedIn(true);
    }
    setRole(localStorage.getItem("role"));
  }, []); // Run this effect only once after the initial render
  



  return (
    <>
    <UserContext.Provider value={{loggedIn,setLoggedIn,role,setRole}}>
    <Router>
    <Navbar />
      <Routes>
      <Route path='/' element={<RoleSelection />}/> 
      <Route path='/student/login' element={<StudentLogin />} />
      <Route path='/student/signup' element={<StudentSignup />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/signup' element={<AdminSignup />} />
      <Route path='/admin/students/addnewstudent' element={<AddNewStudent />} />
      <Route path='/admin/books' element={<ViewBooks />} />
      <Route path='/admin/books/addnewbook' element={<AddNewBooks />} />
      <Route path='/admin/books/updatebook' element={<UpdateBook />} />
      <Route path='/home' element={<Home />} />
      <Route path='/student/profile' element={<StudentProfile />} />
      <Route path='/student/books' element={<StudentBooks />} />
      <Route path='/student/books/book' element={<Book />} />
      <Route path='/admin/booktransactions' element={<Transactions />} />
      <Route path='admin/students' element={<Students />} />
      <Route path='/admin/profile' element={<AdminProfile />} />
      <Route path='/logout' element={<Logout />} />
      </Routes>
    </Router>
    </UserContext.Provider>
    </>
  )
}

export default App
