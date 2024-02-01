import React, { useState } from "react";
import { useDataLayerValue } from '../../context/Datalayer';
import Dashboard from "./Dashboard";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import { Divider, IconButton } from "@mui/material";
import StepOne from "./components/StepOne";
import { useEffect } from "react";
import axios from "axios";
import { truncateString } from "../../utils/common";
import { CheckBox, Edit } from "@mui/icons-material";


const ProductCard=({product})=>{


return(
    <div className="w-[220px] ml-2 mb-3 h-[300px] bg-gray-100 rounded-xl">
     <img src={product.image} className="w-[100px] mx-auto object-contain" alt="" />
     <p className="ml-4">Title: {truncateString(product?.title,15)}</p>
     <p className='ml-4 mt-3 '>Price: ${product.price} <span className='font-medium'>/{product.package}</span></p>
       <p className=' mt-2 ml-4'>Order :{product.orders} {product.package} <span className='text-[12px]'>Min order</span></p>
       <div className="flex mt-5 gap-3 ml-4">
        <button className="w-[90px] rounded-lg bg-orange-400 text-white">
            Edit
            <Edit />
        </button>
        <label htmlFor="checkBox">Publish</label>
        <input type="checkBox" ></input>

       </div>
    </div>
)


}








const ProductsList = () => {
  const [{ user }, dispatch] = useDataLayerValue();
  const [chatOpen,setChatOpen]=useState(false)
   const [products, setProducts] = useState([]);

   useEffect(() => {
    const id = user.id;
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

  return (
    <>

<div className=" bg-[#003366] h-[100px]">
          <Topbar chatOpen={chatOpen} setChatOpen={setChatOpen} />
        </div>
        <Divider />
        <div className="flex h-full">
       <div className={`md:min-w-[220px] hidden md:block  bg-[#003366]`}>
            <Sidebar
            
            />
          </div>
  
         
          <div className="mt-5 flex">
            {products?.map((product,i)=>(
                <ProductCard product={product} index={i} />
            ))}
          </div>
          
        </div>
    
    </>
  );
};

export default ProductsList;
