import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ selected, response }) => {
    const navigate = useNavigate();
    return (
        <div className='h-screen w-80 flex flex-col justify-between border-y-2 border-r-2 rounded-r-2xl'>
            <div>
                <div className='text-xl p-3 rounded-tr-2xl uppercase font-bold flex justify-center border-b-2 bg-blue-200'>
                    Bill Management System
                </div>
                <div className='flex flex-col gap-5 justify-center items-center text-2xl font-mono font-semibold'>
                    <div onClick={() => { response("generateBill") }} className={`cursor-pointer hover:bg-blue-100 w-full flex justify-center py-3 ${selected === "generateBill" ? "bg-blue-100" : ""}`}>Bill Generator</div>
                    <div onClick={() => { response("customerList") }} className={`cursor-pointer hover:bg-blue-100 w-full flex justify-center py-3 ${selected === "customerList" ? "bg-blue-100" : ""}`}>Customer List</div>
                </div>
            </div>
            <div className='flex justify-center text-lg uppercase font-bold p-4 bg-red-500 rounded-br-2xl cursor-pointer' onClick={() => {
                localStorage.removeItem("currentUser"); // Remove user from local storage
                navigate("/signin");
            }}>
                Logout
            </div>
        </div>
    )
}

export default Sidebar
