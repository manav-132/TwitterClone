import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import game from '../assets/game.jpg';
import logo from "../assets/logo.jpeg";
import { Authcontext } from '../context/authcontext';
import { useParams } from 'react-router-dom';

function Profile() {
  const { user: currentUser } = useContext(Authcontext);
  const [user, setUser] = useState({});
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newCoverPicture, setNewCoverPicture] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [followed,setfollowed]=useState(false)
  const username  = useParams().username;
  const PF = "http://localhost:8800/images/";
  const AF = "http://localhost:8800/images/";


  useEffect(()=>{
   setfollowed( currentUser.followings.includes(user?._id))
  },[currentUser,user?._id])
  
    const handelClick=async()=>{
      try {
        if(followed){
          await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`,{userId:currentuser._id})
          dispatch({type:"UNFOLLOW",payload:user._id})
        }
        else{
          await axios.put(`http://localhost:8800/api/users/${user._id}/follow`,{userId:currentuser._id})
          dispatch({type:"FOLLOW",payload:user._id})
        }
      } catch (error) {
        console.log(error)
      }
      setfollowed(!followed)
    }
    const handelLogout=()=>{
      localStorage.removeItem('user');
        window.location.href = "/login";
    }
    const handelDelete=async()=>{
        try{
          await axios.delete(`http://localhost:8800/api/users/delete/${user._id}`)
          localStorage.removeItem('user');
          window.location.href = "/login";
        }
        catch(err){
          console.log(err)
        }
    }
  useEffect(() => {
    axios.get(`http://localhost:8800/api/users?username=${currentUser.username}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [username]);

  const handleProfilePictureChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
    setShowProfileModal(true);
  };

  const handleCoverPictureChange = (e) => {
    setNewCoverPicture(e.target.files[0]);
    setShowCoverModal(true);
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    const newpost = { userId: user._id };

    if (newProfilePicture) {
      const data = new FormData();
      const filename = newProfilePicture.name;
      data.append("file", newProfilePicture);
      data.append("name", filename);
      newpost.profilePicture = filename;

      try {
        await axios.post("http://localhost:8800/api/uploadprofile", data);
        await axios.put(`http://localhost:8800/api/users/${user._id}`, newpost);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }

    setShowProfileModal(false);
  };

  const handleSubmitCover = async (e) => {
    e.preventDefault();
    const newpost = { userId: user._id };

    if (newCoverPicture) {
      const data = new FormData();
      const filename = newCoverPicture.name;
      data.append("file", newCoverPicture);
      data.append("name", filename);
      newpost.coverPicture = filename;

      try {
        await axios.post("http://localhost:8800/api/uploadcover", data);
        await axios.put(`http://localhost:8800/api/users/${user._id}`, newpost);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }

    setShowCoverModal(false);
  };

 

  return (
    <>
      <div className='h-[550px] w-[700px] bg-slate-300 rounded-xl'>
        <div className='' id='sharetop'>
          <img
            src={user.coverPicture ? PF + user.coverPicture : ""}
            className='w-full h-64 object-cover cursor-pointer'
            onClick={() => document.getElementById('coverPictureInput').click()}
            alt="Cover"
          />
          <input
            type="file"
            id="coverPictureInput"
            style={{ display: 'none' }}
            onChange={handleCoverPictureChange}
          />
          {showCoverModal && (
            <div className="modal">
              <button onClick={handleSubmitCover}>Save Cover Picture</button>
            </div>
          )}

          <img
            src={user.profilePicture ? AF + user.profilePicture : ""}
            className='rounded-full w-40 h-40 -mt-20 ml-5 border-[4px] border-black z-40'
            onClick={() => document.getElementById('profilePictureInput').click()}
            alt="Profile"
          />
          <input
            type="file"
            id="profilePictureInput"
            style={{ display: 'none' }}
            onChange={handleProfilePictureChange}
          />
          {showProfileModal && (
            <div className="modal">
              <button onClick={handleSubmitProfile}>Save Profile Picture</button>
            </div>
          )}

          <span className='font-bold text-2xl ml-10'>{user.username}</span><br />
          <span className='font-medium text-sm ml-10'>{user.email}</span><br />
          <span className='text-sm ml-10'>{user.followers?.length || 0} Followers</span>
          <span className='text-sm ml-10'>{user.followings?.length || 0} Following</span>
        </div>

        { user.username=== currentUser.username &&( <button className='bg-[#1872f2]  text-white rounded-xl px-1 py-2 ml-[600px] -mt-28' onClick={handelLogout}>Logout</button>)}<br /><br />
   { user.username=== currentUser.username &&( <button className='bg-[#1872f2]  text-white rounded-xl px-1 py-2 ml-[600px]' onClick={handelDelete}>Delete User</button>)}
  {user.username!== currentUser.username &&(
      <button id="rightbarfollowbutton" className='mt-8 mb-3 border-none bg-[#1872f2] text-white rounded-md px-1 py-2 flex items-center cursor-pointer font-medium' onClick={handelClick}>
        {!followed?"follow":"unfollow"}
        {/* {!followed?<Add />:<Remove />} */}
        
        </button>
    )}
      </div>
    </>
  );
}

export default Profile;
