import React, { useContext, useEffect, useState } from 'react';
import { Search, MoreHoriz } from '@material-ui/icons';
import { Authcontext } from '../context/authcontext';
import axios from 'axios';

function Rightbar() {
  const { user: currentUser } = useContext(Authcontext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/users/all', {
          params: { userId: currentUser._id }
        });
        setUsers(res.data.filter(u => u._id !== currentUser._id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [currentUser]);

  const handleFollow = async (user) => {
    try {
      if (user.isFollowing) {
        await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, { userId: currentUser._id });
      } else {
        await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, { userId: currentUser._id });
      }
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u._id === user._id ? { ...u, isFollowing: !u.isFollowing } : u
        )
      );
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };

  return (
    <>
      <div style={{ flex: 3 }}>
        <div className='mt-5 flex'>
          <Search className='mt-2' />
          <input
            placeholder='Search'
            type='text'
            className='h-10 w-96 rounded-3xl border-[2px] border-gray-500 p-5 text-lg outline-none'
          />
        </div>
        <div className='mt-5 pt-3 pl-5 w-96 border border-black rounded-2xl pb-3 pr-5'>
          <span className='font-bold text-3xl'>Subscribe To Premium</span><br />
          <span className='mt-2'>
            Subscribe to unlock new features and if eligible, receive a share of ads revenue.
          </span><br />
          <button className='bg-blue-500 rounded-2xl mt-3 pt-3 pl-3 pb-3 pr-3 font-bold'>Go Premium</button>
        </div>
        <div className='mt-5 pt-3 pl-5 w-96 border border-black rounded-2xl pb-3 pr-5'>
          <span className='font-bold text-3xl'>What's Trending</span><br />
          <div>
            <span className='font-semibold text-lg'>1. NEET UG</span><br />
            <span className='ml-3 text-sm'>1400 posts</span>
            <MoreHoriz className='ml-80 -mt-24' />
          </div>
          <div>
            <span className='font-semibold text-lg'>2. LOK SABHA ELECTIONS</span><br />
            <span className='ml-3 text-sm'>2000 posts</span>
            <MoreHoriz className='ml-80 -mt-24' />
          </div>
          <div>
            <span className='font-semibold text-lg'>3. MODI 3.0</span><br />
            <span className='ml-3 text-sm'>3000 posts</span>
            <MoreHoriz className='ml-80 -mt-24' />
          </div>
          <div>
            <span className='font-semibold text-lg'>4. RAHUL GANDHI</span><br />
            <span className='ml-3 text-sm'>2000 posts</span>
            <MoreHoriz className='ml-80 -mt-24' />
          </div>
          <div>
            <span className='font-semibold text-lg'>5. WORLD CUP</span><br />
            <span className='ml-3 text-sm'>1800 posts</span>
            <MoreHoriz className='ml-80 -mt-24' />
          </div>
        </div>
        <div className='mt-5 pt-3 pl-5 w-96 border border-black rounded-2xl pb-3 pr-5'>
          <span className='font-bold text-3xl'>Who to Follow</span><br />
          {users.map(user => (
            <div key={user._id} className='flex items-center justify-between mt-3'>
              <span>{user.username}</span>
              <button
                className='bg-blue-500 rounded-xl p-2 font-bold'
                onClick={() => handleFollow(user)}
              >
                {user.isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
        <div className='mt-5 ml-5'>
          Terms of Service
          Privacy Policy
          Cookie Policy<br />
          Accessibility
          Ads info
          More
          © 2024 Twitter Corp.
        </div>
      </div>
    </>
  );
}

export default Rightbar;
