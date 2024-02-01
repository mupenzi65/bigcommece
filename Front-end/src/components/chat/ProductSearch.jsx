import axios from "axios";
import React, { useEffect, useState } from "react";
import { truncateString } from "../../utils/common";
import { Divider } from "@mui/material";
import { useDataLayerValue } from "../../context/Datalayer";
import { Close } from "@mui/icons-material";

const ProductSearch = ({ currentUser,user,setOrders,orders, setSearchModol,searchKey }) => {
  const [products, setProducts] = useState([]);
  // const [{orders},dispatch]=useDataLayerValue()


  useEffect(() => {
    const id = currentUser.id;
    const getProducts = async () => {
      try {
        const resp = await axios.post(
          "http://localhost:3500/api/seller/products/",
          { id }
        );
        if (Array.isArray(resp.data)) {
          if (resp.data.length !== 0) {
            setProducts(resp.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);



  const addToOrder=async(product)=>{
    const productObj={
      _id: product.id,
      title: product.title,
      image: product.image,
      price: '',
      quantity:''
    

  }
    const ids=orders.map((item)=>item._id)
    if(ids.includes(product.id)){
        return
    }else{
      
            
            setOrders((prev)=>[...prev,productObj])
           

    }
   
    




  }

  return (
    <>
   
   
    
    {products.length !==0 &&<div className="ml-2 z-30 rounded-2xl w-[400px] bg-white h-[400px] border border-blue-400">
    <div className="absolute ml-[370px] cursor-pointer">
      <Close onClick={()=>setSearchModol(false)} />
    </div>
      {products
        .filter((product) =>
          product.title?.toLowerCase().includes(searchKey.toLowerCase())
        )

        .map((product, i) => (
          <div  key={i}>
            <div
             onClick={()=>addToOrder(product)}
              className="mt-3 hover:bg-slate-500 cursor-pointer ml-2 flex gap-2"
            >
              <img
                className="w-[62px] h-[62px] object-contain"
                src={product?.image}
                alt=""
              />
              {product.title && <p>{truncateString(product?.title, 50)}</p>}
            </div>
            <Divider />
          </div>
        ))}
    </div>}
    </>
  );
};

export default ProductSearch;
