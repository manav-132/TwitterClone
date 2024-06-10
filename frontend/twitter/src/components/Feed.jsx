import React, { useContext, useState, useEffect } from 'react';
import Share from './Share';
import Post from './Post';
import Profile from './Profile';
import axios from 'axios';
import { Authcontext } from '../context/authcontext';

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { profile } = useContext(Authcontext);
  const { user } = useContext(Authcontext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = username
          ? await axios.get(`http://localhost:8800/api/post/profile/${username}`)
          : await axios.get(`http://localhost:8800/api/post/timeline/${user._id}`);
        
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [username, user._id]);

  return (
    <>
      <div style={{ flex: 4 }} className='pt-5 pl-5 pr-5 pb-5'>
        {profile ? <Profile /> : <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </>
  );
}

export default Feed;
