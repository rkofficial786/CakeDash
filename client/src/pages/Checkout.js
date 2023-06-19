import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Formateprice from "../components/Formateprice";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { ImCross } from "react-icons/im";

import UpdateuserAddress from "../components/UpdateuserAddress";

const Checkout = ({
  calculateTotalPrice,
  isCheckoutModalOpen,
  setIsCheckoutModalOpen,
}) => {
  const location = useLocation();
  // const calculateTotalPrice = location.state?.calculateTotalPrice || 0;

  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [isAddressOpen, setISAddressOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) {
      const storedAuth = JSON.parse(localStorage.getItem("auth2"));
      if (storedAuth?.token) {
        setAuth(storedAuth);
      } else {
        navigate("/login");
      }
    } else if (cart.length === 0) {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      if (storedCart) {
        setCart(storedCart);
      } else if (cart.length === 0) {
        navigate("/");
      } else {
        navigate("/");
      }
    }
  }, [auth?.token, navigate, cart.length, setAuth, setCart]);

  // const totalPrice = () => {
  //   try {
  //     let total = 0;
  //     carts?.map((item) => {
  //       total = total + item.price;
  //     });
  //     return total;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

 

  const [applycode,setApplycode] =useState("")
  const [discountPrice,setDiscountedPrice] =useState(calculateTotalPrice)
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
  
      // Create an array to store the modified cart items with quantity
      const modifiedCart = cart.map((item) => {
        return {
          ...item,
          quantity: item.quantity, // Add the quantity property
        };
      });
  
      const { data } = await axios.post(`/api/v1/products/braintree/payment`, {
        nonce,
        cart: modifiedCart, // Pass the modified cart with quantity to the backend
        totalPrice: discountPrice, // Use the discounted price instead of calculateTotalPrice
      });
  
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (isCheckoutModalOpen) {
      // Pause scrolling when the modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Resume scrolling when the modal is closed
      document.body.style.overflow = "auto";
    }
  }, [isCheckoutModalOpen]);



  //discount
  const[discounts,setDiscounts] =useState(0)

  async function handleApplyCode() {
    if(discounts>0) {
      toast.error("Coupon already applied")
      return
    }

    try {
      const response = await axios.post("/api/v1/coupon/apply-coupon", {
        code: applycode,
        totalPrice: discountPrice,
      });
  
      const { data } = response;
  
      if (data.success) {
        const discountedPrice = data.discountedPrice;
        
        setDiscountedPrice(discountedPrice);
        setDiscounts(data.discountAmount)
        toast.success(data.message)
      } else {
        console.error("Failed to apply the coupon:", data.message);
        toast.error(data.message)
      }
    } catch (error) {
      console.error("An error occurred while applying the coupon:", error);
      toast.error("Coupon not applied")
    }
  }
  

  return (
    <div className="flex max-h-[80vh] checkout flex-grow overflow-y-scroll  relative z-[101] justify-evenly sm:w-auto md:w-[800px] sm:gap-8  flex-wrap">
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      {!isAddressOpen && (
        <div className="">
          <h1 className="text-3xl text-center ">Shipping Details</h1>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-4">{auth?.user?.name}</h2>
            <p className="text-lg text-gray-600 mb-2">{auth?.user?.email}</p>
            <p className="text-lg text-gray-600 mb-2">{auth?.user?.phone}</p>
            <p className="text-lg text-gray-600 mb-2 w-[370px]">
              {auth?.user?.address}
            </p>
            <p className="text-lg text-gray-600 mb-2">{auth?.user?.pin}</p>

            <button
              onClick={() => setISAddressOpen(true)}
              className="btn btn-warning"
            >
              Edit
            </button>
          </div>

          <div
            onClick={() => setIsCheckoutModalOpen(false)}
            className="absolute text-black top-0 sm:left-16 md:left-0 cursor-pointer"
          >
            <ImCross />
          </div>
          <div class="border border-gray-300 flex justify-between items-center rounded-md px-4 py-2">
            <input
              class="flex-1 px-2 py-1 bg-transparent focus:outline-none"
              type="text"
              placeholder="Enter coupon code"
              value={applycode}
              onChange={(e)=> setApplycode(e.target.value)}
            />
            <button onClick={handleApplyCode} class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
              Apply
            </button>
          </div>

          <div className="px-5">
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-success my-10 text-center"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? (
                      "Processing ...."
                    ) : (
                      <h1>
                        {discountPrice > 999
                          ? `Pay ₹${discountPrice}`
                          : `Pay ₹${discountPrice + 60}`}
                      </h1>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* upadte addresss */}

      {isAddressOpen && (
        <div>
           <div
            onClick={() => setISAddressOpen(false)}
            className="absolute text-black top-0  cursor-pointer"
          >
            <ImCross />
          </div>
          <UpdateuserAddress
            isAddressOpen={isAddressOpen}
            setISAddressOpen={setISAddressOpen}
          />
        </div>
      )}

      <div>
        <div className="border-2">
          <h1 className="text-3xl text-center">Cart Details</h1>

          <div className="shadow-xl text-center flex flex-wrap flex-col p-6 mt-9 items-center">
            <h1 className="text-2xl">Total Unique Items: {cart.length}</h1>
            <p className="shadow-xl p-2 my-2">
              Free Delivery on orders above <Formateprice price={999} />
            </p>
            <div className="text-xl">
              <h2>
                Total Price: <Formateprice price={calculateTotalPrice} />{" "}
              </h2>
              <h2>Discounts applied: <Formateprice price={Math.round(discounts)}/> </h2>
              <h2>
                Shipping fee :{" "}
                {discountPrice > 999 ? (
                  <span>
                    <Formateprice price={0} />
                  </span>
                ) : (
                  <span>
                    <Formateprice price={60} />
                  </span>
                )}{" "}
              </h2>
            </div>

            <div className="w-full h-[1px] my-1 bg-customTooDark"></div>

            <div className="flex justify-center items-center">
              <span className="mr-2 text-2xl text-gray-700 ">Grand Total:</span>
              {discountPrice > 999 ? (
                <h1 className="text-2xl text-green-600">
                  <Formateprice price={discountPrice} />
                </h1>
              ) : (
                <h1 className="text-2xl text-green-600">
                  <Formateprice price={discountPrice + 60} />
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
