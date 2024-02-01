import React, { useEffect, useState } from 'react'
import { truncateString } from '../../utils/common'
import DeleteIcon from "@mui/icons-material/Delete";
import { useDataLayerValue } from '../../context/Datalayer';


const Order = ({order,i,setOrders,orders,setTotals}) => {
    const [total, setTotal] = useState();
    const [qty,setQty]=useState()
    const [price,setprice]=useState()


      
 


    const handlePrice=async(e)=>{
      const newPrice=e.target.value
      setprice(newPrice)
      let basket=[...orders];
      const indexi=basket.findIndex(
        (item) => item._id === order._id
        );
  
        if(indexi!==-1){
          var newItem=basket[indexi]
          newItem={...newItem,price:newPrice}
          basket[indexi]=newItem
          setOrders(basket)
        }
        
  


    }
    const handleQty=(e)=>{
      const newQty=e.target.value
      setQty(newQty)
      let basket=[...orders];
      const indexi=basket.findIndex(
        (item) => item._id === order._id
        );
  
        if(indexi!==-1){
          var newItem=basket[indexi]
          newItem={...newItem,quantity:newQty}
          basket[indexi]=newItem
          setOrders(basket)
        }
  


    }


   




  return (
    <div className="flex overflow-auto  mt-5" key={i}>
              <div>
                <img
                  className="w-[62px] h-[62px] object-contain"
                  src={order.image}
                  alt=""
                />
              </div>
              <div>
                {order.title && (
                  <p className="max-w-[200px] ml-3">
                    {truncateString(order?.title, 30)}
                  </p>
                )}
              </div>
              <div className="items-center justify-center h-full'">
                <input type="number" onChange={handlePrice} min={1} placeholder='enter price ' className='bg-gray-300 px-1 mt-1 w-[110px]' />
              </div>
              <div className="ml-[30px] max-w-[80px] min-w-[80px] ">
              <input  type="number" onChange={handleQty} placeholder=' quantity ' min={1} className='bg-gray-300 px-1 mt-1 w-[90px]' />
          
        </div>
        <div className="">
          <p className=" max-w-[70px] min-w-[70px]   ml-[30px]">{(order.quantity*order.price).toFixed(2)}</p>
        </div>
        <div className="mr-3 cursor-pointer" >
          <DeleteIcon sx={{ color: "red" }} />
        </div>


            </div>
  )
}

export default Order