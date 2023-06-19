import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import Card from "../../components/Card";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="gap-4">
      <div className="">
        <AdminMenu />
      </div>
      <div className="flex gap-7  items-center flex-col">
        <div className="p-4  text-4xl font-bold">All Products</div>

        <div className="grid products  grid-cols-2 gap-4 ">
          {products?.map((p, index) => (
            <Card key={p._id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
