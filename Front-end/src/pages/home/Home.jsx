import React, { useState } from 'react'
import Hero from './components/Hero'
import Body from './components/Body'
import Header from '../../components/Header'

const Home = () => {
  const[chatOpen,setChatOpen]=useState(false)
  const [searchPattern,setSearchPattern]=useState()
  return (
    <div className='bg-gray-50'>
      <Header setSearchPattern={setSearchPattern} setChatOpen={setChatOpen} />
      <Hero />
      <Body setSearchPattern={setSearchPattern}  searchPattern={searchPattern}   chatOpen={chatOpen} setChatOpen={setChatOpen} />
    </div>
  )
}

export default Home