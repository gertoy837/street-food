import React, { useEffect, useState } from "react";
import axios from "axios";

const RestaurantSlider = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);
  const getRestaurants = async () => {
    const response = await axios.get("http://localhost:5000/restaurants");
    setRestaurants(response.data);
  };

  return (
    <div className="bg-gray-200 py-8">
      <div className="flex overflow-x-hidden">
        <div className="animate-slide">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 mx-2 flex-shrink-0"
            >
              <h3 className="text-lg font-bold">{restaurant.name}</h3>
            </div>
          ))}
          {/* Klon elemen card restoran */}
          {restaurants.map((restaurant, index) => (
            <div
              key={`clone-${index}`}
              className="bg-white rounded-lg shadow-md p-4 mx-2 flex-shrink-0 slide-clone"
            >
              <h3 className="text-lg font-bold">{restaurant.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantSlider;
