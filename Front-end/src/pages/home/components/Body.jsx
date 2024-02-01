import React, { useContext, useEffect, useState } from "react";
import DevicesIcon from "@mui/icons-material/Devices";
import KitchenIcon from "@mui/icons-material/Kitchen";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import DiamondIcon from "@mui/icons-material/Diamond";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import useproducts from "../../../hooks/useproducts";
import ProductCard from "../../../components/ProductCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Avatar, Divider } from "@mui/material";
import Chat from "../../../components/chat/Chat";
import Enquiry from "./Enquiry";
import { useDataLayerValue } from "../../../context/Datalayer";
import axios from "axios";

const Body = ({chatOpen,setChatOpen,searchPattern,setSearchPattern}) => {
  const [result, setResult] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState([]);
  const [category,setCategory]=useState(null)
  const [item,setItem]=useState(null)
  const [enquiryOpen,setEnquiryOpen]=useState(false)
  const [seller,setSeller]=useState(null)
  const [products,SetProducts]=useState([])
  const [pageNum,setPageNum]=useState()
 
  const handleChange = async(event, value) => {
  const page=value
    const resp = await axios.post("http://localhost:3500/api/products",{page})
    if(Array.isArray(resp.data.data)){
      setData([])
      
      setData(resp.data.data)
  
  }
    
  };

  useEffect(()=>{

    const fetch = async()=>{
      const page=1
 
  
  try{
    const resp = await axios.post("http://localhost:3500/api/products",{page})
   
  if(Array.isArray(resp.data.data)){
    if(resp.data.data.length==0){
      setIsloading(false)
    }else{
      setData(resp.data.data)
      setPageNum(resp.data.pagination.totalPage)
      setIsloading(false)
      
    }
  }
  
  
  }catch(error){
    console.error(error)
  }
    }
    fetch()
  },[])


  useEffect(()=>{
    const searchProducts= async()=>{
   

      try {
         
          const res=await axios.post(`http://localhost:3500/api/product/search`,{searchPattern})
          
          if(res.data.length !==0){
              setData([])
              console.log(res.data)
              setData(res.data)
              setSearchPattern(null)
          }
        
          
      } catch (error) {
         console.error(error)
      }
  
  }
  searchProducts()

  
  

    



  },[searchPattern])

  const handleCategory= async(key)=>{
   

    try {
       
        const res=await axios.get(`https://fakestoreapi.com/products/category/${key}`)
        if(Array.isArray(res.data)){
            setData([])
            setCategory(key)
            setData(res.data)
        
        }
      
        
    } catch (error) {
       console.error(error)
    }

}



  return (
    <div className="">
      <div className=" containe mt-5">
        <div className="">{isLoading && <h1>is loading</h1>}</div>
        {data.length !== 0 && (
          <div className="flex justify-between  mx-6  flex-wrap gap-12">
            <div className="md:min-w-[300px] min-w-[330px] max-w-[330px] h-[500px] shadow-lg bg-white rounded-md">
              <p className="mx-3 mt-4 font-bold">Shop by category</p>
              <div className="flex-col  ">
                <div onClick={()=>handleCategory("electronics")} className={`cursor-pointer ${category=='electronics' && 'bg-orange-500 text-white rounded-lg px-1'} hover:underline    flex gap-2 mx-2 mt-4`}>
                  <DevicesIcon />
                  <p>Consumer electronics</p>
                </div>
                <div className="cursor-pointer hover:underline flex gap-2 mx-2 mt-6">
                  <KitchenIcon />
                  <p>Home & Garden</p>
                </div>
                <div className="cursor-pointer hover:underline flex gap-2 mx-2 mt-6">
                  <FitnessCenterIcon />
                  <p>Sports & Entertainment</p>
                </div>
                <div className="cursor-pointer hover:underline flex gap-2 mx-2 mt-6">
                  <PrecisionManufacturingIcon />
                  <p>Industrial Machinery</p>
                </div>
                <div className="cursor-pointer hover:underline flex gap-2 mx-2 mt-6">
                  <LocalMallIcon />
                  <p>Packaging & Printing</p>
                </div>
                <div  onClick={()=>handleCategory("jewelery")} className={`cursor-pointer ${category=='jewelery' && 'bg-orange-500 text-white rounded-lg px-1'} hover:underline    flex gap-2 mx-2 mt-4`}>
                  <DiamondIcon />
                  <p>Jewelry</p>
                </div>
                <div className="cursor-pointer hover:underline flex gap-2 mx-2 mt-6">
                  <ChildCareIcon />
                  <p>Kids & Toys</p>
                </div>
              </div>
            </div>
            {data?.map((product, index) => (
              <ProductCard setSeller={setSeller} setItem={setItem}  enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} key={index} product={product} />
            ))}
          </div>
        )}
        { chatOpen && <Chat setChatOpen={setChatOpen} />}
        {enquiryOpen && <Enquiry seller={seller} setEnquiryOpen={setEnquiryOpen} item={item} />}
        <div className="h-[50px] w-full shadow-2xl  flex mt-12 bg-white">
          <div className="mx-auto">
            <Stack spacing={2}>
              <Pagination
                count={pageNum}
                
                   onChange={handleChange}
                color="primary"
                renderItem={(item) => (
                  <PaginationItem
                    
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                  />
                )}
              />
            </Stack>
          </div>
        </div>
      </div>
      <hr className="bg-gray-200 w-full " />
    </div>
  );
};

export default Body;
