import React, { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/auth";
import CartItem from "./CartItem";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Formateprice from "./Formateprice";
import { Helmet } from "react-helmet";
import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import Checkout from "../pages/Checkout";

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      setTimeout(() => {
        setCartVisible(true);
      }, 100);
    } else {
      setCartVisible(false);
    }
  }, [isCartOpen]);

  function handleAddress() {
    navigate("/dashboard/user/profile");
  }

  // function handleCheckout() {
  //   navigate("/checkout", { state: { cart, calculateTotalPrice:calculateTotalPrice() } });
  // }
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  function handleCheckout() {
    setIsCheckoutModalOpen(true);
    setIsCartOpen(false);
  }

  const cartLength = cart.reduce((total, item) => total + item.quantity, 0);

  function updateCartItem(updatedItem) {
    try {
      const updatedCart = cart.map((item) => {
        if (item._id === updatedItem._id && item.size === updatedItem.size) {
          return updatedItem;
        }
        return item;
      });
      setCart(updatedCart);
    } catch (error) {
      // console.log(error);
    }
  }

  function calculateTotalPrice() {
    return cart.reduce((total, item) => {
      let itemPrice = item.price;
      if (item.size === "medium") {
        itemPrice *= item.quantity;
      } else if (item.size === "large") {
        itemPrice *= item.quantity * 2;
      } else {
        itemPrice *= item.quantity * 0.5;
      }
      return total + itemPrice;
    }, 0);
  }


  useEffect(() => {
    if (isCheckoutModalOpen) {
      // Pause scrolling when the modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Resume scrolling when the modal is closed
      document.body.style.overflow = 'auto';
    }
  }, [isCheckoutModalOpen]);
 
  return (
    <div>
      {isCartOpen && (
        <div
          className={`fixed top-0 right-0  bottom-0 md:w-[500px] sm:w-[360px] bg-gray-800 sm:bg-opacity-50 md:bg-opacity-100 backdrop-blur-xl transition-all ease-in-out z-[101]  duration-500 ${
            cartVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full h-full flex flex-col pb-[150px]">
            <div
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative cursor-pointer left-4 top-5 text-3xl"
            >
              <BiArrowBack />{" "}
            </div>
            {/* Cart items */}
            <div className="flex flex-col flex-grow cart-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              {cart.length > 0 ? (
                <div className="flex my-4 overflow-x-hidden flex-wrap justify-center items-center">
                  {cart.map((item, index) => {
                    return (
                      <CartItem
                        key={index}
                        updateCartItem={updateCartItem}
                        {...item}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-grow items-center justify-center">
                  <p className="text-2xl">No items in the cart</p>
                </div>
              )}
            </div>
          </div>

          <div>
            {/* Total Amount */}
            {cart.length > 0 && (
              <div className="flex justify-center flex-col sm:w-screen md:w-[500px] text-center gap-5 items-center bg-gray-900 fixed bottom-0 right-0 p-4">
                <div className="text-xl">
                  Total Amount:{" "}
                  <span className="text-[24px] font-bold">
                    <Formateprice price={calculateTotalPrice()} />
                  </span>{" "}
                </div>
                {auth?.token ? (
                  auth?.user?.address && auth?.user?.phone && auth?.user?.pin  ? (
                    <button
                      onClick={() => handleCheckout()}
                      className="btn ml-4"
                    >
                      Check out
                    </button>
                  ) : (
                    <div>
                      <h1 className="text-lg shadow-md">
                        Phone no. and Address are required to checkout
                      </h1>
                      <button
                        onClick={() => handleAddress()}
                        className="btn mt-2"
                      >
                        Add Details
                      </button>
                    </div>
                  )
                ) : (
                  <button
                    onClick={() => navigate("/login", { state: "" })}
                    className="btn ml-4"
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {/* checkout modal */}
      <div>
        {" "}
        {isCheckoutModalOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 z-[102] bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8">
              <Checkout
                cart={cart}
                calculateTotalPrice={calculateTotalPrice()}
                isCheckoutModalOpen={isCheckoutModalOpen}
                setIsCheckoutModalOpen={setIsCheckoutModalOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
