import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import SemiProtectedRoutes from './SemiProtectedRoutes.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Home /><Footer/></>
  },
  {
    element: <SemiProtectedRoutes />,
    children: [
      {
        path: '/signin',
        element: <><Signin /><Footer/></>
      },
      {
        path: '/signup',
        element: <><Signup /><Footer/></>
      }
    ]
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/dashboard',
        element: <App />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
