import React, { useEffect, useState } from "react";
import Usermain from "../../components/Usermain";
import { useAuth } from "../../context/auth";
import axios from "axios";
import OrderCard from "../../components/OrderCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/orders`
      );
      setOrders(data);
      
    } catch (error) {
      console.log(error);
    }
  };
 

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <div className="grid gap-4">
      <div className="">
        <Usermain />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="p-4  text-4xl font-bold">Orders</div>
       <div>
        {orders.length ===0? (<h1 className="h-[60vh] text-3xl flex justify-center items-center">No Order History</h1>):(<div> <h1>
          {orders?.map((order, index) => {
            return <OrderCard {...order} index={index} />;
          })}
        </h1></div>)}
       </div>
      </div>

     

      
    </div>
  );
};

export default Orders;
