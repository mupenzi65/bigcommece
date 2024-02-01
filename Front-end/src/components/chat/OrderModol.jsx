import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { Divider, IconButton } from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import ProductSearch from "./ProductSearch";
import { useDataLayerValue } from "../../context/Datalayer";
import { truncateString } from "../../utils/common";

import Order from "./Order";
import { toast } from "react-toastify";

const OrderModol = ({ currentChat, currentUser, setOrderModolOpened }) => {
  const [searchKey, setSearchKey] = useState("");
  const [user, setUser] = useState(null);
  const [searchModol, setSearchModol] = useState(false);
  const [Total, setTotals] = useState();
  const [orders,setOrders]=useState([])

  const specificDateTime = new Date();
const formattedDateTime = `${specificDateTime.getFullYear()}-${(specificDateTime.getMonth() + 1).toString().padStart(2, '0')}-${specificDateTime.getDate().toString().padStart(2, '0')} ${specificDateTime.getHours().toString().padStart(2, '0')}:${specificDateTime.getMinutes().toString().padStart(2, '0')}:${specificDateTime.getSeconds().toString().padStart(2, '0')}`;


  
  useEffect(() => {
    const userId = currentChat.members.find((id) => id !== currentUser.id);
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3500/api/user/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  },[]);


  useEffect(() => {
    const findTotal = () => {
      const price = orders.map((item) => item.price*item.quantity);
      var subTotal=0;
      price.forEach((item)=>{
            subTotal+=item
      })
      setTotals(subTotal)
      
    };
    findTotal();
  }, [orders]);

  const submitOrder=async()=>{
    var productObj=[]
    orders.forEach((order)=>{
      const obj={
        id:order._id,
        price:order.price,
        quantity:order.quantity
      }
      productObj.push(obj)
    })
    try {
      const orderObject={
        products:productObj,
        createdAt:formattedDateTime,
        owner:user.id
      }
      const response=await axios.post('http://localhost:3500/api/order/create',{...orderObject})
      toast.success('Order created successfully',{position:'top-right'})
      setOrderModolOpened(false)
    } catch (error) {

      
    }





  }

  return (
    <div className="w-[600px] h-[500px] absolute bg-slate-200 top-11 z-20 ml-5">
      <div className="ml-2 mt-2">
        <div className="flex justify-between mr-3">
          <div>
            <p>
              To: <span>{user?.fname}</span>{" "}
            </p>
          </div>
          <div>
            <Close onClick={() => setOrderModolOpened(false)} />
          </div>
        </div>
        <div>
          <div className="mt-6">
            <input
              type="text"
              className="border w-[400px] h-[40px]  rounded-3xl border-slate-500 p-2 mx-1"
              placeholder="Search product..."
              name=""
              id=""
              onFocus={() => setSearchModol(true)}
              onChange={(e) => setSearchKey(e.target.value)}
              //   onBlur={()=>setSearchModol(false)}
            />
            <IconButton
              type="submit"
              sx={{
                p: "-10px",
                color: "fuchsia",
                marginLeft: "-52px",
                position: "absolute",
              }}
            >
              <Search />
            </IconButton>
          </div>
          {searchModol && (
            <div className="absolute ">
              <ProductSearch
                user={user}
                currentUser={currentUser}
                searchKey={searchKey}
                setSearchModol={setSearchModol}
                setOrders={setOrders}
                orders={orders}
              />
            </div>
          )}
        </div>
        <div className="mb-5 overflow-auto h-[300px]">
          {orders?.map((order, i) => (
            <Order setTotals={setTotals} setOrders={setOrders} orders={orders} order={order} i={i} />
            
          ))}
          <div className="mt-[100px]">
            <p className="font-bold">Total: $ <span className="font-bold">{Total}</span></p>
          </div>
        </div>
        <Divider />
        <div>
          <button onClick={submitOrder} className=" bg-gradient-to-tr text-white w-[400px]  mt-5 mx-12 rounded-xl shadow-lg from-slate-600 bg-orange-400">SUBMIT ORDER</button>

        </div>
      </div>
    </div>
  );
};

export default OrderModol;
