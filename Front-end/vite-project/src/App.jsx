import './App.css'
import RoleSelection from './Components/RoleSelection.'
import Navbar from './Components/Navbar'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import StudentLogin from './Components/StudentLogin';
import AdminLogin from './Components/AdminLogin';
import StudentSignup from './Components/StudentSignup';
import AdminSignup from './Components/AdminSignup';

function App() {

  return (
    <>

    <Navbar />
    <Router>
      <Routes>
      <Route path='/' element={<RoleSelection />}/> 
      <Route path='/student/login' element={<StudentLogin />} />
      <Route path='/student/signup' element={<StudentSignup />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/signup' element={<AdminSignup />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
