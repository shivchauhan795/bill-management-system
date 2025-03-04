import React from 'react'

const Button = ({text, onClick}) => {
  return (
    <div>
      <button className='p-2 border-2 border-black rounded-xl w-full' onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button
