import React from 'react'
import Leftbar from '../../components/Leftbar'
import Feed from '../../components/Feed'
import Rightbar from '../../components/Rightbar'

function Home() {
  return (
    <>
    <div className='flex w-full'>
    <Leftbar />
    <Feed/>
    <Rightbar/>
    </div>
    </>
  )
}

export default Home