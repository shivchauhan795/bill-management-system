import React from 'react'

const Input = ({ type, placeholder, ref }) => {
    return (
        <div>
            <input ref={ref} type={type} placeholder={placeholder} className='p-2 border-2 border-black rounded-md' />
        </div>
    )
}

export default Input
