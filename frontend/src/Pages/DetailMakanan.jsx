import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Contact from "../components/Home/Contact";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";

const DetailMakanan = () => {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    getMenuItems();
    getRestaurant();
  }, [id]);
  
  const getMenuItems = async () => {
    const response = await axios.get(`http://localhost:5000/menu-items/${id}`);
    setMenuItems(response.data);
  };

  const getRestaurant = async () => {
    const response = await axios.get("http://localhost:5000/restaurants");
    setRestaurant(response.data);
  };

  const restaurantName =
    restaurant.find((resto) => resto.id === menuItems.restaurant_id)?.name ||
    "Nama Restoran Tidak Ditemukan";
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 my-10">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <img
            src={menuItems.url}
            alt={menuItems.image}
            className="w-full h-40 md:h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg md:text-xl font-bold mb-2">
              {menuItems.name}
            </h3>
            <NavLink
              to={`/restaurant/${menuItems.restaurant_id}`}
              className="text-sm md:text-base font-bold text-gray-700 py-2"
            >
              <span className="text-gray-700 font-normal">Nama Toko : </span>
              {restaurantName}
            </NavLink>
            <p className="text-sm md:text-base text-gray-700">
              Rating : {menuItems.rating}%
            </p>
            <p className="text-sm md:text-base text-gray-700">
              harga : Rp. {menuItems.price}
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-4 py-2">
              {menuItems.description}
            </p>
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default DetailMakanan;
