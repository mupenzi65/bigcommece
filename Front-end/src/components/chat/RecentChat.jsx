import React, { useCallback, useEffect, useState } from 'react'
import { faker } from "@faker-js/faker";
import { Avatar, Divider } from '@mui/material';
import axios from 'axios';
import { useDataLayerValue } from '../../context/Datalayer';
import { truncateString, unreadNotifications } from '../../utils/common';
import moment from 'moment';
const RecentChat = ({conversation,currentUser,newNotifications,setNewNotifications}) => {
  const [users,setUser]=useState(null);
  const [{notifications,user},dispatch]=useDataLayerValue()
  const [userNotification,setUserNotification]=useState([])
  const [latestmessage,setLatesMessage]=useState()
  
  let unread=[]
  if(notifications){

    unread=unreadNotifications(notifications)
 }
  useEffect(()=>{
    const sellerId=conversation.members.find((m)=>m !==currentUser.id)
 
    const getSeller=async()=>{

    try {
     
      
      const res=await axios.get(`http://localhost:3500/api/user/${sellerId}`)
      
      
      if(notifications){
        const userNot=notifications?.filter((n)=>n.senderid===res.data.id)
      setUserNotification(userNot)
      }
      
      setUser(res.data)
     
    } catch (error) {
      console.log(error)  
    }
    
 
    }
    getSeller()
  },[currentUser,conversation])

 
  useEffect(()=>{
    const getLatestMessage=async()=>{
      try {
        const res = await axios.get(
          `http://localhost:3500/api/message/${conversation?.id}`

        );
        setLatesMessage(res.data[res.data.length-1]);
        // const userNot=notifications?.filter((n)=>n.senderid===res.data[0].id)
        // setUserNotification(userNot)
       
      } catch (error) {
        console.log(error);
      }



    }
    getLatestMessage()





  },[notifications,conversation])


  const readNotification=async(userNot)=>{
    userNot.map(async(n)=>{
      const senderId=n.senderid
      const receiverId=currentUser.id
            
      const res=await axios.post('http://localhost:3500/api/editNotifications',{senderId,receiverId})

    })
    getNotification()
   

  }

  // useEffect(()=>{
  //   // const sellerId=conversation.members.find((m)=>m !==currentUser.id)
  //   // if(notifications){
  //   // const userNot=notifications?.filter((n)=>n.senderid===sellerId)
  //   // setUserNotification(notifications)

  //   // }
    
   
   
      
   
  //   const getNotification=async()=>{
  //     try {
  //       const sellerId=conversation.members.find((m)=>m !==currentUser.id)
  //       const receiverId=user.id
  //       const response=await axios.post('http://localhost:3500/api/getnotifications',{receiverId})
       
  //       if(response.data){
  //         const userNot=response.data?.filter((n)=>n.senderid===sellerId)
  //         setUserNotification(userNot)
  //          dispatch({
  //           type:'SET_NOTIFICATION',
  //           notifications:response.data
  //          })

  //       }
        
  //   } catch (error) {
        
  //       console.log(error)
  //   }



  //   }
  //   getNotification()
    

  // },[])

      const getNotification=async()=>{
      try {
        const sellerId=conversation.members.find((m)=>m !==currentUser.id)
        const receiverId=user.id
        const response=await axios.post('http://localhost:3500/api/getnotifications',{receiverId})
       
        if(response.data){
          const userNot=response.data?.filter((n)=>n.senderid===sellerId)
          setUserNotification(userNot)
           dispatch({
            type:'SET_NOTIFICATION',
            notifications:response.data
           })

        }
        
    } catch (error) {
        
        console.log(error)
    }
  }

  const markUserNotificationAsRead=async(userNot,allNot)=>{
    
    const mNotifications=allNot.map((el)=>{
      let notification;
      userNot.forEach(async(n)=>{
        if(n.senderId ===el.senderId){
          
          notification={...n,isRead:true}
        }else{
          notification=el;
        }
      })
      return notification
     



    
      


    })
    setNewNotifications(mNotifications)
  
    

  }





  return (
    <>
    <div onClick={()=> {if(userNotification.length !==0){markUserNotificationAsRead(userNotification,unread),readNotification(userNotification)} }}  className='flex cursor-pointer  hover:bg-gray-200 mt-3'>
    <div className="mt-2 mx-3">
      <Avatar src={users?.image} />
    </div>
    <div className="mt-1">
        <div className="flex gap-8">
        <p className='text-[14px] font-medium'>{users?.fname} </p>
        {latestmessage &&<span className='text-[14px]'>{moment(latestmessage?.createdat).fromNow()}</span>}
        </div>
     
       <p className='text-[12px]'>Malibu group</p>
       <div className='flex justify-between'>
       {latestmessage?.type=='text'&&<p className='text-[11px] mb-2 mt-2 font-semibold'>{truncateString(latestmessage.messages,35)}</p>}
       {latestmessage?.type=='file'&&<p className='text-[11px] mb-2 mt-2 font-semibold'>[photo]</p>}
       {latestmessage?.type=='enquiry'&&<p className='text-[11px] mb-2 mt-2 font-semibold'>[Enqiry]</p>}
      {userNotification.length !==0 && <div className="flex items-center justify-center">
  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
    <span className="text-white text-[14px] ">{userNotification.length}</span>
  </div>
</div>}
       </div>
      
    </div>
      
    </div>
    <Divider />
   </>
  )
}

export default RecentChat