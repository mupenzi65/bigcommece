import React from 'react'
import { useQuery } from 'react-query'
import { getAllProducts } from '../utils/api'

const useproducts = () => {
   
     const {data,isError,isLoading,refetch}=useQuery('allProducts',getAllProducts,{refetchOnWindowFocus:false})




  return {
    data,isError,isLoading,refetch
  }
    
  
}

export default useproducts