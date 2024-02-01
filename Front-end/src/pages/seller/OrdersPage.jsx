import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

import axios from "axios";
import { useDataLayerValue } from "../../context/Datalayer";
import OrderCard from "../OrderCard";
import { Divider } from "@mui/material";
const OrdersPage = () => {
  const [category, setCategory] = useState("all");
  const [{ user }] = useDataLayerValue();
  const [orders, setOrders] = useState([]);
  const[chatOpen,setChatOpen]=useState(false)

  useEffect(() => {
    const getOrders = async () => {
      const id = user.id;
      try {
        const order = await axios.post("http://localhost:3500/api/order", {
          id,
        });
        if (order.data.length !== 0) {
          setOrders(order.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);
  return (
    <div>
      <Header setChatOpen={setChatOpen} />
      <div className=" containe ">
        <div className="mt-5">
          <p className="text-orange-600 font-extrabold">All Orders</p>
        </div>
        <div className="flex mt-4 gap-8">
          <button
            className={`${
              category === "all" && " bg-orange-700 text-white "
            } p-1 w-[100px] rounded-2xl`}
          >
            All
          </button>
          <button
            className={`${
              category === "unpaid" && "bg-orange-700 text-white "
            } p-1 w-[100px] rounded-2xl`}
          >
            Unpaid
          </button>
          <button
            className={`${
              category === "shipped" && "bg-orange-700 text-white "
            } p-1 w-[120px] rounded-2xl`}
          >
            To be shipped
          </button>
          <button
            className={`${
              category === "received" && "bg-orange-700 text-white "
            } p-1 w-[120px] rounded-2xl`}
          >
            To be Received
          </button>
          <button
            className={`${
              category === "closed" && "bg-orange-700 text-white "
            } p-1 w-[140px] rounded-2xl`}
          >
            Completed/closed
          </button>
        </div>
        <div className="w-[600px] mt-2">
          <Divider />
        </div>
        <div className="bg-gray-300 flex justify-between mt-5 h-12 pt-3 rounded-md px-3">
          <p>Seller info</p>
          <p>Product info</p>
          <p>Amount</p>
          <p>Status</p>
          <p>Action</p>
        </div>
        {/* order card */}
        <div className=" ">
          {orders.length !== 0 &&
            orders.map((order) => <OrderCard order={order} />)}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
