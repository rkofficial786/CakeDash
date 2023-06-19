import React from "react";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <div className="grid grid-rows-2 gap-4">
        <Helmet>
            <title>Admin Dashboard</title>
          </Helmet>
      <div className="col-rows-1">
        <AdminMenu />
      </div>
      <div className="col-rows-1 text-center">
        <div className="p-4 ">
          <h3 className="text-3xl font-bold">Admin Name: {auth?.user?.name}</h3>
          <h3 className="text-3xl font-bold">
            Admin Email: {auth?.user?.email}
          </h3>
          <h3 className="text-3xl font-bold">Admin Role: {auth?.user?.role}</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
