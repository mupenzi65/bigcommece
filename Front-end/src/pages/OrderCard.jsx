import React, { useState } from "react";
import SellIcon from "@mui/icons-material/Sell";
import {
  Cancel,
  CoffeeRounded,
  DoneAll,
  ShoppingBasketOutlined,
} from "@mui/icons-material";
import { Avatar, Divider } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { truncateString } from "../utils/common";

const ProductCard = ({ item, order }) => {
  const [product, setProduct] = useState(null);
  const quantity = parseFloat(item?.quantity || "0");
  const price = parseFloat(item?.price || "0");
  const totalCost = (quantity * price).toFixed(2);
  

 



  useEffect(() => {
    const id = item.id;
    const getProduct = async () => {
      try {
        const res = await axios.post("http://localhost:3500/api/product", {
          id,
        });
        setProduct(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  return (
    <div>
      <div className="flex mb-4">
        <img
          className="w-[74px] h-[74px] object-contain"
          src={product?.image}
          alt=""
        />
        {product?.title && (
          <p className="w-[280px]">{truncateString(product?.title, 70)}</p>
        )}
        <p className="font-bold min-w-[280px]">USD {totalCost}</p>
        <p className="font-semibold">{order?.status}</p>
      </div>
    </div>
  );
};






const OrderCard = ({ order }) => {
    const [seller,setSeller]=useState()
    useEffect(()=>{
        const getSeller=async()=>{
            const userId=order.sender
            try {
                const res=await axios.get(`http://localhost:3500/api/user/${userId}`)
                console.log(order.sender)
                setSeller(res.data)
                
            } catch (error) {
                console.log(error)
            }
    
        }
       
        getSeller()
    
    
    
    },[order])





  return (
    <div className="mt-5 w-full h-[300px] mb-8 border px-1">
      <div className="flex justify-between mr-2 mt-3 ">
        <div className="flex gap-3">
          <ShoppingBasketOutlined sx={{ color: "orange" }} />
          <p>
            Order No. <span>{order?.id}</span>
          </p>
          <div className="h-6 w-1 bg-gray-400"></div>
          <p>{order?.createdat.split("T")[0]}</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-orange-600 text-white p-1 rounded-2xl">
            Confirm{" "}
            <span>
              <DoneAll />
            </span>{" "}
          </button>
          <button className="bg-orange-600 text-white p-1 rounded-2xl">
            Cancel{" "}
            <span>
              <Cancel />
            </span>
          </button>
        </div>
      </div>
      <div className="flex mt-5  ">
        <div className="border-r-2 w-[290px] border-gray-300">
          <p className="font-medium">Malibu business Group</p>
          <div className="flex font-medium gap-2 mt-2">
            <Avatar sx={{ width: "20px", height: "20px", marginTop: "3px" }} />
            <p>{seller?.fname}</p>
          </div>
        </div>
        <div>
          {order.products.slice(0, 2).map((item) => (
            <ProductCard order={order} item={item} />
          ))}

          <p className="font-semibold">
            Total products: {order?.products.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
