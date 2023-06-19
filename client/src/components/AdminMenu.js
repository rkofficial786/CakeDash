import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Cart from "./Cart";

const AdminMenu = () => {

  const [isCartOpen ,setIsCartOpen] =useState(false)
  return (
    <>
      {" "}
      <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <div className="admin-menu bg-gray-800  w-full">
        <ul className="p-4 flex items-center flex-wrap justify-evenly admin-list ">
          <li>
            <NavLink
              to="/dashboard/admin/create-category"
              className="block py-2 px-6 rounded-xl text-2xl bg-gray-800 text-customWhite shadow-xl hover:bg-gray-900"
            >
              Category
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/create-products"
              className="block py-2 px-6 text-2xl rounded-xl bg-gray-800 text-customWhite shadow-xl hover:bg-gray-900"
            >
              Create Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/products"
              className="block py-2 px-6 text-2xl rounded-xl bg-gray-800 text-customWhite shadow-xl hover:bg-gray-900"
            >
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/admin/orders"
              className="block py-2 px-6 text-2xl rounded-xl bg-gray-800 text-customWhite shadow-xl hover:bg-gray-900"
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/discount"
              className="block py-2 px-6 text-2xl rounded-xl bg-gray-800 text-customWhite shadow-xl hover:bg-gray-900"
            >
              Discounts
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
