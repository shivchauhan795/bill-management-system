import React, { useRef } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'

const signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col justify-evenly items-center gap-7 border-2 p-10 rounded-2xl'>
        <div className='text-2xl uppercase font-bold flex justify-center'>
          Sign Up
        </div>
        <div className='flex flex-col gap-4 justify-center'>
          <Input ref={emailRef} type={"text"} placeholder={"Email"} />
          <Input ref={passwordRef} type={"password"} placeholder={"Password"} />
          <Button text={"Sign Up"} onClick={() => {
            if (!emailRef.current.value || !passwordRef.current.value) {
              console.log("Please fill the details");
              return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = (emailPattern.test(emailRef.current.value));
            if (isValidEmail) {
              console.log("Email is valid");
            } else {
              console.log("Email is not valid");
              return;
            }
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

            const isPasswordValid = (passwordPattern.test(passwordRef.current.value))
            if (isPasswordValid) {
              console.log("Password is valid");
            } else {
              console.log("Password is not valid. Password must contain at least 8 characters, at least one letter(a-z && A-Z), at least one number, and at least one special character.");
              return;
            }
            // signup logic
            console.log("Sign Up Successful");
          }} />
        </div>
      </div>
    </div>
  )
}

export default signup
