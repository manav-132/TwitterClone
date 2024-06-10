import React, { useRef } from 'react';
import axios from 'axios';
import twitter from '../../assets/twitter.png';

function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("http://localhost:8800/api/auth/register", user);
                window.location.href = "/login";
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <div className='flex'>
                <div className="h-96 w-[70vw] flex mt-52">
                    <img src={twitter} className='h-96 w-[60vw] rounded-2xl' />
                </div>
                <form className="mt-16 ml-20 h-[700px] w-[600px] p-5 bg-white rounded-xl flex flex-col justify-between" onSubmit={handleSubmit}>
                    <span className='text-left text-black text-6xl font-bold'>HAPPENING NOW</span>
                    <span className='text-left text-black text-3xl font-bold'>JOIN TODAY.</span>
                    <input placeholder='Username' required ref={username} className='h-16 rounded-xl border-[2px] border-gray-500 p-5 text-lg outline-none' />
                    <input placeholder='Email' type="email" required ref={email} className='h-16 rounded-xl border-[2px] border-gray-500 p-5 text-lg outline-none' />
                    <input placeholder='Password' type="password" required ref={password} className='h-16 rounded-xl border-[2px] border-gray-500 p-5 text-lg outline-none' />
                    <input placeholder='Password Again' type="password" required ref={passwordAgain} className='h-16 rounded-xl border-[2px] border-gray-500 p-5 text-lg outline-none' />
                    <button className='h-16 rounded-xl border-none bg-[#1775ee] text-white text-xl font-medium cursor-pointer' type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}

export default Register;
