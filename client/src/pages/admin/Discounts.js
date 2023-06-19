import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import CategoryForm from "../../components/categoryForm/CategoryForm";
import CouponForm from "../../components/categoryForm/CouponForm";

const Discounts = () => {
  const [coupons, setCoupons] = useState([]);

  //get all categories
  const getAllCoupons = async () => {
    try {
      const { data } = await axios.get(`/api/v1/coupon/get-coupon`);
      if (data.success) {
        setCoupons(data.coupons);
        console.log("copuns hai", data.coupons);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in coupons");
    }
  };

  useEffect(() => {
    getAllCoupons();
  }, []);

  //category form
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const expiryDate = new Date(expiry);

      const discountValue = parseInt(discount, 10); // Use parseInt for integer values or parseFloat for floating-point values

      const { data } = await axios.post(`/api/v1/coupon/create-coupon`, {
        name,
        expiry: expiryDate,
        discount: discountValue,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCoupons();
        setName("");
        setExpiry("");
        setDiscount("");
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
  const [updatedexpiry, setUpdatexpiry] = useState("");
  const [updatedDiscount, setUpdatedDiscount] = useState("");
  const [selected, setSelected] = useState(null);

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const UpdatedexpiryDate = new Date(updatedexpiry);

      const updateddiscountValue = parseInt(updatedDiscount, 10);

      console.log("date", updatedDiscount);
      console.log("date", updatedexpiry);
      const { data } = await axios.put(
        `/api/v1/coupon/update-coupon/${selected}`,
        {
          name: updatedName,
          expiry: UpdatedexpiryDate,
          discount: updateddiscountValue,
        }
      );
      if (!updatedName) {
        toast.error("name required");
        return;
      }
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedname("");
        setUpdatedDiscount("");
        setUpdatexpiry("");
        getAllCoupons();
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
      if (answer !== "dattebayo") return;
      const { data } = await axios.delete(`/api/v1/coupon/delete-coupon/${id}`);
      if (data.success) {
        toast.success(`coupon deleted`);

        getAllCoupons();
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
        <div className="p-4  text-4xl font-bold">Manage Coupons</div>

        {/* conditional form rendering */}
        {update === true ? (
          <div>
            <CouponForm
              handleSubmit={handleUpdate}
              value={updatedName}
              value2={updatedDiscount}
              value3={updatedexpiry}
              setValue1={setUpdatedname}
              setValue2={setUpdatedDiscount}
              setValue3={setUpdatexpiry}
              btnAction={"Update"}
              placeholder={"Update Coupon"}
            />
          </div>
        ) : (
          <div>
            <CouponForm
              handleSubmit={handleSubmit}
              value={name}
              value2={discount}
              value3={expiry}
              setValue1={setName}
              setValue2={setDiscount}
              setValue3={setExpiry}
              btnAction={"Create"}
              placeholder={"Create Coupon"}
            />
          </div>
        )}

        <div className="overflow-x-hidden">
          <div className="grid grid-cols-4  md:gap-8 sm:gap-2 text-2xl md:w-full sm:w-auto justify-center  w-[100vh] ">
            <h3 className="md:text-3xl sm:text-xl text-center col-span-1  font-bold">Name</h3>
            <h3 className="md:text-3xl sm:text-xl  text-center col-span-1 font-bold">Discount</h3>
            <h3 className="md:text-3xl sm:text-xl  text-center col-span-1 font-bold">Expiry</h3>
            <h3 className="md:text-3xl sm:text-xl  text-center col-span-1 font-bold">
              Actions
            </h3>
          </div>

          <div className="w-[90%] flex mx-auto bg-customDark h-2 my-5"></div>

          <div>
            {" "}
            {coupons.map((item, index) => (
              <div key={index}>
                <div className=" grid grid-cols-4   w-[100vh] items-center justify-center   md:gap-8 sm:gap-2 text-2xl md:w-full sm:w-auto ">
                  {" "}
                  <h2 className="text-center sm:text-lg md:text-2xl col-span-1">
                  {item.name}
                  </h2>
                  <h2 className="text-center sm:text-lg md:text-2xl col-span-1">
                    {item.discount}
                  </h2>
                  <h2 className="text-center sm:text-lg md:text-2xl col-span-1">
                  {item.expiry && item.expiry.substring(0,10)}
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
                        setUpdatexpiry(item.expiry);
                        setUpdatedDiscount(item.discount);
                        setSelected(item._id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="btn btn-outline btn-warning mx-1 "
                    >
                      Update
                    </button>
                  </div>
                </div>
                <div className="w-[90%] flex mx-auto bg-gray-400 h-1 my-5"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
