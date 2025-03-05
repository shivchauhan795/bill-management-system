import React from 'react'

const Input = ({ type, placeholder, ref, label, disabled, value, onChange }) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className='text-xs font-semibold ml-1' htmlFor={placeholder}>{label}</label>
            <input id={placeholder} ref={ref} type={type} placeholder={placeholder} className={`p-2 border-2 border-black rounded-md ${disabled ? 'bg-gray-200' : ''}`} disabled={disabled} value={value} onChange={onChange} />
        </div>
    )
}

export default Input
