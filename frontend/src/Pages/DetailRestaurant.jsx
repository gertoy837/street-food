import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Contact from "../components/Home/Contact";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { StarIcon } from "@heroicons/react/24/outline";

const DetailRestaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    getRestaurant();
  }, [id]);
  const getRestaurant = async () => {
    const response = await axios.get(`http://localhost:5000/restaurants/${id}`);
    setRestaurant(response.data);
  };

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getMenuItems();
  }, []);
  const getMenuItems = async () => {
    const response = await axios.get("http://localhost:5000/menu-items");
    setMenuItems(response.data);
  };

  const date = restaurant.createdAt ? new Date(restaurant.createdAt) : null;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 my-10">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <img
            src={restaurant.url}
            alt={restaurant.image}
            className="w-full h-40 md:h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg md:text-xl font-bold mb-2">
              {restaurant.name}
            </h3>
            <p className="text-sm md:text-base text-gray-700">
              Kota : {restaurant.city}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              Phone : {restaurant.no_hp}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              Bergabung :{" "}
              {formatDistanceToNow(new Date(date), {
                addSuffix: true,
              })}
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-4 py-2">
              {restaurant.description}
            </p>
          </div>
        </div>
      </div>
      <section className="bg-gray-100 py-8 md:py-16">
        <div className="container mx-auto px-16 sm:px-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8">
            Menu
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {menuItems
              .filter((item) => restaurant.id == item.restaurant_id)
              .map((item) => (
                <div
                  className="bg-white shadow-xl rounded-lg overflow-hidden"
                  key={item.id}
                >
                  <img
                    src={item.url}
                    alt={item.image}
                    className="w-full h-40 md:h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <NavLink to={`/makanan/${item.id}`}>
                        <h3 className="text-lg md:text-xl font-bold mb-2">
                          {item.name}
                        </h3>
                      </NavLink>
                      <span className="flex items-center">
                        <StarIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                        {item.rating}
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-gray-700 mb-4 py-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-base md:text-lg font-bold text-red-600">
                        Rp {item.price}
                      </span>
                      <button className="bg-red-600 text-white py-2 px-4 rounded-full">
                        Pesan
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
};

export default DetailRestaurant;
