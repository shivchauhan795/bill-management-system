import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
const SemiProtectedRoutes = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return !currentUser ? <Outlet /> : <Navigate to="/dashboard" />
}

export default SemiProtectedRoutes
