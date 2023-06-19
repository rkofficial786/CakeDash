import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import CategoryPage from "./CategoryPage";
import Cart from "../components/Cart";
import { Helmet } from "react-helmet";



const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const getProductbyCategory = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-category/${params.slug}`);
      setIsLoading(false);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductbyCategory();
  }, [params?.slug]);

  // filter

  const [isCartOpen,setIsCartOpen] =useState(false)

  return (
    <div>
      <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <CategoryPage />
    
      <Helmet>
                  <title>{category.name}</title>
                </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center mt-[100px] justify-center">
          <h1 className="text-3xl mx-2 text-center text-customWhite">
            {products.length} results found for <span className="text-violet-600">{category.name}</span>
          </h1>

          <div className="flex flex-wrap items-center my-10 justify-center gap-20">
            {products.map((product, index) => {
              return <ProductCard {...product} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
