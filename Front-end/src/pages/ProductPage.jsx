import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import Enquiry from './home/components/Enquiry';

const ProductPage = () => {
    const [data, setData] = useState([]);
    const { pathname } = useLocation();
    const id = pathname.split("/").slice(-1)[0];
    const [loading, setLoading] = useState(true);
    const [enquiryOpen,setEnquiryOpen]=useState(false)
    const {validateLogin}=useAuth()
    const [seller,setSeller]=useState(null)
    const [item,setItem]=useState(null)

    useEffect(() => {
        const getProduct = async () => {
          try {
            const res = await axios.post("http://localhost:3500/api/product", {
              id,
            });
            console.log(res.data)
            setData(res.data[0]);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        getProduct();
      }, []);

      const sendEnquiry=async()=>{
        console.log(data)
        if(validateLogin()){
          setEnquiryOpen(true)
          setSeller(data.owner)
          setItem(data)
          
        }
      }






  return (
     <>
     <Header />
     {enquiryOpen &&<div>
        <Enquiry seller={seller} setEnquiryOpen={setEnquiryOpen} item={item} />
     </div>}
      <div className=" containe">{loading && <h1>Is Loading</h1>}</div>
      {data && (
        <div className="containe">
          <div className="md:flex ">
            <div className="h-full  basis-[50%] ">
              <img src={data?.image} className="object-cover" alt="" />
            </div>
            <div className="mt-3">
              <p className="font-bold text-2xl max-w-[400px]  capitalize mb-4 ">
                {data?.title}
              </p>
              <div className="flex">
                <Rating
                  className="mt-1"
                  name=""
                  defaultValue={5}
                  precision={5}
                  readOnly
                />
                <div className="mt-1">
                  <span className="text-center items-center ml-1 text-[]">
                    {data?.count} Reviews{" "}
                  </span>
                </div>
              </div>
              <p className="max-w-[550px] mt-3 font-medium">
                {data?.description}
              </p>
              <p className="mt-5 font-bold text-xl">$ {data?.price}</p>
              <div className="mt-5">
                {/* <button
                  className="w-12 h-8 rounded-sm  bg-gray-200 mt-10 "
                  // onClick={handleArrowDown}
                >
                  &#8595;
                </button>
                <span className="ml-2">{1}</span>
                <button
                  className="w-12 h-8 rounded-sm  bg-gray-200 ml-1 mt-10 "
                  // onClick={handleArrowUp}
                >
                  &#8593;
                </button> */}
                <button className="w-[400px] border bg-slate-400 rounded-[4px] ml-3 bg-gradient-to-tl from-black text-white shadow-2xl p-1" onClick={sendEnquiry}  >
                  Send Enquiry
                </button>
              </div>
            </div>
          </div>
        
        </div>
      )}
    </>
  )
}

export default ProductPage