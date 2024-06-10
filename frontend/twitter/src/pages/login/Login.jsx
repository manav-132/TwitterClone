import React, { useContext, useRef, useState } from 'react';
import { Twitter } from '@material-ui/icons';
import twitter from '../../assets/twitter.png';
import { loginCall } from '../../../apicalls';
import { Authcontext } from '../../context/authcontext'; // Ensure correct import

function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(Authcontext);
  const [forget, setForget] = useState(false);

  const handelClick=(e)=>{
    e.preventDefault();
    
    loginCall({email:email.current.value,password:password.current.value},dispatch)
   
}

  return (
    <>
      <div className="flex">
        <div className="h-96 w-[70vw] flex mt-52">
          <img src={twitter} className="h-96 w-[60vw] rounded-2xl" />
        </div>
        <form className="mt-16 ml-20 h-[700px] w-[600px] p-5 bg-white rounded-xl flex flex-col justify-between" onSubmit={handelClick}>
          <span className="text-left text-black text-6xl font-bold">HAPPENING NOW</span>
          <span className="text-left text-black text-3xl font-bold">JOIN TODAY.</span>
          <input placeholder="Email" type="email" ref={email} className="h-20 rounded-xl border-[2px] border-gray-500 p-5 text-lg outline-none" />
          <input placeholder="Password" type="password" minLength="6" ref={password} className="h-20 rounded-xl border-[2px] border-gray-500 p-5 text-lg outline-none" />
          <button className="h-20 rounded-xl border-none bg-[#1775ee] text-white text-xl font-medium cursor-pointer" type="submit" disabled={isFetching}>
            {isFetching ? "Logging In..." : "Log In"}
          </button>
          <button className="h-16 rounded-xl border-none bg-[#42b72a] text-white text-xl font-medium cursor-pointer" type="button" onClick={()=>  window.location.href = "/register"}>
            Create a New Account
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
