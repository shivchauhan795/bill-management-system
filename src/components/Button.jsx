import React from 'react'

const Button = ({ text, onClick, type, startIcon }) => {
  return (
    <div>
      <button className={`cursor-pointer flex gap-1 justify-center items-center p-2 border-2 border-black rounded-xl w-full ${type === 'success' ? 'bg-green-400' : 'bg-blue-200'} ${type === 'alert' ? 'bg-red-400' : 'bg-blue-200'}`}  onClick={onClick}>
        {startIcon}
        {text}
      </button>
    </div>
  )
}

export default Button
