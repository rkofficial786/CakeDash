import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Formateprice from "../components/Formateprice";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

const Checkout = () => {
  const location = useLocation();
  const calculateTotalPrice = location.state?.calculateTotalPrice || 0;

  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();

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

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`/api/v1/products/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-evenly sm:gap-8 mt-[100px] flex-wrap">
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="">
        <h1 className="text-3xl text-center ">Shipping Details</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-4">{auth?.user?.name}</h2>
          <p className="text-lg text-gray-600 mb-2">{auth?.user?.email}</p>
          <p className="text-lg text-gray-600 mb-2">{auth?.user?.phone}</p>
          <p className="text-lg text-gray-600 mb-2 w-[370px]">
            {auth?.user?.address}
          </p>

          <button
            onClick={() => navigate("/dashboard/user/profile")}
            className="btn"
          >
            Edit
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
                  className="btn my-10 text-center"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? (
                    "Processing ...."
                  ) : (
                    <h1>
                      {calculateTotalPrice > 999
                        ? `Pay ₹${calculateTotalPrice}`
                        : `Pay ₹${calculateTotalPrice + 60}`}
                    </h1>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="border-2">
          <h1 className="text-3xl text-center">Cart Details</h1>

          {cart.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center shadow-xl p-5 "
              >
                <div>
                  <img
                    src={`/api/v1/products/product-photo/${item._id}`}
                    alt=""
                    className="w-[100px] h-[120px]"
                  />
                </div>
                <div>
                  <h1>{item?.name.substring(0, 10)}</h1>
                  <h1>{item?.description.substring(0, 30)}</h1>
                  <div className="flex items-center justify-between ">
                    <h1>
                      <Formateprice price={item?.price} />
                    </h1>
                    <h1>{item?.quantity}</h1>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="shadow-xl text-center flex flex-col p-6 mt-9 items-center">
            <h1 className="text-2xl">Total Items: {cart.length}</h1>
            <p className="shadow-xl p-2 my-2">
              Free Delivery on orders above <Formateprice price={999} />
            </p>
            <div className="text-xl">
              <h2>
                Total Price: <Formateprice price={calculateTotalPrice} />{" "}
              </h2>
              <h2>
                Shipping fee :{" "}
                {calculateTotalPrice > 999 ? (
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
              <span className="mr-2 text-2xl ">Grand Total:</span>
              {calculateTotalPrice > 999 ? (
                <h1 className="text-2xl text-green-600">
                  <Formateprice price={calculateTotalPrice} />
                </h1>
              ) : (
                <h1 className="text-2xl text-green-600">
                  <Formateprice price={calculateTotalPrice + 60} />
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
