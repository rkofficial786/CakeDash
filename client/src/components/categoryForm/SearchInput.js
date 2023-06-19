import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/products/search/${values.keyword}`
      );
      setValues({...values,results:data})
      console.log(data);
      navigate("/search")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form className="flex items-center" onSubmit={handleSubmit}>
  <div className="flex items-center">
    <input
      type="search"
      
      placeholder="Search"
      value={values.keyword}
      className="rounded-l-lg px-4  sm:w-auto md:w-[500px] py-[4px] border-t border-b border-l text-customWhite border-gray-200 bg-transparent focus:outline-none"
      onChange={(e) => setValues({ ...values, keyword: e.target.value })}
    />
    <button
      type="submit"
      className="px-4 py-2 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 14a6 6 0 100-12 6 6 0 000 12zM18.707 17.293l-3-3a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414-1.414zM8 12a4 4 0 110-8 4 4 0 010 8z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>
</form>

    </div>
  );
};

export default SearchInput;
