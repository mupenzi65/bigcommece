import React, { createContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react'
export const ChatContext=createContext();

const Layout = () => {
  
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <>
    <ChatContext.Provider value={{chatOpen, setChatOpen}} >
    <div>
        
        <Outlet />
      </div>
      <Footer />

    </ChatContext.Provider>
    
    </>
  
  )
}

export default Layout