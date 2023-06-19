import React from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/auth";
import CartItem from "./CartItem";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Formateprice from "./Formateprice";
import { Helmet } from "react-helmet";
import { AiOutlineClose } from "react-icons/ai";

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  function handleAddress() {
    navigate("/dashboard/user/profile");
  }

  function handleCheckout() {
    navigate("/checkout", { state: { cart, totalPrice } });
  }

  const cartLength = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="">
      {isCartOpen && (
        <div className="fixed h-screen flex flex-col bg-gray-800">
          <Helmet>
            <title>Your Cart</title>
          </Helmet>
          <div className="text-center">
            <h1 className="text-3xl mt-4">
              {auth?.token ? (
                <div className="flex items-center justify-center gap-[50px]">
                  Hello, {auth?.user?.name}
                  <span onClick={() => setIsCartOpen(!isCartOpen)} className="relative -top-3 -right-8">
                    <AiOutlineClose />
                  </span>
                </div>
              ) : (
                <div>
                  <h1>Please Login to Checkout</h1>
                </div>
              )}
            </h1>
            {cart.length > 0 ? (
              ""
            ) : (
              <div className="flex-col w-[500px] flex justify-center">
                <h2 className="text-2xl">Your cart is empty</h2>
                <Link to={"/"}>
                  <button className="btn">Shop Now</button>
                </Link>
              </div>
            )}
          </div>

          {/* Cart items */}
          <div className={`flex items-center justify-center  overflow-y-auto ${cart.length === 0 ? "" : "overflow-y-scroll"}`} style={{ maxHeight: "calc(100vh - 200px)" }}>
            {cart.length > 0 ? (
              <div className="w-400">
                <div className="flex flex-wrap justify-center items-center">
                  {cart.map((item, index) => {
                    return <CartItem key={index} {...item} />;
                  })}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          {/* Total Amount */}
          {cart.length > 0 && (
            <div className="flex justify-center flex-col sm:w-auto md:w-[500px] text-center gap-5 items-center bg-gray-900 fixed bottom-0 right-0 p-4">
              <div className="text-xl">
                Total Amount:{" "}
                <span className="text-[24px] font-bold">
                  <Formateprice price={totalPrice} />
                </span>{" "}
              </div>
              {auth?.token ? (
                auth?.user?.address && auth?.user?.phone ? (
                  <button onClick={() => handleCheckout()} className="btn ml-4">
                    Check out
                  </button>
                ) : (
                  <div>
                    <h1 className="text-lg shadow-md">
                      Phone no. and Address are required to checkout
                    </h1>
                    <button onClick={() => handleAddress()} className="btn mt-2">
                      Add Details
                    </button>
                  </div>
                )
              ) : (
                <button
                  onClick={() => navigate("/login", { state: "/cart" })}
                  className="btn ml-4"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
