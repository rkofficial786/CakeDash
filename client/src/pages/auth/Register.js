import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillExclamationCircle,
} from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import "./auth.css";
import bg from "../../Assets/signin/kaouther-djouada-hcEDfkiVmMI-unsplash.jpg";
import Cart from "../../components/Cart";
const Register = () => {
  // for backend request
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [pin, setPin] = useState("");

  //hover description
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must contain 6 characters");
      return;
    }

    if (phone.length < 10 && phone.length !== 0) {
      toast.error("Enter Phone number correctly");
      return;
    }

    if (password !== cPassword) {
      toast.error("Password does not match");
      return;
    }

    try {
      const res = await axios.post(`/api/v1/signup`, {
        name,
        email,
        password,
        question,
        phone,
        address,
        pin,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  }

  function makeVisible() {
    setIsVisible(!isVisible);
  }
  const [isVisible, setIsVisible] = useState(false);
  const[isCartOpen ,setIsCartOpen] =useState(false)
  return (
    <div className="home">
      <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <div className=" flex items-center h-[80vh] justify-center  flex-col gap-8  ">
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <div className="sm:w-auto md:w-auto signupform flex items-center mt-5 justify-center">
          <div className="md:bg-gray-800 sm:bg-transparent p-8 md:flex gap-10 rounded shadow-md w-full md:p-24 ">
            {/* adding image */}
            <img src={bg} alt="" className="sm:hidden h-[540px] md:block w-[400px]" />
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Sign Up
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name *
                  </label>
                  <input
                    className="appearance-none bg-gray-700 border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email *
                  </label>
                  <input
                    className="appearance-none bg-gray-700 border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
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
                <div className="mb-4 hidden">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone No.
                  </label>
                  <input
                    className="appearance-none bg-gray-700 border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="Number"
                    placeholder="Enter your Mobile No."
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-4 hidden">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Pincode
                  </label>
                  <input
                    className="appearance-none bg-gray-700 border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="pin"
                    type="Number"
                    placeholder="Enter your Pincode"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-4 hidden">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <textarea
                    className="appearance-none bg-gray-700 border rounded w-full h-[100px] py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    placeholder="Enter your Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  ></textarea>
                </div>

                {/* ---------------------- */}

                <div className="mb-4 relative">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-2"
                    htmlFor="question"
                  >
                    What is your best friend's name? *
                  </label>
                  <input
                    className="appearance-none bg-gray-700 border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="question"
                    type="text"
                    placeholder="eg. Raj"
                    required
                    value={question}
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                  />
                  <div className="absolute md:block sm:hidden right-2 top-[60%]">
                    <button
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="flex items-center focus:outline-none"
                    >
                      <AiFillExclamationCircle className="text-gray-300" />
                    </button>
                    {isHovered && (
                      <div className="absolute left-0 mt-2 z-10 w-[300px] p-5 bg-gray-700">
                        <p className="text-gray-300">
                          This field is required in case of forgot password so
                          enter friend's name wisely that only you can reset
                          password using the same name
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6 relative">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password *
                  </label>
                  <input
                    className="appearance-none bg-gray-700 border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type={isVisible === true ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div
                    className="absolute right-2 top-[60%]"
                    onClick={makeVisible}
                  >
                    {isVisible === true ? (
                      <AiFillEye className="text-gray-300" />
                    ) : (
                      <AiFillEyeInvisible className="text-gray-300" />
                    )}{" "}
                  </div>
                </div>

                <div className="mb-6 relative">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Confirm Password *
                  </label>
                  <input
                    className="appearance-none bg-gray-700 border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type={isVisible === true ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    value={cPassword}
                    onChange={(e) => {
                      setCPassword(e.target.value);
                    }}
                  />
                  <div
                    className="absolute right-2 top-[60%]"
                    onClick={makeVisible}
                  >
                    {isVisible === true ? (
                      <AiFillEye className="text-gray-300" />
                    ) : (
                      <AiFillEyeInvisible className="text-gray-300" />
                    )}{" "}
                  </div>
                </div>
                <div className="flex items-center flex-wrap gap-5 justify-between">
                  <button className="btn btn-">Sign Up</button>

                  <p>
                    Already have an account?{" "}
                    <Link className="text-blue-300" to={"/login"}>
                      Login
                    </Link>{" "}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
