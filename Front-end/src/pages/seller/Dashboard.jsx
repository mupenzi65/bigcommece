import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { Divider } from "@mui/material";
import SellerChat from "./SellerChats/SellerChat";
import Chat from "../../components/chat/Chat";

import  { ChatContext } from "../../components/chat/ChatCont";
import Body from "./components/Body";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const[chatOpen,setChatOpen]=useState(false)
  return (
    <div>
      <div className="">
        <div className=" bg-[#003366] h-[100px]">
          <Topbar chatOpen={chatOpen} setChatOpen={setChatOpen} />
        </div>
        <Divider />
        <div className="flex ">
       <div className={`md:min-w-[220px] hidden md:block  bg-[#003366]`}>
            <Sidebar
            
            />
          </div>
          <div className="flex gap-2 ">
            <div className="md:hidden block" onClick={()=>setSidebarOpen((prev)=>!prev)}  >
            <MenuOpenIcon sx={{color:'black'}}   />
            </div>
             <div className="relative">
              
                <div className="absolute top-0 bg-[#003366]">
                {sidebarOpen && (<Sidebar />)}
                </div>
              
             </div>
             <Body />
             { chatOpen && <Chat chatOpen={chatOpen} setChatOpen={setChatOpen}  />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
