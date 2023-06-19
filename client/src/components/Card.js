import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Formateprice from "./Formateprice";
import { Link, NavLink } from "react-router-dom";

const Card = ({ _id, name, price, description, slug }) => {
  return (
    <div>
      <Link to={`/dashboard/admin/product/${slug}`}>
        <div className="flex items-center list-view sm:w-auto md:w-[600px] md:h-[300px] sm:h-auto  justify-center gap-4 shadow-2xl p-6">
          <div>
            <figure className="flex image-container overflow-hidden">
              <img
                src={`/api/v1/products/product-photo/${_id}`}
                className="h-[230px] "
                alt=""
                width={300}
              />
              
            </figure>
          </div>

          <div className="flex flex-col justify-between gap-3 max-w-[600px] min-w-[300px]">
            <h1 className="text-3xl min-h-[40px]">{name.substring(0, 30)}...</h1>
            <h4 className="text-green-500 text-lg font-bold">
              <Formateprice price={price} />
            </h4>
            <p className="w-full overflow-hidden">
              {description.slice(0, 110)}...
            </p>

            {/* <div>
              <button className="btn ">Buy Now</button>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
