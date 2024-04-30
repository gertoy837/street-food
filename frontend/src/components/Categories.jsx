import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";

const Categories = () => {
  const { id } = useParams();

  const [menuItems, setMenuItems] = useState([]);
  const [kategori, setKategori] = useState(null);

  useEffect(() => {
    getMenuItems();
    getKategori();
  }, [id]);

  const getMenuItems = async () => {
    const response = await axios.get("http://localhost:5000/menu-items");
    setMenuItems(response.data);
  };

  const getKategori = async () => {
    const response = await axios.get(`http://localhost:5000/categories/${id}`);
    setKategori(response.data);
  };

  return (
    <div>
      <section className="bg-gray-100 py-8 md:py-16">
        <div className="container mx-auto px-16 sm:px-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8">
           { !id ? '' : `Menu Kategori : ${kategori?.name}` }
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {menuItems
              .filter((item) => item.categori_id == id)
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
                    <NavLink
                      to={`/restaurant/${item.restaurant_id}`}
                      className="text-sm md:text-base font-bold text-gray-700 py-2"
                    >
                      {/* {restaurantName} */}
                    </NavLink>
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
    </div>
  );
};

export default Categories;
