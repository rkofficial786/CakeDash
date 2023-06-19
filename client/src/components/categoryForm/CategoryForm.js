import React from "react";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  btnAction,
  placeholder,
}) => {
  return (
    <div className="my-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 justify-center items-center"
        action=""
      >
        <div>
          <input
            className="md:w-[500px] sm:w-auto border-2 px-3 py-2"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />{" "}
        </div>
        <button className="btn btn-success  " type="submit">
          {btnAction}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
