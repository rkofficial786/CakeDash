import React from "react";

const CouponForm = ({
  value,
  value2,
  value3,
  setValue1,
  setValue2,
  setValue3,
  handleSubmit,
  btnAction,
  placeholder,
}) => {
  return (
    <div className="my-10 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 justify-center items-center"
        action=""
      >
        <div className="flex flex-col items-center justify-center gap-8">
          <input
            className="md:w-[500px] sm:w-auto border-2 px-3 py-2"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue1(e.target.value)}
          />

          <input
            className="md:w-[500px] sm:w-auto border-2 px-3 py-2"
            type="number"
            placeholder="Enter discount"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
          <input
            className="md:w-[500px] sm:w-auto border-2 px-3 py-2"
            type="date"
            placeholder={placeholder}
            value={value3}
            onChange={(e) => setValue3(e.target.value)}
          />
        </div>
        <button className="btn btn-success" type="submit">
          {btnAction}
        </button>
      </form>
    </div>
  );
};

export default CouponForm;
