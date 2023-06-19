import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import OrderAdminCard from "../../components/OrderAdminCard";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  console.log("orders" ,orders);

  return (
    <div className="gap-4">
      <div className="">
        <AdminMenu />
      </div>
      <div className="flex gap-7   items-center flex-col">
        <div className="p-4  text-4xl font-bold">All Orders</div>

        {/* full order data */}
        <h1>
          {orders?.map((order, index) => {
            return <OrderAdminCard {...order} key={index} index={index} />;
          })}
        </h1>
      </div>
    </div>
  );
};

export default AdminOrders;
