import React, { useEffect, useState } from "react";
import { useSearch } from "../context/search";
import Loader from "./Loader";
import { Helmet } from "react-helmet";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import Cart from "./Cart";

const Search = () => {
  const [values, setValues] = useSearch();
  const [issorting, setisSorting] = useState(false);
  const [sortingOption, setSortingOption] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    if (sortingOption === "priceLtH") {
      const sortedByPrice = [...values.results].sort(
        (a, b) => a.price - b.price
      );
      setisSorting(true);
      setSortedProducts(sortedByPrice);
    } else if (sortingOption === "priceHtL") {
      const sortedByPrice = [...values.results].sort(
        (a, b) => b.price - a.price
      );
      setisSorting(true);
      setSortedProducts(sortedByPrice);
    } else if (sortingOption === "reviews") {
      const sortedByReview = [...values.results].sort((a, b) => {
        const reviewA = parseInt(a.totalrating);
        const reviewB = parseInt(b.totalrating);
        return reviewB - reviewA;
      });
      setisSorting(true);
      setSortedProducts(sortedByReview);
    } else {
      // If no sorting option is selected, use the original results array
      setSortedProducts(values.results);
    }
  }, [sortingOption, values.results]);

  useEffect(() => {
    // Filter products based on price range
    if (priceFilter === "100-300") {
      const filteredByPrice = sortedProducts.filter(
        (product) => product.price >= 100 && product.price <= 300
      );
      setFilteredProducts(filteredByPrice);
    } else if (priceFilter === "300-500") {
      const filteredByPrice = sortedProducts.filter(
        (product) => product.price >= 300 && product.price <= 500
      );
      setFilteredProducts(filteredByPrice);
    } else if (priceFilter === "500-800") {
      const filteredByPrice = sortedProducts.filter(
        (product) => product.price >= 500 && product.price <= 800
      );
      setFilteredProducts(filteredByPrice);
    } else if (priceFilter === "800-1200") {
      const filteredByPrice = sortedProducts.filter(
        (product) => product.price >= 800 && product.price <= 1200
      );
      setFilteredProducts(filteredByPrice);
    } else if (priceFilter === "1200-1500") {
      const filteredByPrice = sortedProducts.filter(
        (product) => product.price >= 1200 && product.price <= 1500
      );
      setFilteredProducts(filteredByPrice);
    } else if (priceFilter === "1500-above") {
      const filteredByPrice = sortedProducts.filter(
        (product) => product.price >= 1500
      );
      setFilteredProducts(filteredByPrice);
    } else {
      setFilteredProducts(sortedProducts);
    }
  }, [sortedProducts, priceFilter]);

  const handleFilter = () => {
    // Apply the price filter when the filter button is clicked
    setPriceFilter(document.getElementById("price-filter").value);
  };
  const [isCartOpen,setIsCartOpen] =useState(false)

  return (
    <div>
       <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <Helmet>
        <title>Search Results</title>
      </Helmet>

      <div className="text-center mt-10">
        <h1 className="text-3xl">Search Results</h1>
      </div>

      {/* sort */}
      <div className="flex justify-center sm:flex-col md:flex-row items-center gap-10">
        <div className="shadowcss w-[200px] mx-auto text-center px-4 py-2 text-customWhite">
          <select
            className="bg-transparent"
            value={sortingOption}
            onChange={(e) => setSortingOption(e.target.value)}
          >
            <option className="bg-gray-700" value="">
              Sort by
            </option>
            <option className="bg-gray-700" value="priceHtL">
              Price: High to Low
            </option>
            <option className="bg-gray-700" value="priceLtH">
              Price: Low to High
            </option>
            <option className="bg-gray-700" value="reviews">
              Reviews
            </option>
          </select>
        </div>

        {/* filters */}
        <div className="shadowcss w-[260px] flex gap-2 mx-auto text-center px-4 py-2">
          <select id="price-filter" className="bg-transparent" defaultValue="">
            <option className="bg-gray-700" value="">
              Filter by Price
            </option>
            <option className="bg-gray-700" value="100-300">
              100 - 300
            </option>
            <option className="bg-gray-700" value="300-500">
              300 - 500
            </option>
            <option className="bg-gray-700" value="500-800">
              500 - 800
            </option>
            <option className="bg-gray-700" value="800-1200">
              800 - 1200
            </option>
            <option className="bg-gray-700" value="1200-1500">
              1200 - 1500
            </option>
            <option className="bg-gray-700" value="1500-above">
              1500 and above
            </option>
          </select>
          <button
            className="shadowcss rounded-xl px-4 py-2 text-white"
            onClick={handleFilter}
          >
            Apply
          </button>
        </div>
      </div>

      <div
        className={`${
          values?.results?.length > 0
            ? "text-center"
            : "flex h-[80vh] items-center justify-center"
        }`}
      >
       { filteredProducts.length!==0 && <h4 className="text-xl mt-3">
          {values?.results?.length < 1
            ? "No Products Found😓"
            : `Found ${filteredProducts.length}😁`}
        </h4>}
      </div>

      <div>
        {filteredProducts.length === 0 ? (
          <h1 className="text-3xl text-center flex items-center justify-center h-[80vh]">No products found</h1>
        ) : (
          <div className="flex mt-10 flex-wrap justify-center gap-5 items-center">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
