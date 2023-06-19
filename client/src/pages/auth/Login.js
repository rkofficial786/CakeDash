import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import bg from "../../Assets/signin/amirali-mirhashemian-EfkMkUXs0fU-unsplash (1).jpg";
import Cart from "../../components/Cart";

const Login = () => {
  // for backend request
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  //api call
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/v1/login`, { email, password });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth2", JSON.stringify(res.data));
        navigate(location.state || "/");
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
  const [isCartOpen,setIsCartOpen] =useState(false)

  return (
    <div className="home">
      <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="text-customTooDark flex items-center h-screen -mt-[100px] justify-center flex-col gap-8">
        <div className="sm:w-auto md:w-auto signupform flex items-center justify-center">
          <div className="md:bg-gray-800 sm:bg-transparent p-8 md:flex gap-10 rounded shadow-md w-full md:p-24 ">
            {/* adding image */}
            <img src={bg} alt="" className="sm:hidden h-[310px] md:block w-[400px]" />
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Login</h2>
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
                    htmlFor="password"
                  >
                    Password
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

                <div
                  className="text-right text-blue-400 cursor-pointer"
                  onClick={() => {
                    navigate("/forgotpassword");
                  }}
                >
                  Forgot Password
                </div>

                <div className="flex items-center flex-wrap gap-5 justify-between">
                  <button className="btn">Login</button>
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
    </div>
  );
};

export default Login;
