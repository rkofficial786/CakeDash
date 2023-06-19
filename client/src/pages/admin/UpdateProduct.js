import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillExclamationCircle } from "react-icons/ai";

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const params = useParams();
  //get single product
  const getSingleProduct = async () => {

    
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setId(data.product._id);
      setSelectedCategory(data.product.category._id);
    } catch (error) {}
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //hover description

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  //create function
  const navigate = useNavigate();

  async function handleUpdate(e) {
    e.preventDefault();
    

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);

      photo && productData.append("photo", photo);

      productData.append("category", selectedCategory);
    


      const response = await axios.put(
        `/api/v1/products/update-product/${id}`,
        productData
      );

      if (response.data?.success) {
        toast.success("Product Udpated Succesfully");
        navigate(-1);
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  //delete product

  async function handleDelete() {
    try {
      let answer = window.prompt("Are you sure?");
      if (answer!=="dattebayo") return;
      const { data } = await axios.delete(
        `/api/v1/products/product/${id}`
      );
      toast.success("product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  //   console.log("category", selectedCategory);
  return (
    <div className="gap-4">
      <div className="">
        <AdminMenu />
      </div>
      <div className="flex gap-7   items-center flex-col">
        <div className="p-4  text-4xl font-bold">Update Products</div>
        <div className="mb-4 text-center gap-6 flex flex-col justify-center items-center">
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 block my-5 w-full sm:w-64 md:w-80 xl:w-[800px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option className="text-gray-400 ">Select a category</option>

            {categories.map((category) => (
              <option key={category.id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <div className=" w-full sm:w-64 md:w-80 xl:w-[800px] p-8 border-2 relative">
            <div className="mb-3">
              <label className="relative cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50">
                {photo ? `${photo.name.substring(0, 22)}...` : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="sr-only"
                />
              </label>
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="flex justify-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="h-20 w-[200px] object-cover rounded"
                  />
                </div>
              ) : (
                <div className="flex justify-center">
                  <img
                    src={`/api/v1/products/product-photo/${id}`}
                    alt="product_photo"
                    className="h-20 w-[200px] object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div className="absolute right-2 top-[60%]">
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex items-center focus:outline-none"
              >
                <AiFillExclamationCircle />
              </button>
              {isHovered && (
                <div className="absolute text-left left-0 mt-2 z-10 w-[300px] p-5 bg-customWhite">
                  <p> The uploaded photo size should be less than 1Mb </p>
                </div>
              )}
            </div>
          </div>

          {/* prodcut form */}

          <div>
            <input
              type="text"
              className=" w-full sm:w-64 md:w-80 xl:w-[800px]  px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <textarea
              className=" w-full sm:w-64 md:w-80 xl:w-[800px]  px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter Product Description"
              name="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id=""
              cols="20"
              rows="6"
            ></textarea>
          </div>

          <div>
            <input
              type="number"
              className=" w-full sm:w-64 md:w-80 xl:w-[800px]  px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <input
              type="number"
              className=" w-full sm:w-64 md:w-80 xl:w-[800px]  px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter Product Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* //shipping */}

    

          <button
            onClick={handleUpdate}
            className="btn btn-warning  w-full sm:w-64 md:w-80 xl:w-[800px]"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-error w-full sm:w-64 md:w-80 xl:w-[800px]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
