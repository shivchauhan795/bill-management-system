import React, { useRef } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Signin = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const handleSignin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      console.log("Please fill in the details");
      toast.error('Please fill in the details');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.find(user => user.email === email && user.password === password);

    if (userExists) {
      localStorage.setItem("currentUser", JSON.stringify(userExists));
      console.log("Sign In Successful");
      toast.success('Sign In Successful');
      navigate('/dashboard');
    } else {
      console.log("Invalid email or password");
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='flex flex-col justify-evenly items-center gap-7 border-2 p-10 rounded-2xl'>
        <div className='text-2xl uppercase font-bold flex justify-center'>Sign In</div>
        <div className='flex flex-col gap-4 justify-center'>
          <Input ref={emailRef} type="text" placeholder="Email" label="Email" />
          <Input ref={passwordRef} type="password" placeholder="Password" label="Password" />
          <Button text="Sign In" onClick={handleSignin} />
        </div>
        <div>Don't have an account? <a className='text-blue-500 font-semibold' href="/signup">Sign Up</a></div>
      </div>
    </div>
  );
};

export default Signin;