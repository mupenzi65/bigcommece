import React, { useEffect, useState } from 'react'

const RecentOrder = ({order}) => {
  const [total,setTotal]=useState()

  useEffect(()=>{





  },[])

  useEffect(()=>{
    var totals=''
    const total=order.products.map((product)=>(product.price*product.quantity).toFixed(2))
    
    let result=total.reduce((a,b)=>{
      return parseFloat(a)+parseFloat(b)
    })
    setTotal(result)
    

  })






  return (
    <>
    <div className="containe">
     

    <div className="flex ml-2 mb-3   mt-3 ">
        <p className='text-sm font-semibold text-gray-600 w-[130px] ' >{order.id}</p>
        <p className='text-sm font-semibold text-gray-600 w-[200px] '>mupenzi abdillah</p>
        <p className='text-sm font-semibold text-gray-600 w-[200px]'>{order.createdat.split('T')[0]}</p>
        <p className='text-sm font-semibold text-gray-600 w-[150px]'>$ {total}</p>
        <p className='text-sm px-7 mx-2  w-[200px]   font-semibold text-green-600 '>{order.status}</p>
        
        
    </div>
    <div className='w-full border-b border mt-1 h-0  border-gray-300'></div>
    </div>
    </>
  )
}

export default RecentOrder