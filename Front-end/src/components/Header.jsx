import React, { useContext, useEffect, useState } from "react";
import big from "../assets/logo.png";
import SearchBar from "./SearchBar";
import { Paper, IconButton, Avatar } from "@mui/material";
import { Search } from "@mui/icons-material";
import MessageIcon from "@mui/icons-material/Message";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDataLayerValue } from "../context/Datalayer";
import {unreadNotifications} from '../utils/common'
import img1 from '../assets/imgi1.png'
import useNotification from "../hooks/useNotification";
import axios from "axios";
import useAuth from "../hooks/useAuth";
const Header = ({setChatOpen,setSearchPattern}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [{user,notifications},dispatch]=useDataLayerValue()
  const [orders, setOrders] = useState([]);
  const [searchKey,setSearchKey]=useState()
  const {validateLogin}=useAuth()


  let unread=[]
 
  if(notifications){

     unread=unreadNotifications(notifications)
  }



  useEffect(() => {
    const getOrders = async () => {
      const id = user.id;
      try {
        const order = await axios.post("http://localhost:3500/api/order", {
          id,
        });
        if (order.data.length !== 0) {
          setOrders(order.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  useEffect(()=>{

    if(user){
      const getNotification=async()=>{
        try {
          const receiverId=user.id
          const response=await axios.post('http://localhost:3500/api/getnotifications',{receiverId})
          if(response.data[0]){
            const unread=unreadNotifications(response.data)
             dispatch({
              type:'SET_NOTIFICATION',
              notifications:response.data
             })
  
          }
          
      } catch (error) {
          
          console.log(error)
      }
  
  
  
      }
      getNotification()

    }
    
    
   



  },[])

  const handleChat=()=>{
    if(validateLogin()){
      setChatOpen(true)
    }

  }
 
  const handleSearch=()=>{
    
    if(searchKey !==''){
      console.log("first")
      setSearchPattern(searchKey)
    }



  }

  



  return (
    <>
      <div className=" containe ">
        <div className="flex justify-between  ">
          <div className="" onClick={()=>navigate('/')} >
            <img src={big} alt="" className="w-[74px] h-[74px]" />
          </div>
          <div className="mt-6">
            <input
              type="text"
              className="border md:w-[600px] w-[250px] h-[40px]  rounded-3xl border-slate-500 p-2 mx-1"
              placeholder="What are you looking for..."
              name=""
              id=""
              onChange={(e)=>setSearchKey(e.target.value)}
            />
            <IconButton
              onClick={handleSearch}
              type="submit"
              sx={{
                p: "-10px",
                color: "fuchsia",
                marginLeft: "-52px",
                position: "absolute",
              }}
            >
              <Search       />
            </IconButton>
          </div>
          <div
            className="mt-6 lg:hidden block"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <MenuIcon fontSize="large" sx={{ color: "orange" }} />
          </div>
          {menuOpen && (
            <div className=" absolute mt-[70px] right-1 z-40 w-[150px] h-[280px] bg-white shadow-2xl">
              <div className="mt-4 mb-12  cursor-pointer mx-[50px]">
                <Avatar sx={{ height: "30px", width: "30px" }}></Avatar>
                <p className="text-[12px]">Sign in</p>
              </div>
              <div className="mt-5 hover:bg-slate-100 flex  cursor-pointer mx-2">
                <MessageIcon sx={{ color: "gray" }} />
                <p className="text-[14px]  ml-[10px] ">Messages</p>
                <span className="w-4 h-4 rounded-full bg-red-600 text-white mt-1 ml-1 px-[4px] pb-[0.5] m  text-[12px]">
                  {notifications?.length}
                </span>
              </div>
              <div className="mt-5 hover:bg-slate-100 flex mx-2 cursor-pointer">
                <ShoppingCartIcon sx={{ color: "gray" }} />
                <p className="text-[14px]  ml-[10px] ">Cart</p>
                <span className="w-4 h-4 rounded-full bg-red-600 text-white mt-1 ml-1 px-[4px] pb-[0.5] text-[12px]">
                  2
                </span>
              </div>
              <div className="mt-5 hover:bg-slate-100 flex mx-2 cursor-pointer">
                <LocalAtmIcon sx={{ color: "gray" }} />
                <p className="text-[14px]  ml-[10px] ">Orders</p>
                <span className="w-4 h-4 rounded-full bg-red-600 text-white mt-1 ml-1 px-[4px] pb-[0.5] text-[12px]">
                  3
                </span>
              </div>
              <div className="mx-2 gap-2 mt-5 flex cursor-pointer">
                <LogoutIcon />
                <p>Logout</p>
              </div>
            </div>
          )}
          <div className="lg:flex hidden  gap-12">
            <div className="mt-5" onClick={handleChat} >
              <MessageIcon sx={{ color: "gray" }} />
              <p className="text-[12px] text-center ml-[-10px] relative">
                Messages
              </p>
              {notifications?.length !==0 && <h5 className="absolute top-2 px-2 ml-3 rounded-full w-6 h-6 bg-red-600 text-white">
              {notifications?.length}
              </h5>}
            </div>
            <div className="mt-5" onClick={()=>{if(validateLogin()){navigate('/orders')}}}>
              <LocalAtmIcon sx={{ color: "gray" }} />
              <p className="text-[12px] text-center ml-[-6px] relative">
                Orders
              </p>
              <h5 className="absolute top-2 px-2 ml-3 rounded-full w-6 h-6 bg-red-600 text-white">
               {orders.length}
              </h5>
            </div>
           

            {user ? 
           ( <div className="mt-4">
                <Avatar
                  sx={{ height: "30px", width: "30px" }}
                >
                  <img src={img1} alt="" />
                </Avatar>
               
              </div>):
             
              <div className="mt-4">
                <Avatar
                  onClick={() => navigate("/user/login")}
                  sx={{ height: "30px", width: "30px" }}
                >
                  
                </Avatar>
                <div>
                  <p className="text-[12px]">Sign in</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <hr className="w-full bg-slate-100 h-1" />
    </>
  );
};

export default Header;
