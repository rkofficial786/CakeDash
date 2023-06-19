import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillExclamationCircle,
} from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import bg from "../../Assets/signin/diana-light-Q7W8NF_N5Fo-unsplash (1).jpg";
import Cart from "../../components/Cart";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  //button hover
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //api call
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/v1/forgot-password`, {
        email,
        newpassword,
        question,
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

  //visible icon
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen ,setIsCartOpen] =useState(false)
  return (
    <>
      <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <div className="text-customTooDark flex items-center h-screen -mt-[100px] justify-center flex-col gap-8">
      <Helmet>
          <title>Forgot Password</title>
        </Helmet>
        <div className="sm:w-auto md:w-auto signupform flex items-center justify-center">
          <div className="md:bg-gray-800 sm:bg-transparent p-8 md:flex gap-10 rounded shadow-md w-full md:p-24 ">
            {/* adding image */}
            <img
              src={bg}
              alt=""
              className="sm:hidden h-[370px] md:block w-[400px]"
            />
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Reset Password
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
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
                <div className="mb-6 relative">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-2"
                    htmlFor="question"
                  >
                    What is your best friend's name?
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
                </div>
                <div className="mb-6 relative">
                  <label
                    className="block text-gray-300 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    New Password
                  </label>
                  <input
                    className="appearance-none bg-gray-700 border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type={isVisible === true ? "text" : "password"}
                    placeholder="Enter new password"
                    required
                    value={newpassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
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
                  <button className="btn">Reset</button>
                  <p className="text-customWhite">
                    Don't have an account?{" "}
                    <Link className="text-blue-300" to={"/register"}>
                      Signup
                    </Link>{" "}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
