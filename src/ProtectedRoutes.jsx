import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser ? <Outlet /> : <Navigate to="/signin" />
}

export default ProtectedRoutes
