import React from 'react'
import { createContext } from 'react';
import Header from '../Header';
import Dashboard from '../../pages/seller/Dashboard';
export const ChatContext=createContext();
const ChatCont = () => {
   
    const [chatOpen, setChatOpen] = useState(false);
    return (
      <>
      <ChatContext.Provider value={{chatOpen, setChatOpen}} >
      <div>
          <Header  />
          <Dashboard />
          <Outlet />
        </div>
       
  
      </ChatContext.Provider>
      
      </>
    
    )
}

export default ChatCont