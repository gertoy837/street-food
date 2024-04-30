import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Contact from "../components/Home/Contact";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Categories from "../components/Categories";

const Kategori = () => {
  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    getKategori();
  }, []);
  const getKategori = async () => {
    const response = await axios.get("http://localhost:5000/categories");
    setKategori(response.data);
  };
  return (
    <div>
      <Navbar />

      <div className="container mx-auto py-8">
        <h1 className="text-4xl text-center my-4 font-bold text-gray-700">
          All Kategori
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {kategori.map((kategori) => (
            <NavLink to={`/kategori/${kategori.id}`}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4 flex items-center">
                  <div>
                    <h3 className="text-xl font-bold text-center">
                      {kategori.name}
                    </h3>
                    <p className="text-gray-600">{kategori.categories}</p>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <Categories />
      <Contact />
    </div>
  );
};

export default Kategori;
