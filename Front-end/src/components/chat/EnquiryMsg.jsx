import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { truncateString } from '../../utils/common'
import { Divider } from '@mui/material'

const EnquiryMsg = ({message}) => {
    const [item,setItem]=useState(null)

    useEffect(()=>{
        const id=message.linkid
        const getProduct=async()=>{
            try {
                const res=await axios.post("http://localhost:3500/api/product",{id})
                setItem(res.data[0])
            } catch (error) {
                console.log(error)
            }






        }
        getProduct()





    },[])



    
  return (
    <div>
        <div className='w-[300px] h-[300px] bg-white shadow-xl rounded-lg'>
            <div >
                <div className='hover:bg-gray-300 cursor-pointer' >
                <img className='w-[100px] mt-2 mx-auto h-[100px] object-contain' src={item?.image} alt="" />
                {item && <p className='ml-2 font-bold'>{truncateString(item?.title,60)}</p>}

                </div>
                
                <Divider/>
                <p className='mt-3 ml-2' >{message?.messages}</p>
            </div>

        </div>
        
    </div>
  )
}

export default EnquiryMsg
