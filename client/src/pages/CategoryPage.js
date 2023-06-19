import React from "react";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import choco2 from "../Assets/Category/choco.jpg";
import choco from "../Assets/Category/Blue_web.jpg";
import choco3 from "../Assets/Category/Dry-Cakess_web.jpg";
import choco4 from "../Assets/Category/Red_web.jpg";
import choco5 from "../Assets/Category/Fondant-Cakes_web.jpg";
import choco6 from "../Assets/Category/Pinata-Cakes_web.jpg";

const CategoryPage = () => {
  const categories = useCategory();
  const categoryImages = [choco, choco2, choco3, choco4, choco5, choco6];

  const pageHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  
  const scrollPercentage = 0.6; // Set the desired scroll percentage here
  const scrollAmount = scrollPercentage * pageHeight;

  function scrollwindowDown(){
    window.scrollBy({
        top: scrollAmount, // Adjust the scroll amount as needed
        behavior: 'smooth' // Optional: Add smooth scrolling animation
      });
  }

  return (
    <div>
      <h1 className="text-3xl mb-8 text-center">Choose Category</h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-3  gap-6">
        {categories.map((c, index) => (
          <div key={c._id} className="flex flex-col items-center">
            <Link to={`/category/${c.slug}`} onClick={scrollwindowDown}>
              <div className="relative mb-2 hover:scale-110 transition-all ease-in-out duration-300 ">
                <img
                  src={categoryImages[index % categoryImages.length]} // Access the image based on index
                  alt={c.name}
                  className="w-[200px] h-[200px] rounded-full opacity-60 object-cover "
                />
                <div className="absolute inset-0 bg-gray-800 opacity-0 hover:opacity-75  rounded-full transition-opacity duration-300 "></div>
                <div className="absolute bottom-5 left-14 text-white font-bold">
                  {c.name}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
