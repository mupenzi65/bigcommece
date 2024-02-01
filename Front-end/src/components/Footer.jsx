import { Facebook, Flight, Instagram, LinkedIn, LocalShippingRounded, SecurityRounded, Support, SupportAgent, Twitter } from '@mui/icons-material'
import React from 'react'
import logo from '../assets/logo.png'
const Footer = () => {
  return (
    <div className='  bg-slate-200'>
      <div className="">
        <div className='flex shadow-xl justify-between h-[40px]'>
          <div className='flex gap-1 font-medium ml-2 '>
            <SecurityRounded sx={{marginTop:'6px'}} />
            <p className='mt-1'>100 % Secure</p>
          </div>
          <div className='flex gap-1 font-medium ml-2 '>
            <Flight sx={{marginTop:'6px'}} />
            <p className='mt-1 capitalize'>shipping to over 50 countries</p>
          </div>
          <div className='flex gap-1 font-medium ml-2 '>
            <SupportAgent sx={{marginTop:'6px'}} />
            <p className='mt-1 capitalize mr-2'>24/7 outstanding support</p>
          </div>

        </div>
        <div className='flex justify-between'>
          <img className='w-[72px] h-[72px] ml-2' src={logo} alt="" />
          <p className=' max-w-[320px] mt-6 ml-4'>Source  over 1 million products from trusted suppliers across China </p>
          <div className='mt-6 flex gap-1 mr-4'>
            <p>Follow us </p>
            <Instagram />
            <Facebook />
            <Twitter />
            <LinkedIn />
          </div>
        </div>
        <p className='text-gray-500 text-center mt-4 '>BigCommerce all rights reserved</p>
      </div>
     
    </div>
  )
}

export default Footer