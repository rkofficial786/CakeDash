import React from "react";
import Navbar from "../components/Navbar";
import "./home.css";
import Search from "../components/Search";
import SearchInput from "./../components/categoryForm/SearchInput";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { toast } from "react-hot-toast";
import { Prices } from "../components/Prices";
import Spinner from "./../components/Spinner";
import Loader from "../components/Loader";
import { useCart } from "../context/cartContext";
import { Helmet } from "react-helmet";
import { Button, Select } from "antd";
import { Option } from "antd/es/mentions";
import { IoFilterSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import anniversary from "../Assets/Random/Dana-Whitley3.jpg";
import bday from "../Assets/Random/childrens-portrait-photographer-dazzling-diva-photography-32.jpg";
// import Footer from "../components/Footer";

import poster from "../Assets/Cake-Top-Banner_web_2.jpg";
import CategoryPage from "./CategoryPage";
import Cart from "../components/Cart";
import DiscountModel from "../components/DiscountModel";
import Footer from "../components/Footer";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");
  const [prices, setPrices] = useState(Prices);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [showFilters, setShowFilters] = useState(true);

  const [issorting, setisSorting] = useState(false);
  const [sortingOption, setSortingOption] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [recommended, setRecommended] = useState([]);
  const [random, setRandom] = useState([]);
  const [randomShowing, setRandomShowing] = useState(false);
  // sort page

  useEffect(() => {
    if (sortingOption === "priceLtH") {
      const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
      setisSorting(true);
      setSortedProducts(sortedByPrice);
    } else if (sortingOption === "priceHtL") {
      const sortedByPrice = [...products].sort((a, b) => b.price - a.price);
      setisSorting(true);
      setSortedProducts(sortedByPrice);
    } else if (sortingOption === "reviews") {
      const sortedByReview = [...products].sort((a, b) => {
        const reviewA = parseInt(a.totalrating);
        const reviewB = parseInt(b.totalrating);
        return reviewB - reviewA;
      });
      setisSorting(true);
      setSortedProducts(sortedByReview);
    } else {
      // If no sorting option is selected, use the original products array
      setSortedProducts(products);
    }
  }, [sortingOption, products]);
  //coupons

  const [coupons, setCoupons] = useState([]);
  const [showCoupon, setShowCoupon] = useState(false);

  //get all categories
  const getAllCoupons = async () => {
    try {
      const { data } = await axios.get(`/api/v1/coupon/get-coupon`);
      if (data.success) {
        setCoupons(data.coupons);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in coupons");
    }
  };

  useEffect(() => {
    getAllCoupons();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCoupon(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  //cartpage

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);

      if (data.products.length === 0) {
        setProducts([]);
      } else {
        setProducts(data.products);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getRecomended = async () => {
    setIsLoading1(true);
    try {
      
      const { data } = await axios.get("/api/v1/products/recommended-products");
      setIsLoading1(false);
      setRecommended(data?.products);
    } catch (error) {
      
      console.log(error);
    }
  };

  //newly launched
  const [isLoading3, setIsLoading3] = useState(false);
  const [newProducts, setNewProducts] = useState([]);
  const getnewProducts = async () => {
    setIsLoading3(true);
    try {
      
      const { data } = await axios.get("/api/v1/products/new-products");
      setIsLoading3(false);
      setNewProducts(data?.products);
    } catch (error) {
     
      console.log(error);
    }
  };

  const getRandom = async () => {
    try {
      setIsLoading2(true);
      const { data } = await axios.get("/api/v1/products/random-products");
      setIsLoading2(false);
      setRandom(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in categories");
    }
  };

  //random hadnler

  function handleRandom() {
    setRandomShowing(!randomShowing);
 
  }

  //get total count

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllProducts();
    getTotal();
    getRecomended();
    getRandom();
    getnewProducts();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more

  const loadMore = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setIsLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // Filter by category
  function handleCategoryFilter(value, id) {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  }

  const applyFilters = async () => {
    if (checked.length === 0 && radio === "") {
      toast.error("No filter options selected");
      return;
    }

    try {
      const { data } = await axios.post(`/api/v1/products/product-filters`, {
        checked,
        radio,
      });

      if (data.products.length === 0) {
        setProducts([]);
      } else {
        setProducts(data.products);
      }

      setIsFilterApplied(true); // Set the isFilterApplied state to true
      setShowFilters(true);
    } catch (error) {
      console.log(error);
    }
  };

  function orderNow() {
    window.scrollBy({
      top: 1000, // Adjust the scroll amount as needed
      behavior: "smooth", // Optional: Add smooth scrolling animation
    });
  }

  //cart

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="overflow-hidden">
      <div className="home">
        <div className="z-40">
          <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </div>
        {/* //coupon */}
        {showCoupon && (
          <div>
            <DiscountModel
              coupons={coupons}
              showCoupon={showCoupon}
              setShowCoupon={setShowCoupon}
            />
          </div>
        )}
        <div className="">
          <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </div>

        <div className="flex  justify-center items-center flex-col h-[80vh] gap-12 text-center">
          <h1 className="text-6xl text-customWhite">
            The best way to satisfy your{" "}
            <span className="text-yellow-400"> cravings </span>{" "}
          </h1>
          <p className="md:w-[40%] sm:w-[60%]">
            With CakeDash, your journey into the realm of irresistible cakes
            becomes a seamless delight. Our user-friendly website and intuitive
            ordering system grant you instant access to a tantalizing array of
            mouthwatering creations.
          </p>
          <SearchInput />
          <button onClick={orderNow} className="btn btn-outline btn-warning ">
            Order Now
          </button>
        </div>
      </div>

      <div className="">
        <div className="flex flex-col ">
          <div className="flex justify-center">
            {isFilterApplied ? (
              <div>
                <Helmet>
                  <title>Filtered Products</title>
                </Helmet>
              </div>
            ) : (
              <div>
                <Helmet>
                  <title>CakeDash : Have a sweet day</title>
                </Helmet>
              </div>
            )}

            <div
              className={`filter-section ${
                showFilters
                  ? "relative -left-[400px] -top-[200px]  transition-all ease-in-out duration-1000 "
                  : " relative  left-0 transition-all ease-in-out duration-1000 -top-[200px]"
              } `}
            >
              {/* filters */}
              <div className="flex  absolute top-[300px] z-30 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-md text-customWhite shadow-2xl rounded-2xl  w-[300px] justify-evenly items-center flex-col h-[80vh]">
                <div className=" ">
                  <h4 className="text-xl text-customViloet">
                    Filter By Category{" "}
                    <span
                      onClick={() => setShowFilters(!showFilters)}
                      className="relative -top-[50px] cursor-pointer left-[180px]"
                    >
                      <AiOutlineClose />
                    </span>
                  </h4>

                  <div className="flex flex-col ">
                    {categories.map((category) => (
                      <div
                        key={category._id}
                        className="flex items-center mt-2"
                      >
                        <input
                          type="checkbox"
                          id={category._id}
                          onChange={(e) =>
                            handleCategoryFilter(e.target.checked, category._id)
                          }
                          className="form-checkbox mr-2"
                          disabled={isFilterApplied} // Disable the checkbox when a filter is applied
                        />
                        <label htmlFor={category._id}>{category.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-xl text-customViloet">
                    Filter by prices
                  </h4>
                  <div>
                    {prices.map((price) => (
                      <div className="flex items-center mt-2" key={price._id}>
                        <input
                          type="radio"
                          id={price._id}
                          value={price.array}
                          checked={radio === price.array}
                          onChange={(e) => {
                            if (radio === price.array) {
                              setRadio(""); // Clear the selection if the same radio button is clicked
                            } else {
                              setRadio(price.array); // Set the selected radio button value
                            }
                          }}
                          className="form-radio mr-2"
                          disabled={isFilterApplied} // Disable the checkbox when a filter is applied
                        />
                        <label htmlFor={price._id}>{price.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="filter-buttons">
                  {isFilterApplied ? (
                    <Button
                      type="primary"
                      onClick={() => window.location.reload()}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      Clear Filter
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={applyFilters}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      APPLY
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* filter button/ */}

            <div className="product-section  flex-col flex items-center justify-center">
              <div className="flex items-center   mt-10 mx-10 gap-10  sm:justify-center md:justify-end">
                <div className="shadowcss px-4 py-2  text-customWhite">
                  <select
                    className="bg-transparent "
                    value={sortingOption}
                    onChange={(e) => setSortingOption(e.target.value)}
                  >
                    <option className="bg-gray-700" value="">
                      Sort by
                    </option>
                    <option className="bg-gray-700" value="priceHtL">
                      Price:High to low
                    </option>
                    <option className="bg-gray-700" value="priceLtH">
                      Price:Low to high
                    </option>
                    <option className="bg-gray-700" value="reviews">
                      Reviews
                    </option>
                  </select>
                </div>
                <div>
                  {/* button to show filter */}
                  <button
                    className=" flex items-center justify-center gap-2 shadowcss px-4 py-2  text-customWhite "
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <IoFilterSharp />
                    {showFilters ? " Filters" : "Filters"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col mt-14 justify-center items-center">
                <div>
                  {isFilterApplied ? (
                    <h1 className="text-3xl my-5">Filtered Cakes</h1>
                  ) : (
                    <h1 className="text-3xl my-5">All Cakes</h1>
                  )}
                </div>
                <div>
                  {isLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <div>
                      {isFilterApplied && sortedProducts.length === 0 ? (
                        <h1 className="h-[80vh] text-4xl text-center flex items-center">
                          No Products Found
                        </h1>
                      ) : (
                        <div className="flex flex-wrap justify-center gap-5 items-center">
                          {isFilterApplied || issorting
                            ? sortedProducts.map((product) => (
                                <ProductCard {...product} key={product.id} />
                              ))
                            : products.map((product) => (
                                <ProductCard {...product} key={product.id} />
                              ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* total product */}
                <div className="mt-8">
                  {products && !isFilterApplied && products.length < total && (
                    <button
                      className="btn  btn-info"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      Load more
                    </button>
                  )}
                </div>

                <div className="mt-10">
                  <img
                    src={poster}
                    className="w-full sm:h-[200px] md:h-auto"
                    alt=""
                  />
                </div>

                <div className="mt-10 w-full ">
                  {" "}
                  <CategoryPage />
                </div>

                {/* recomended product */}
                <h1 className="mt-[100px] text-4xl mb-10">
                  Top Recomendations
                </h1>

                {isLoading1 ? (
                  <Loader />
                ) : (
                  <div className="flex flex-wrap items-center justify-center gap-5">
                    {recommended.map((product) => {
                      return <ProductCard {...product} />;
                    })}
                  </div>
                )}

                {/* bday wedding card */}

                {!randomShowing && (
                  <h1 className="text-4xl text-center mt-14">
                    Choose Your Preference
                  </h1>
                )}
                {!randomShowing && (
                  <div className="flex justify-center items-center gap-10 flex-wrap overflow-hidden my-16">
                    <div
                      className="cursor-pointer bg-white rounded-lg shadow-lg p-4 hover:bg-gray-100 transition duration-300"
                      onClick={() => handleRandom()}
                    >
                      <img
                        className="w-[300px] h-[300px] object-cover rounded-md"
                        src={anniversary}
                        alt="anniversaryimage"
                      />
                      <h2 className="text-center text-3xl mt-4 hover:text-blue-600">
                        Anniversary
                      </h2>
                    </div>
                    <div
                      className="cursor-pointer bg-white rounded-lg shadow-lg p-4 hover:bg-gray-100 transition duration-300"
                      onClick={() => handleRandom()}
                    >
                      <img
                        className="w-[300px] h-[300px] object-cover rounded-md"
                        src={bday}
                        alt="bdayimage"
                      />
                      <h2 className="text-center text-3xl mt-4 hover:text-blue-600">
                        Birthday
                      </h2>
                    </div>
                  </div>
                )}

                {/* random product */}
                {randomShowing && (
                  <div>
                    <h1 className="mt-[100px] text-4xl mb-10 text-center">
                      For You ❤️
                    </h1>
                    {isLoading2 ? (
                      <Loader />
                    ) : (
                      <div className="flex flex-wrap items-center justify-center gap-5">
                        {random.map((product) => {
                          return <ProductCard {...product} />;
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* //newproduicts */}

                <h1 className="mt-[100px] text-4xl mb-10">Newly Launched</h1>

                {isLoading3 ? (
                  <Loader />
                ) : (
                  <div className="flex flex-wrap items-center justify-center gap-5">
                    {newProducts.map((product) => {
                      return <ProductCard {...product} />;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
