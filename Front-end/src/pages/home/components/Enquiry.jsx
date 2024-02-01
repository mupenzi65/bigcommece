import { Avatar, Divider } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { truncateString } from '../../../utils/common'
import { Close } from '@mui/icons-material'
import { useDataLayerValue } from '../../../context/Datalayer'

const Enquiry = ({seller,item,setEnquiryOpen}) => {
    const [{user},dispatch]=useDataLayerValue()
    const [users,setUser]=useState()
    const[message,setMessage]=useState(null)
    const [chatId,setChatId]=useState(null)
    useEffect(()=>{
        const getSeller=async()=>{
            try {
                const res=await axios.get(`http://localhost:3500/api/user/${seller}`)
                setUser(res.data)
                
            } catch (error) {
                console.log(error)
            }

        }
       
        getSeller()



    },[seller])
    const specificDateTime = new Date();
const formattedDateTime = `${specificDateTime.getFullYear()}-${(specificDateTime.getMonth() + 1).toString().padStart(2, '0')}-${specificDateTime.getDate().toString().padStart(2, '0')} ${specificDateTime.getHours().toString().padStart(2, '0')}:${specificDateTime.getMinutes().toString().padStart(2, '0')}:${specificDateTime.getSeconds().toString().padStart(2, '0')}`;
    
    // send enquiry

    const buildMessage=async(convId)=>{
        if(message !==null){
            const messageObject={
                conversationId:convId,
                senderId:user.id,
                text:message,
                image:'',
                type:'enquiry',
                createdAT:formattedDateTime,
                linkId:item.id
  
  
  
          }
          try {
            console.log(messageObject)
              const res=await axios.post("http://localhost:3500/api/message",{...messageObject})
              setMessage(null)
              setEnquiryOpen(false)
          } catch (error) {
              console.log(error)
          }


        }else{
            alert('message can not be empty')
        }
       




    }

    const sendEnquiry=async()=>{

        // get conversation or create new conversation
        const userId=user.id
        const conversation=await axios.post('http://localhost:3500/api/conversation',{seller,userId})

        if(conversation.data.length>0){
            setChatId(conversation.data[0].id)

            buildMessage(conversation.data[0].id)




        }else{
            const senderId=user.id
            const receiverId=seller
            const time=formattedDateTime
            const resp=await axios.post('http://localhost:3500/api/conversation/create',{senderId,receiverId,time})
              console.log(resp.data.id)
        }








    }






  return (
    <div className='bg-gray-200 z-50 border right-12 shadow-lg w-[600px] h-[600px] fixed top-[30%]'>
        {/* first div */}
        <div className='ml-2 '>
            <div className=' gap-4 mt-4 flex justify-between'>
                <div className='flex gap-4'>
                <p>To:</p>
                <Avatar  >

                </Avatar>
                <p className='font-bold'>{users?.fname}</p>
                <div className='w-1 h-6 bg-slate-500'></div>
                <p className='font-bold'>Malibu business group</p>
                    
                </div>
               
                <div className=' cursor-pointer mr-3'onClick={()=>setEnquiryOpen(false)} >
                    <Close />
                </div>
               
            </div>
            <div className='mt-4 flex '>
                <img className='w-[72px] h-[72px] object-contain' src={item?.image} alt="product" />
                <div className='w-[300px]'>
                {item?.title &&<p className='mx-w-[100px]  '>{truncateString(item.title,100)}</p>}
                </div>
              

            </div>

        </div>
        {/* second div */}
        <div className='mt-5 ml-2'>
            <div className='flex'>
            <p className='font-bold'>Detailed requirements</p>
            <span className='text-red-600 ml-1'>*</span>

            </div>
            <textarea onChange={(e)=>setMessage(e.target.value)} className='mt-2 rounded-sm px-1' placeholder='Enter the details' name="" id="" cols="60" rows="5"></textarea>
            

        </div>
        {/* last div */}
        <div>
        <button onClick={sendEnquiry} disabled={message ===null} className={`md:w-[320px] ${message ===null && 'opacity-50'} ml-12 w-[160px] bg-orange-600 text-white p-1 mx-auto rounded-3xl mt-4`}>Send Enquiry</button>
        </div>
        

   



    </div>
  )
}

export default Enquiry