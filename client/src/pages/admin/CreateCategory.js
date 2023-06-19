import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import CategoryForm from "../../components/categoryForm/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-category`
      );
      if (data.success) {
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

  //category form
  const [name, setName] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //update form
  const [update, setUpdate] = useState(false);
  const [updatedName, setUpdatedname] = useState("");
  const [selected, setSelected] = useState(null);

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (!updatedName) {
        toast.error("name required");
        return;
      }
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedname("");
        getAllCategories();
        setUpdate(!update);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //delete category

  async function handledelete(id) {
   
    try {
      let answer = window.prompt("Are you sure?");
      if (answer!=="dattebayo") return;
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(`category deleted`);

        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="gap-4">
      <div className="">
        <AdminMenu />
      </div>
      <div className="flex gap-7   items-center flex-col">
        <div className="p-4  text-4xl font-bold">Manage Category</div>

        {/* conditional form rendering */}
        {update === true ? (
          <div>
            <CategoryForm
              handleSubmit={handleUpdate}
              value={updatedName}
              setValue={setUpdatedname}
              btnAction={"Update"}
              placeholder={"Update Category"}
            />
          </div>
        ) : (
          <div>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
              btnAction={"Create"}
              placeholder={"Create Category"}
            />
          </div>
        )}

        <div className="">
          <div className="grid grid-cols-2 w-screen">
            <h3 className="text-3xl text-center col-span-1 font-bold">Name</h3>
            <h3 className="text-3xl text-center col-span-1 font-bold">
              Actions
            </h3>
          </div>

          <div className="w-[64%] flex mx-auto bg-customDark h-2 my-5"></div>

          <div>
            {" "}
            {categories.map((item, index) => (
              <div key={index}>
                <div className=" grid grid-cols-2 w-screen">
                  {" "}
                  <h2 className="text-center text-2xl col-span-1">
                    {item.name}
                  </h2>
                  <div className=" text-center col-span-1 ">
                    <button
                      onClick={() => handledelete(item._id)}
                      className=" btn btn-outline btn-error mx-1"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setUpdate(!update);
                        setUpdatedname(item.name);
                        setSelected(item);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="btn btn-outline btn-warning mx-1 "
                    >
                      Update
                    </button>
                  </div>
                </div>
                <div className="w-[64%] flex mx-auto bg-gray-400 h-1 my-5"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
