import React, { useEffect, useState } from 'react'
import { faker } from "@faker-js/faker";
import { Avatar, Divider } from '@mui/material';
import axios from 'axios';
const RecentChat = ({conversation,currentUser,currentChat,setCurrentChat}) => {
  const [user,setUser]=useState(null);

  useEffect(()=>{
    const sellerId=conversation.members.find((m)=>m !==currentUser.id)
    console.log(sellerId)
    const getSeller=async()=>{

    try {
      
      const res=await axios.get(`http://localhost:3500/api/seller/${sellerId}`)
      console.log(res.data[0])
      setUser(res.data[0])
      
    } catch (error) {
      console.log(error)  
    }
    
 
    }
    getSeller()
  },[currentUser,conversation])





  return (
    <>
    <div onClick={()=>setCurrentChat(conversation)}  className='flex cursor-pointer  hover:bg-gray-200 mt-3'>
    <div className="mt-2 mx-3">
      <Avatar src={user?.image} />
    </div>
    <div className="mt-1">
        <div className="flex gap-8">
        <p className='text-[14px] font-medium'>{user?.fname} {user?.lname} </p>
        {/* <span className='text-[14px]'>2023-07-1 </span> */}
        </div>
     
       {/* <p className='text-[12px]'>Malibu group</p>
       <p className='text-[11px] mb-2 font-semibold'>Lorem ipsum dolor sit amet.</p> */}
    </div>
      
    </div>
    <Divider />
   </>
  )
}

export default RecentChat