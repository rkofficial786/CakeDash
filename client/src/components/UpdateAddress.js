import React, { useEffect, useState } from "react";
import Usermain from "../../components/Usermain";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";


const UpdateAddress = () => {

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

    if (phone.length < 10 && phone.length !== 0) {
      toast.error("Enter Phone number correctly");
      return;
    }

    if (address.length > 0 && pin.length !== 6) {
      toast.error("Enter Pincode correctly");
      return;
    }

    if (address.length > 0 && pin.length === 0) {
      toast.error("Enter Pincode correctly");
      return;
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
          navigate(location.state || "");
        }
      }
    } catch (error) {
      
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }

  function makeVisible() {
    setIsVisible(!isVisible);
  }

  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
        <div className="w-[500px] signupform flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-6 text-white">
                Your Profile
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight bg-darkInputBg focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email *
                  </label>
                  <input
                    disabled
                    className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight bg-darkInputBg focus:outline-none focus:shadow-outline"
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

                {/* address and phone */}
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone No.
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight bg-darkInputBg focus:outline-none focus:shadow-outline"
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
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <textarea
                    className="appearance-none border rounded w-full h-[100px] py-2 px-3 text-white leading-tight bg-darkInputBg focus:outline-none focus:shadow-outline"
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
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Pincode
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight bg-darkInputBg focus:outline-none focus:shadow-outline"
                    id="pin"
                    type="number"
                    placeholder="Enter your Pincode"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                    }}
                  />
                </div>

                {/* ---------------------- */}

                <div className="flex items-center flex-wrap gap-5 justify-between">
                  <button className="btn  btn-warning">Update</button>
                </div>
              </form>
            </div>
          </div>
    </div>
  )
}

export default UpdateAddress