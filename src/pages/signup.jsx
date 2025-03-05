import React, { useRef } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'

const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignup = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      console.log("Please fill in the details");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      console.log("Email is not valid");
      return;
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordPattern.test(password)) {
      console.log("Password must contain at least 8 characters, one letter, one number, and one special character.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (storedUsers.some(user => user.email === email)) {
      console.log("Email is already registered");
      return;
    }

    storedUsers.push({ email, password });
    localStorage.setItem("users", JSON.stringify(storedUsers));
    console.log("Sign Up Successful");
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col justify-evenly items-center gap-7 border-2 p-10 rounded-2xl'>
        <div className='text-2xl uppercase font-bold flex justify-center'>Sign Up</div>
        <div className='flex flex-col gap-4 justify-center'>
          <Input ref={emailRef} type="text" placeholder="Email" label="Email" />
          <Input ref={passwordRef} type="password" placeholder="Password" label="Password" />
          <Button text="Sign Up" onClick={handleSignup} />
        </div>
        <div>Already have an account? <a className='text-blue-500 font-semibold' href="/signin">Sign In</a></div>
      </div>
    </div>
  );
};

export default Signup;
