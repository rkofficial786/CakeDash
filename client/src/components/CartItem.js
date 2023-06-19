import React, { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { toast } from "react-hot-toast";
import Formateprice from "./Formateprice";
import { useCart } from "../context/cartContext";

const CartItem = ({
  name,
  _id,
  description,
  price,
  quantity,
  size,
  updateCartItem,
}) => {
  const [cart, setCart] = useCart();



 


  function removeCartItem(id, size) {
    try {
      let updatedCart = cart.filter(
        (item) => item._id !== id || item.size !== size
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item removed from cart");
    } catch (error) {
      console.log(error);
    }
  }
  // dand d anandoajonjodjaodjaqod
  const [productQuantity, setProductQuantity] = useState(quantity);

  function decreaseQuantity(id) {
    if (productQuantity < 2) {
      setProductQuantity(1);
      return;
    }
    setProductQuantity(productQuantity - 1);
  }

  function increaseQuantity(id) {
    if (productQuantity > 30) {
      setProductQuantity(30);
      return;
    }
   setProductQuantity(productQuantity + 1);
  }

  function calculateItemPrice() {
    let itemPrice = price;
    if (size === "medium") {
      itemPrice *= productQuantity;
    } else if (size === "large") {
      itemPrice *= productQuantity * 2;
    } else {
      itemPrice *= productQuantity * 0.5;
    }
    return itemPrice;
  }

  


  useEffect(() => {
    if (productQuantity !== quantity) {
      const updatedCart = cart.map((item) => {
        if (item._id === _id && item.size === size) {
          return { ...item, quantity: productQuantity };
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      updateCartItem();
    }
  }, [_id, size, quantity, productQuantity, cart, setCart, updateCartItem]);
  
  
  
  if (!cart || cart.length === 0) {
    return null; // Render nothing if cart is undefined or empty
  }
  
  return (
    <div className="">
      <div className="p-8 gap-4 cart-item flex items-center  justify-center w-[500px] h-[200px] ">
        <div>
          <img
            src={`/api/v1/products/product-photo/${_id}`}
            alt=""
            className="w-[250px] min-w-[80px]  h-[160px]"
          />
        </div>
        <div className="flex flex-col gap-4 justify-between">
          <h3 className="md:text-2xl sm:text-[16px] font-bold ">
            {name.substring(0, 30)}...
          </h3>
          <p>{description.substring(0, 100)}...</p>
          <div className="flex items-center gap-2 justify-between">
            <p className="text-green-600 text-xl font-semibold">
              <Formateprice price={calculateItemPrice()} />
            </p>
            <div className="flex items-center justify-center gap-2">
              <AiFillMinusCircle
                onClick={() => decreaseQuantity(_id)}
                className="text-xl cursor-pointer"
              />
              <h1 className="text-2xl">{productQuantity}</h1>
              <AiFillPlusCircle
                onClick={() => increaseQuantity(_id)} // Pass _id as an argument
                className="text-xl cursor-pointer"
              />
            </div>
            <h1 className="md:text-2xl md:block sm:hidden sm:text-lg">{size}</h1>
            <h1 className="md:text-2xl sm:block md:hidden sm:text-lg">{size.substring(0,1).toUpperCase()}</h1>
            <div
              onClick={() => removeCartItem(_id, size)}
              className="text-red-600 text-2xl hover:text-3xl transition-all ease-in-out duration-500 cursor-pointer"
            >
              <AiFillDelete />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-customTooDark my-6"></div>
    </div>
  );
};

export default CartItem;
