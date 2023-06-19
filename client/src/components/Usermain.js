import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Cart from "./Cart";


const Usermain = () => {


  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      {" "}
      <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <div className="admin-menu bg-gray-800  ">
        <ul className="py-4 flex items-center md:justify-center sm:justify-center  sm:gap-2 admin-list ">
          <li>
            <NavLink
              to="/dashboard/user/profile"
              className="block py-2 px-6 rounded-xl text-2xl bg-gray-800 text-customWhite shadow-xl hover:bg-gray-900"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/orders"
              className="block py-2 px-6 text-2xl rounded-xl bg-gray-800 text-customWhite shadow-xl hover:bg-gray-900"
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Usermain;
