import React from 'react'
import { useDataLayerValue } from '../context/Datalayer'
import { toast } from 'react-toastify'

const useAuth = () => {
  const[{user}]=useDataLayerValue()

    const validateLogin=()=>{
      if(!user){
        toast.error("You must first Login",{position:"bottom-right"})
        return false
      }else return true
        
    }




  return (
       {validateLogin}
  )
}

export default useAuth