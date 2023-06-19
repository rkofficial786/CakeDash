import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Formateprice from "./Formateprice";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

import axios from "axios";
import { AiFillStar } from "react-icons/ai";
// import useHistory from "react"

const ProductCard = ({ _id, name, price, description, slug, totalrating }) => {
  const [cart, setCart] = useCart();
  

  function handleAddCart(e) {
    e.preventDefault();

    const existingCartItem = cart.find((item) => item._id === _id);

    if (existingCartItem) {
      const updatedCart = cart.map((item) => {
        if (item._id === _id) {
          return {
            ...item,
            quantity: item.quantity + 1, // Increase the quantity by 1
          };
        }
        return item;
      });

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const cartItem = {
        _id,
        name,
        price,
        description,
        slug,
        quantity: 1,
        size:"medium", // Set the initial quantity to 1 for a new product
      };

      setCart([...cart, cartItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));
    }

    toast.success("Added to cart");
  }

  return (
    < >
    <div className="border-2 rounded-xl p-[6px] border-collapse border-gray-700 flex">
      {" "}
      <NavLink
        to={`/product/${slug}`}
        className="w-[350px] max-w-md p-4  bg-gray-800 h-[450px] shadow-2xl rounded-xl  hover:shadowcss hover:-translate-y-2 transition-all duration-500"
      >
        <div className="relative w-[320px]">
          <img
            src={`/api/v1/products/product-photo/${_id}`}
            alt={name}
            className="object-contain w-full h-48 rounded-xl "
          />
          {/* <figcaption className="">{category}</figcaption> */}
        </div>

        <div className="hover:translate-y-4">
          <div className="mt-4">
            <h4 className="text-lg font-medium  text-customWhite">
              {name.substring(0, 30)}
            </h4>
            <h4 className="mt-2 text-lg font-medium text-green-600">
              <Formateprice price={price} /> / KG
            </h4>

            <p className="flex items-center  gap-[2px]">
              <span className="text-customWhite"> {totalrating}</span>
              <AiFillStar className="text-yellow-400" />
            </p>
          </div>
          <div className="mt-2">
            <p className="text-sm min-h-[50px] text-customWhite">
              {description.substring(0, 80)}...
            </p>
          </div>

          <div className="my-4  ">
            <button class="btn4" onClick={handleAddCart}>
              <span>Add to cart</span>
              <svg
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <defs> </defs>{" "}
                  <g id="cart">
                    {" "}
                    <circle
                      r="1.91"
                      cy="20.59"
                      cx="10.07"
                      class="cls-1"
                    ></circle>{" "}
                    <circle
                      r="1.91"
                      cy="20.59"
                      cx="18.66"
                      class="cls-1"
                    ></circle>{" "}
                    <path
                      d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10"
                      class="cls-1"
                    ></path>{" "}
                    <polyline
                      points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91"
                      class="cls-1"
                    ></polyline>{" "}
                  </g>{" "}
                </g>
              </svg>
            </button>
          </div>
        </div>
      </NavLink>
      </div>
    </>
  );
};

export default ProductCard;
