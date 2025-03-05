import './App.css'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Sidebar from './components/Sidebar.jsx'
import BillGenerator from './pages/BillGenerator.jsx'
import CustomerTable from './pages/CustomerTable.jsx'
import { useState } from 'react'
function App() {
  const [switchComponent, setswitchComponent] = useState("generateBill");
  return (

    <div className='flex justify-center items-center h-screen'>
      <div className='flex fixed top-0 left-0'>
        <Sidebar selected={switchComponent} response={setswitchComponent} />
      </div>
      {
        switchComponent === "generateBill" ? <div className='w-3/4 ml-80'>
          <BillGenerator />
        </div> : <div className='w-3/4 ml-80'>
          <CustomerTable />
        </div>
      }
    </div>

  )
}

export default App
