import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import BarChartSharpIcon from '@mui/icons-material/BarChartSharp';
import RateReviewSharpIcon from '@mui/icons-material/RateReviewSharp';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import SellSharpIcon from '@mui/icons-material/SellSharp';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import img1 from '../../../assets/imgi1.png'
import { Avatar, Divider } from '@mui/material';

import { useState } from 'react';
import ProductsMenu from './ProductsMenu';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const navigate=useNavigate()
    const [MenuProducts,setMenuProducts]=useState(false)
  return (
  <div className='containe h-screen '>
         <div className=" cursor-pointer ">
                <Avatar sx={{ height: "50px", width: "50px", marginLeft:'40px' }}>
                 <img src={img1} alt="" />
                </Avatar>
                <p className="text-[12px] mb-2 text-center text-white font-semibold w-[120px]">Mupenzi Abdillah</p>
                <div >
            
              </div>
              </div>
              
              <Divider />
              <div className="">
              <div onClick={()=>navigate('/seller/dashboard')}   className="cursor-pointer  mt-5 hover:bg-gray-400 rounded-2xl ">
        <DashboardIcon sx={{fontSize:30 ,color:'white'}} />
        <span className=' ml-2 text-gray-200 text-[20px] font-bold'>Dashboard</span>
        </div>
        <div className="cursor-pointer hover:bg-slate-400 rounded-2xl mt-5 " onClick={()=>setMenuProducts((prev)=>!prev)}>
        <InventoryIcon sx={{fontSize:30 ,color:'white'}} />
        <span  className=' ml-2 text-[20px] font-bold text-gray-200' >Products</span>
        <ArrowDropDownIcon sx={{fontSize:40, color:'white'}} />
        </div>
        <div className="">
        {MenuProducts &&(<ProductsMenu />)}
        </div>

    

              </div>
     
    



    </div>
  )
}

export default Sidebar