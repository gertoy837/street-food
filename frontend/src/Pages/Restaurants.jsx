import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Contact from "../components/Home/Contact";
import { NavLink } from "react-router-dom";

const Restaurants = () => {
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    getRestaurant();
  }, []);
  const getRestaurant = async () => {
    const response = await axios.get("http://localhost:5000/restaurants");
    setRestaurant(response.data);
  };
  return (
    <div>
      <Navbar />
      <section className="bg-gray-100 py-8 md:py-16">
        <div className="container mx-auto px-16 sm:px-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8">
            Restaurant Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {restaurant.map((item) => (
              <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <img
                  src={item.url}
                  alt={item.image}
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 mb-4 py-2">
                    {item.description.length > 10
                      ? `${item.description
                          .split(" ")
                          .slice(0, 10)
                          .join(" ")}...`
                      : item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <NavLink to={`/restaurant/${item.id}`} className="bg-blue-600 text-white py-2 px-4 text-sm rounded-full">
                      Read More...
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Contact />
    </div>
  );
};

export default Restaurants;
