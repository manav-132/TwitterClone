import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import logo from "../assets/logo.jpeg";
import { Videocam, Image, LocationOn, Poll, Cancel } from '@material-ui/icons';
import { Authcontext } from '../context/authcontext';

function Share() {
  const { user } = useContext(Authcontext);
  const desc = useRef();
  const [imgfile, setImgFile] = useState(null);
  const [vidfile, setVidFile] = useState(null);

  const handelClick = async (e) => {
    e.preventDefault();
    const newpost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (imgfile) {
      const data = new FormData();
      const filename = imgfile.name;
      data.append("file", imgfile);
      data.append("name", filename);
      newpost.img = filename;
      try {
        await axios.post("http://localhost:8800/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    if (vidfile) {
      const data = new FormData();
      const filename = vidfile.name;
      data.append("file", vidfile);
      data.append("name", filename);
      newpost.video = filename;
      try {
        await axios.post("http://localhost:8800/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("http://localhost:8800/api/post", newpost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
    const PF="http://localhost:8800/images/"
  const AF="http://localhost:8800/images/"

  return (
    <>
      <form className='h-[150px] w-[700px] bg-slate-500 pt-5 pl-5 pr-5 pb-5 rounded-xl' onSubmit={handelClick}>
        <div className='flex' id='sharetop'>
          <img src={AF+user.profilePicture} className='rounded-full w-10 h-10' />
          <input
            placeholder='What is in your mind!'
            type="text"
            className='border-none w-4/5 outline-none bg-slate-500 pl-5'
            ref={desc}
          />
        </div>
        <hr className='mt-5' />
        {imgfile && (
          <div id="shareimage" className='pt-0 pr-5 pb-3 pl-5 relative'>
            <img src={URL.createObjectURL(imgfile)} className='w-full object-cover' />
            <Cancel onClick={() => setImgFile(null)} className='absolute top-0 right-5 cursor-pointer opacity-70' />
          </div>
        )}
        {vidfile && (
          <div id="sharevideo" className='pt-0 pr-5 pb-3 pl-5 relative'>
            <video controls className='w-full'>
              <source src={URL.createObjectURL(vidfile)} />
            </video>
            <Cancel onClick={() => setVidFile(null)} className='absolute top-0 right-5 cursor-pointer opacity-70' />
          </div>
        )}
        <div className='flex' id='sharebottom '>
          <label htmlFor="imageFile" className='flex items-center mr-4 cursor-pointer'>
            <Image htmlColor="tomato" className='size-5 mr-1' />
            <span className='text-sm font-medium'>Photo</span>
            <input
              style={{ display: "none" }}
              type="file"
              id="imageFile"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => {
                setImgFile(e.target.files[0]);
              }}
            />
          </label>
          <label htmlFor="videoFile" className='flex items-center mr-4 cursor-pointer'>
            <Videocam htmlColor="blue" className='size-5 mr-1' />
            <span className='text-sm font-medium'>Video</span>
            <input
              style={{ display: "none" }}
              type="file"
              id="videoFile"
              accept=".mp4,.avi,.mkv"
              onChange={(e) => {
                setVidFile(e.target.files[0]);
              }}
            />
          </label>
          <div className='flex mt-5 pl-5'>
            <LocationOn />
            <span>Location</span>
          </div>
          <div className='flex mt-5 pl-5'>
            <Poll />
            <span>Poll</span>
          </div>
          <div className='bg-blue-400 rounded-2xl item-center mt-4 ml-56 pt-2 pl-4 pr-4 pb-2'>
            <button type='submit'>Post</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Share;
