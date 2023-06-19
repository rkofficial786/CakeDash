import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Formateprice from "../components/Formateprice";
import { MdDeliveryDining } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";
import { BsFillTruckFrontFill } from "react-icons/bs";
import { TbReplaceFilled } from "react-icons/tb";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
// import { Rate } from "antd";
import { AiFillStar } from "react-icons/ai";
// import  Rating  from "react-rating";
import { Rating } from "@mui/material";
import moment from "moment";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [isloading, setloading] = useState(false);

  const [cart, setCart] = useCart();
  const [selectedSize, setSelectedSize] = useState("medium");

  // handle cart
  function handleAddCart(e) {
    const existingCartItem = cart.find((item) => item._id === product._id && item.size === selectedSize);
  
    if (existingCartItem) {
      // Product with the same ID and size already exists in the cart
      const updatedCart = cart.map((item) => {
        if (item._id === product._id && item.size === selectedSize) {
          return {
            ...item,
            quantity: item.quantity + 1, // Increase the quantity by 1
          };
        }
        return item;
      });
  
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const cartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        slug: product.slug,
        quantity: 1,
        size: selectedSize, // Set the initial quantity to 1 for a new product
      };
  
      setCart([...cart, cartItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));
    }
  
    toast.success("Added to cart");
  }
  

  //getting user
  const [user, setUser] = useState([]);

  const fetchUser = async (userId) => {
    try {
      
      const response = await axios.get(`/api/v1/getuser/${userId}`);
      
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (product.ratings) {
        for (const rating of product.ratings) {
         
          await fetchUser(rating.postedby); // Assuming the user ID is stored in the 'user' field of each rating object
        }
      }
    };

    fetchUserData();
  }, [product.ratings]);

  // console.log("uisers",user);

  //getproducts

  useEffect(() => {
    if (params?.slug) getproducts();
  }, [params?.slug]);

  async function getproducts() {
    setloading(true);
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
      setloading(false);
    } catch (error) {
      
      setloading(false);
    }
  }
  

  //ratings

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Event handlers
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitRating = () => {
    const ratingData = {
      star: rating,
      prodId: product._id,
      comment: comment,
    };

    axios
      .post("/api/v1/products/rating", ratingData)
      .then((response) => {
        // Handle success
        toast.success("Rating submitted successfully");
        window.location.reload();
        // Update the product with the returned data (if needed)
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  //similar products

  const [relatedProducts, setRelatedProducts] = useState([]);

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-product/${pid}/${cid}`
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  
  // useEffect(()=>{
  //   getSimilarProducts()
  // })
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <div>
        {isloading === true ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <div className=" mt-[100px]  main-product">
              <div className="flex  justify-center gap-9 px-5 h-auto py-[10px] items-center text-xl  flex-wrap ">
                <div className="flex  shadow-xl  p-10 ">
                  <img
                    src={`/api/v1/products/product-photo/${product._id}`}
                    className=" md:h-[500px] sm:h-auto  main-img"
                    alt=""
                    // width={300}
                  />
                </div>
                <div className=" w-[500px] flex flex-col  justify-center gap-6 single-product">
                  <h1 className="text-2xl">{product.name}</h1>

                  <div className="  rounded-2xl">
                    {/* Rating Section */}

                    {/* Average Rating */}
                    <div className="flex items-center  ">
                      {/* <Rate starSpacing={1} disabled value={product.totalrating} /> */}
                      <Rating
                        name="half-rating-read"
                        defaultValue={0}
                        value={product.totalrating}
                        onChange={handleRatingChange}
                        precision={0.5}
                        readOnly
                      />
                      <p className="ml-2 text-customWhite">
                        ({" "}
                        {product.ratings &&
                          `${product.ratings.length} review(s)`}
                        )
                      </p>
                    </div>
                  </div>
                  <p className="font-bold">
                    MRP:{" "}
                    {
                      <del>
                        <Formateprice
                          price={product.price + 200}
                        ></Formateprice>
                      </del>
                    }
                  </p>
                  <p className=" font-bold">
                    Deal of the Day:{" "}
                    <span className="text-xl text-green-600 font-bold">
                      {" "}
                      {<Formateprice price={product.price} />}
                    </span>
                  </p>
                  <p>{product.description}</p>

                  <div className="flex flex-wrap product-icons">
                    <div className="m-4 flex justify-center items-center gap-4">
                      <MdDeliveryDining className="text-customViloet text-3xl" />
                      <p>Fast Delivery</p>
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mt-4 flex  items-center">
                    <label htmlFor="size" className="mr-2">
                      Size:
                    </label>
                    <select
                      id="size"
                      className="rounded-lg transition-all ease-in-out duration-300"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <option  value="medium">1KG</option>
                      <option value="small">0.5KG</option>
                      <option value="large">2KG</option>
                    </select>
                  </div>

                  {/* add to cart */}

                  <div>
                    <button onClick={handleAddCart} className="btn btn-warning">
                      Add to Cart
                    </button>
                  </div>
                  <div className="w-full bg-customTooDark h-[1px]"></div>

                  <div className="w-full text-customTooDark h-[2px]"></div>
                </div>
              </div>
            </div>

            {/* similar products */}

            <div className="mt-[100px]">
              <h1 className="text-4xl text-center">Similar Products</h1>
              {relatedProducts?.length < 1 && (
                <h1 className="text-xl text-center mt-[150px]">
                  No similar products found
                </h1>
              )}
              <div className="flex my-10  flex-wrap  justify-center gap-5 items-center">
                {relatedProducts?.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </div>
            </div>

            {/* rating */}
            <div className="bg-gray-600 mx-auto text-center p-6 sm:w-[90%] md:w-[60%]">
              {/* Rating Section */}
              <div className="mt-6">
                <Rating
                  name="half-rating"
                  value={rating}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  emptyIcon={<AiFillStar className="text-gray-300 text-2xl" />}
                  icon={<AiFillStar className="text-yellow-400 text-2xl" />}
                />

                {/* Comment Input */}
                <textarea
                  className="mt-4 p-2 w-full h-20 bg-gray-100 text-black rounded"
                  onChange={handleCommentChange}
                  value={comment}
                  placeholder="Enter your comment..."
                ></textarea>

                {/* Submit Button */}
                <button
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  onClick={handleSubmitRating}
                >
                  Submit Review
                </button>
              </div>
            </div>

            {/* comment */}

            <div className="mt-6">
              <h1 className="text-center text-4xl"> Reviews</h1>

              {product.ratings && product.ratings.length === 0 ? (
                <h1 className="text-center mt-6 text-3xl">No Reviews yet</h1>
              ) : (
                <div>
                  {product.ratings && (
                    <div className="flex flex-col gap-4 mt-8 bg-gray-800 mx-[10%]  p-8 ">
                      {product.ratings.map((ratingItem) => (
                        <div
                          key={ratingItem._id}
                          className="mt-4 text-left w-full flex flex-col    "
                        >
                          <div className="flex items-center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={ratingItem.star}
                              precision={0.5}
                              readOnly
                              emptyIcon={
                                <AiFillStar className="text-gray-300 text-2xl" />
                              }
                              icon={
                                <AiFillStar className="text-yellow-400 text-2xl" />
                              }
                            />
                          </div>

                          <div className="flex flex-col  gap-5 text-left ">
                            <div className="flex items-center gap-4 flex-wrap ">
                              <div className="bg-orange-500 w-12 h-12 rounded-full flex justify-center text-center items-center ">
                                {" "}
                                <p className="text-customWhite text-2xl">
                                  {" "}
                                  {user.name && user.name.substring(0, 1)}
                                </p>
                              </div>
                              <p className="text-blue-500 text-2xl ">
                                {user.name}
                              </p>
                              <p className="text-customWhite ">
                                {moment(ratingItem.createdAt).fromNow()}
                              </p>
                            </div>

                            <p className="text-customWhite max-w-[600px] ">
                              {ratingItem.comment}
                            </p>
                          </div>
                          <div className="bg-gray-400 h-[1px] bg-opacity-40 my-5 w-full "></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* {product.ratings && (
              <div className="flex flex-col gap-4 mt-8 bg-gray-800 mx-[10%]  p-8 ">
                {product.ratings.map((ratingItem) => (
                  <div
                    key={ratingItem._id}
                    className="mt-4 text-left w-full flex flex-col    "
                  >
                    <div className="flex items-center">
                      <Rating
                        name="half-rating-read"
                        defaultValue={ratingItem.star}
                        precision={0.5}
                        readOnly
                        emptyIcon={
                          <AiFillStar className="text-gray-300 text-2xl" />
                        }
                        icon={
                          <AiFillStar className="text-yellow-400 text-2xl" />
                        }
                      />
                    </div>

                    <div className="flex flex-col  gap-5 text-left ">
                      <div className="flex items-center gap-4 flex-wrap ">
                        <div className="bg-orange-500 w-12 h-12 rounded-full flex justify-center text-center items-center ">
                          {" "}
                          <p className="text-customWhite text-2xl">
                            {" "}
                            {user.name && user.name.substring(0, 1)}
                          </p>
                        </div>
                        <p className="text-blue-500 text-2xl ">{user.name}</p>
                        <p className="text-customWhite ">
                          {moment(ratingItem.createdAt).fromNow()}
                        </p>
                      </div>

                      <p className="text-customWhite max-w-[600px] ">
                        {ratingItem.comment}
                      </p>
                    </div>
                    <div className="bg-gray-400 h-[1px] bg-opacity-40 my-5 w-full "></div>
                  </div>
                ))}
              </div>
            )} */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
