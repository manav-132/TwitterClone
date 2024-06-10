import React,{useContext} from 'react'
import { Home,QuestionAnswer,Notifications,Search,Group,Twitter,Person,MoreHoriz } from '@material-ui/icons'
import twitterlogo from "../assets/twitterlogo.jpg"
import { Authcontext } from '../context/authcontext'
function Leftbar() {
    const {profile,setprofile}=useContext(Authcontext)
    const handelClick=()=>{
        setprofile(true)
    }
    const handelClickhome=()=>{
        setprofile(false)
    }
  return (
    <>
    <div style={{flex:3}} className=' h-screen mb-[-60px] overflow-y-scroll sticky top-14'>
   <center> <img src={twitterlogo} className='h-48 '/></center>
    <div className='p-5 items-center ml-28'>
                  <ul className='p-0 m-0 list-none font-bold text-2xl'>
                    <li className='flex items-center mb-5 '>
                        <Home className='mr-4'/>
                        <span className='cursor-pointer' onClick={handelClickhome}>Home</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <Search className='mr-4'/>
                        <span>Explore</span>
                    </li>

                    <li className='flex items-center mb-5'>
                        <Notifications className='mr-4'/>
                        <span>Notifications</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <QuestionAnswer className='mr-4'/>
                        <span>Messages</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <Group className='mr-4'/>
                        <span>Communities</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <Twitter className='mr-4'/>
                        <span>Premium</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <Person className='mr-4'/>
                        <span onClick={handelClick} className='cursor-pointer'>Profile</span>
                    </li>
                    <li className='flex items-center mb-5'>
                        <MoreHoriz className='mr-4'/>
                        <span>More</span>
                    </li>
                  

                  </ul>
                  
            </div>
      

    </div>
    </>
  )
}

export default Leftbar