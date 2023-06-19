import React from "react";
import moment from "moment";
import Formateprice from "./Formateprice";

const OrderCard = ({
  index,
  status,
  buyer,
  createdAt,
  payment,
  products,
  price,
  _id,
  name,
  description,
}) => {
  return (
    <div>
      <div className="sm:flex sm:justify-center sm:items-center md:block">
        <div className="grid text-center  md:grid-cols-6 gap-8 text-2xl md:w-full sm:w-auto justify-center">
          <div className="col-span-1">#</div>
          <div className="col-span-1">Name</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Orders</div>
          <div className="col-span-1">Payment</div>
        </div>

        <div className="w-[88%] mx-[6%] sm:hidden text-center flex justify-center items-center  h-[1px] bg-customViolet  my-6"></div>

        <div className="text-center grid  md:grid-cols-6 gap-8 text-2xl md:w-full sm:w-auto  justify-center">
          <div className="font-bold">{index + 1}</div>
          <div className="font-bold">{buyer?.name}</div>
          <div>
            {status === "Not Process" ? (
              <h1 className="font-bold text-red-600">{status}</h1>
            ) : (
              <h1 className="font-bold text-green-500">{status}</h1>
            )}
          </div>
          <div className="font-bold">{moment(createdAt).fromNow()}</div>
          <div className="font-bold">{products?.length}</div>
          <div className="font-bold">
            {payment?.success ? "Success" : "Failed"}
          </div>
        </div>
      </div>

      <div className="w-[88%] mx-[6%] text-center flex justify-center items-center  h-[1px] bg-customViolet  my-6"></div>

      <div className="flex flex-wrap justify-center items-center">
        {products.map((p, i) => (
          <div key={p._id} className="w-full sm:w-[380px] md:w-[500px]">
            <div className="p-8 gap-4 cart-item flex items-center justify-center w-full h-[300px]">
              <div>
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  alt=""
                  className="w-[200px] h-[160px]"
                />
              </div>

              <div className="flex flex-col gap-4 justify-between">
                <h3 className="md:text-2xl sm:text-[16px] font-bold">
                  {p.name.substring(0, 30)}...
                </h3>
                <p>{p.description.substring(0, 100)}...</p>
                <div className="flex items-center justify-between">
                  <p className="text-green-600 text-xl font-semibold">
                    <Formateprice price={p.price} />
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-customTooDark my-6"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
