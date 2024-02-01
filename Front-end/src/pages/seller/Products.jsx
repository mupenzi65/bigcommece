import React, { useState } from "react";
import { useDataLayerValue } from '../../context/Datalayer';
import Dashboard from "./Dashboard";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import { Divider } from "@mui/material";
import StepOne from "./components/StepOne";

const Products = () => {
  const [{ user,seller }, dispatch] = useDataLayerValue();
  const [chatOpen,setChatOpen]=useState(false)
  

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
          <h2 className="text-2xl mt-2 ml-2 font-bold text-gray-800">
            Add Products
          </h2>
          <div className="justify-center mt-12 items-center mx-auto">
            <div className="mt-12">
              <StepOne
             
              />
            </div>
          </div>
        </div>
    
    </>
  );
};

export default Products;
