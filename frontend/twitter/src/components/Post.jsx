import React, { useState,useEffect,useContext } from 'react'
import logo from "../assets/logo.jpeg"
import Ad from "../assets/ad.png"
import axios from 'axios'
import {ThumbUpAlt,Comment} from '@material-ui/icons'
import { Authcontext } from '../context/authcontext'
function Post({post}) {
    const [like,setLike]=useState(0)
    const [islike,setisLike]=useState(false)
   const [user,setUser]=useState({})
   const{user:currentuser}=useContext(Authcontext)
    const handelLike=()=>{
      try{
        axios.put(`http://localhost:8800/api/post/${post._id}/like`,{userId:currentuser._id})
      }catch(err){

      }
       setLike(islike?like-1:like+1);
       setisLike(!islike)
    }
      const PF="http://localhost:8800/images/"
       const AF="http://localhost:8800/images/"
    useEffect(()=>{
      setisLike(post.likes.includes(currentuser._id))
    },[currentuser._id,post.likes])
    useEffect(() => {
      axios.get(`http://localhost:8800/api/users?userId=${post.userId}`)
    .then(response => setUser(response.data))
    .catch(error => console.error('Error fetching data:', error));
    }, [post.userId]);
  






  return (
    <>
    <div className='bg-slate-200 pt-5 pl-5 pr-5 pb-5 rounded-xl mt-4'>
        <div id="posttop" className='flex'>
        <img src={AF+user.profilePicture} className='rounded-full w-7 h-7' />
        <span className=' border-none w-4/5 outline-none pl-5 '> {user.username}</span>
        </div>
        <div id='postmiddle' className='pt-4'>
        <span>{post?.desc}</span>
        <img src={AF+post.img} className='w-full mt-5 max-h-96 object-contain' />
        </div>
        <div id='postlast'className='flex mt-4'>
            <div className='flex'> 
            <ThumbUpAlt onClick={handelLike}/>
            <span>{like}</span>
            </div>
            <div className='flex ml-[500px]'> 
            <Comment/>
            <span>Comments</span>
            </div>
        </div>
    </div>
    </>
  )
}

export default Post