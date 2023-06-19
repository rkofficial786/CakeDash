import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsCart, BsFillCartFill, BsFillHandbagFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useAuth } from "../context/auth";
import { IoCart } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Button, Dropdown, Menu } from "antd";
import useCategory from "../hooks/useCategory";
import { useCart } from "../context/cartContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logo from "../Assets/loogo.png"

const Navbar = ({ isCartOpen, setIsCartOpen }) => {
  const navref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const categories = useCategory();
  const handleMenuClick = (e) => {};
  function scrolldown() {
    window.scrollBy({
      top: 300, // Adjust the scroll amount as needed
      behavior: "smooth", // Optional: Add smooth scrolling animation
    });
  }

  const menu = (
    <Menu onClick={handleMenuClick} className="custom-dropdown-menu ">
      {categories.map((c) => (
        <Menu.Item key="item1" className="" onClick={scrolldown}>
          <Link to={`/category/${c.slug}`} className=" hover:bg-gray-200 px-2">
            {" "}
            {c.name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  const [visibleNav, setVisibleNav] = useState(false);

  function toggleNavbar() {
    navref.current.classList.toggle("responsiveNav");
    setVisibleNav(!visibleNav);
    setIsOpen(false);
  }

  const [auth, setAuth] = useAuth();

  function handleLogout() {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.clear();
    window.location.reload();
    toggleNavbar();
  }

  //cart

  function handleCartOpen() {
    setIsCartOpen(!isCartOpen);
    toggleNavbar();
  }

  function handleCartOpen2() {
    setIsCartOpen(!isCartOpen);
    
  }

  const [cart, setCart] = useCart();

  return (
    <div className="navbar h-[80px] flex items-center justify-between text-customWhite relative w-full px-8 z-50">
      <NavLink to={"/"}>
        <img src={logo} className="md:w-[200px]  sm:w-[160px]   " alt="" />
      </NavLink>

      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-5">
        <NavLink className={"sm:block md:hidden"}>
              <li onClick={handleCartOpen2} className=" text-white">
                {cart.length > 0 ? (
                  <div className="relative">
                    <BsFillCartFill className="text-2xl" />
                    <p className="absolute bg-gray-800 h-7 w-7 text-center rounded-full -top-4 -right-4  text-white">{cart.length}</p>
                  </div>
                ) : (
                  <div className="relative">
                    <BsCart />
                   
                  </div>
                )}
              </li>
            </NavLink>

          <ul
            ref={navref}
            className="flex nav-list justify-center items-center text-xl text-customWhite"
          >
            <Link to={"/"}>
              <li onClick={toggleNavbar}>Home</li>
            </Link>

            <li>
              <Dropdown overlay={menu}>
                <Button className="text-customWhite mb-1 border-none text-xl">
                  Menu
                </Button>
              </Dropdown>
            </li>

            <NavLink to={"/contact"}>
              <li onClick={toggleNavbar}>Contact</li>
            </NavLink>
            <NavLink className={"sm:hidden md:block"}>
              <li onClick={handleCartOpen} className=" text-white">
                {cart.length > 0 ? (
                  <div className="relative">
                    <BsFillCartFill className="text-2xl" />
                    <p className="absolute bg-gray-800 h-7 w-7 text-center rounded-full -top-4 -right-4  text-white">{cart.length}</p>
                  </div>
                ) : (
                  <div className="relative">
                    <BsCart />
                   
                  </div>
                )}
              </li>
            </NavLink>

            {!auth.user ? (
              <NavLink to={"/login"}>
                <li className="btn1" onClick={toggleNavbar}>
                  Sign In
                </li>
              </NavLink>
            ) : (
              <div className="dropdown">
                <button className="navbar-toggle" onClick={toggleDropdown}>
                  <div className="flex items-center py-3 justify-center gap-1">
                    <p className="text-customViloet">
                      Hi, {auth.user.name.split(" ")[0]}
                    </p>
                    <div>
                      <RiArrowDropDownLine />
                    </div>
                  </div>
                </button>
                {isOpen && (
                  <div className="dropdown-menu">
                    <NavLink
                      onClick={toggleNavbar}
                      to={`/dashboard/${
                        auth?.user?.role === "Admin" ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </NavLink>
                    <NavLink to={"/dashboard/user/profile"}>Profile</NavLink>
                    <NavLink to={"/dashboard/user/orders"}>Orders</NavLink>
                    <NavLink
                      className={"btn-error"}
                      onClick={handleLogout}
                      to={"/"}
                    >
                      Logout
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </ul>

       
        </div>

        <div onClick={toggleNavbar} className="nav-btn hidden">
          {visibleNav === false ? (
            <NavLink>
              <GiHamburgerMenu className="text-customViloet" />
            </NavLink>
          ) : (
            <NavLink>
              <ImCross className="text-customViloet" />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
