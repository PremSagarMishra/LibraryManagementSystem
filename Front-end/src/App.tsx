
import { createContext, useState } from 'react'
import './App.css'
import { Studentlogin } from './components/Student';
import Navbar from './components/Navbar'

interface AppContextType{
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>

}
export const AppContext=createContext<AppContextType>({
  loggedIn:false,
  setLoggedIn: () => {}
});
function App() {
  
  const [loggedIn,setLoggedIn]=useState<boolean>(true);

  return (
    <>
    <AppContext.Provider value={{loggedIn,setLoggedIn}}>
    <Navbar />
    <div className='container'>
    <Studentlogin />
    </div>
    </AppContext.Provider>
   </>
  )
}

export default App
