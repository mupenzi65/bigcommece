import React from 'react'
import { useQuery } from 'react-query'
import { getnotifications } from '../utils/api'

const useNotification = () => {
    const {data,isError,isLoading,refech}=useQuery('getNotification',getnotifications,{refetchOnWindowFocus:false})





  return (
    {data}
  )
}

export default useNotification