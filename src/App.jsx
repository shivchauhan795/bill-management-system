import './App.css'
import signin from './pages/signin.jsx'
import signup from './pages/signup.jsx'
function App() {

  return (

    <div className='flex justify-center items-center h-screen'>
     {signup()}
    </div>
  )
}

export default App
