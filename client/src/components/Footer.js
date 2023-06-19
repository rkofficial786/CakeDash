import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-14 text-white py-8">
      <div className="  flex items-center justify-evenly flex-wrap">
        <div className=" flex   justify-center flex-col">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="mb-2">
            Saitan gali, khtra mahal, <br />
            Andher nagar, Samsan ke Samne
          </p>
          <p className="mb-2">Phone: (123) 456-7890</p>
          <p>Email: info@example.com</p>
        </div>
        <div className="flex flex-col text-center justify-center ">
          <h4 className="text-lg font-semibold ">Links</h4>
          <ul className="">
            <li>
              <Link to={"/"} className="text-gray-300 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/category/vanilla"}  className="text-gray-300 hover:text-white">
                Cakes
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/user/orders"}  className="text-gray-300 hover:text-white">
                Orders
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/user/profile"}  className="text-gray-300 hover:text-white">
               Profile
              </Link>
            </li>

            <li>
              <Link to={"/contact"}  className="text-gray-300 hover:text-white">
               Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-5 items-center justify-center flex-col text-center">
          <h4 className="text-lg font-semibold ">Follow Us</h4>
          <div className="flex items-center ">
            <a href="#" className="mr-2">
              <FaFacebookF className="text-gray-300 hover:text-white" />
            </a>
            <a href="#" className="mr-2">
              <FaTwitter className="text-gray-300 hover:text-white" />
            </a>
            <a href="#" className="mr-2">
              <FaInstagram className="text-gray-300 hover:text-white" />
            </a>
            <a href="#" className="mr-2">
              <FaPinterest className="text-gray-300 hover:text-white" />
            </a>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CakeDash. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
