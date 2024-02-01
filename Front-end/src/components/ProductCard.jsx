import React, { useState } from 'react'
import { truncateString } from '../utils/common'
import china from '../assets/china.png'
import Rating from '@mui/material/Rating';
import { Verified } from '@mui/icons-material';
import { useDataLayerValue } from '../context/Datalayer';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({product,chatOpen,setChatOpen,setItem,enquiryOpen,setSeller,setEnquiryOpen}) => {
  const navigate=useNavigate()
  const[{user}]=useDataLayerValue()
  const {validateLogin}=useAuth()


  const sendEnquiry=async()=>{
    if(validateLogin()){
      setEnquiryOpen(true)
      setSeller(product.owner)
      setItem(product)
      
    }
  }

  


  return (
    <div className='flex'>
     <div className="md:w-[250px]  cursor-pointer hover:bg-slate-300 min-w-[250px] max-w-[250px] h-[500px] shadow-lg bg-white rounded-md"  >
      <div onClick={()=>navigate(`/product/${product.id}`)} >
      <img src={product.image} alt="" className='h-[200px] w-[200px] object-fill mx-auto' />
      <p className='font-semibold min-h-[40px] ml-4 mt-4'>{truncateString(product.title,45)}</p>
       <p className='ml-4 mt-3 font-bold'>${product.price} <span className='font-medium'>/{product.package}</span></p>
       <p className='font-medium mt-2 ml-4'>{product.orders} {product.package} <span className='text-[12px]'>Min order</span></p>
       <div className="flex ml-4 mt-2 ">
        <p className='font-bold mr-2'>malibu group</p>
        <img src="" alt="" />
        <Verified sx={{color:'orange'}} />
       </div>
        <div className='flex ml-4 mt-2'>
        <p className='text-[18px] text-orange-500 font-bold'>4.5</p>
        <Rating name="customized-10" defaultValue={1} sx={{color:'orange'}}  max={1} />
        <span className='text-gray-500 ml-1'>(25)</span>
        <span className='text-gray-500 ml-2'>"fast delivery"</span>
        </div>
        <hr className='mx-3 mt-4' />

      </div>
     

         <div className="flex w-full">
          <div className="mx-auto justify-center items-center">
          <button onClick={sendEnquiry} className='md:w-[120px] w-[160px] bg-orange-600 text-white p-1 mx-auto rounded-3xl mt-4'>Send Enquiry</button>
        {/* <button onClick={chatNow} className='md:w-[100px]  border border-orange-500 hover:bg-orange-500 hover:text-white ease-in duration-150 p-1 rounded-3xl  mt-4'>Chat Now</button> */}

          </div>
         
      

         </div>
      
     
     </div>
     <div className='absolute'>
       
     </div>


    </div>
  )
}

export default ProductCard