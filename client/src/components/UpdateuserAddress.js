import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const UpdateuserAddress = ({ isAddressOpen, setISAddressOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const { name, email, phone, address, pin } = auth?.user;

    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
    setPin(pin);
  }, [auth?.user]);

  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      name === auth?.user?.name &&
      email === auth?.user?.email &&
      phone === auth?.user?.phone &&
      address === auth?.user?.address &&
      pin === auth?.user?.pin
    ) {
      toast.error("No changes made to the profile");
      return;
    }

    // if ( !pin === auth?.user?.pin && (pin && pin.length !== 6)) {
    //   toast.error("Enter Pincode correctly");
    //   return;
    // }

    if(pin !== auth?.user?.pin){
      if(pin && (pin && pin.length !== 6)){
        toast.error("Enter Pincode correctly");
      return;
      }
    }
    
    // if ( !phone === auth?.user?.phone && (phone && phone.length !== 10)) {
    //   toast.error("Enter Phone correctly");
    //   return;
    // }

    if(phone !== auth?.user?.phone){
      if(phone && phone.length !== 10){
        toast.error("Enter Phone correctly");
       return;
      }
    }

    try {
      const { data } = await axios.put(`/api/v1/profile`, {
        name,
        email,
        phone,
        address,
        pin,
      });

      if (data && data.error) {
        toast.error(data.error);
      } else {
        if (data && data.updatedUser) {
          setAuth({ ...auth, user: data.updatedUser });
          let ls = localStorage.getItem("auth2");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth2", JSON.stringify(ls));
          toast.success("Profile Updated Successfully");

          setISAddressOpen(false);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      setISAddressOpen(false);
    }
  }

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Your Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-800 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-4 hidden">
              <label
                htmlFor="email"
                className="block text-white text-sm font-bold mb-2"
              >
                Email *
              </label>
              <input
                disabled
                className="appearance-none border rounded w-full py-2 px-3 text-white  leading-tight bg-gray-100 focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-800 text-sm font-bold mb-2"
              >
                Phone No.
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="number"
                placeholder="Enter your Mobile No."
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-800 text-sm font-bold mb-2"
              >
                Address
              </label>
              <textarea
                className="appearance-none border rounded w-full h-[100px] py-2 px-3 text-gray-800 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="pin"
                className="block text-gray-800 text-sm font-bold mb-2"
              >
                Pincode
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                id="pin"
                type="number"
                placeholder="Enter your Pincode"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="btn btn-success btn-outline   font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateuserAddress;
