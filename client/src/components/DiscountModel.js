import React from "react";

const DiscountModel = ({ coupons, showCoupon, setShowCoupon }) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-800 z-[102] bg-opacity-75 flex items-center justify-center ${
        showCoupon ? "flex" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg px-8 py-6 max-w-[600px] w-full">
        <h2 className="text-2xl font-bold mb-4">Discount Coupons</h2>
        <div className="space-y-4">
          {coupons.map((c) => {
            return (
              <div
                className="flex justify-center items-center gap-8"
                key={c.name}
              >
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p className="text-gray-500">Discount: {c.discount}%</p>
                <p className="text-red-400">
                  Expires: {c.expiry.substring(0, 10)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex  justify-between items-center gap-10">    <button
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          onClick={() => setShowCoupon(false)}
        >
          Close
        </button>
        <p>Apply the discount codes while checkout</p>
        </div>
    
      </div>
    </div>
  );
};

export default DiscountModel;
