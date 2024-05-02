import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";

const Categories = () => {
  const { id } = useParams();

  const [menuItems, setMenuItems] = useState([]);
  const [kategori, setKategori] = useState(null);
  const [isPesan, setIsPesan] = useState(false);
  const [menuItem, setMenuItem] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

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

  const toggleModal = () => {
    setIsPesan(!isPesan);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cart = await axios.post("http://localhost:5000/carts", {
        user_id: 2,
        restaurant_id: menuItem.restaurant_id,
      });
      const cartId = cart.data.id; // Mendapatkan Id cart dari response

      await axios.post("http://localhost:5000/cart-item", {
        cart_id: cartId,
        menu_item_id: menuItem.id,
        quantity: quantity,
        notes: notes,
      });
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="bg-gray-100 py-8 md:py-16">
        <div className="container mx-auto px-16 sm:px-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8">
            {!id ? "" : `Menu Kategori : ${kategori?.name}`}
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
                      <NavLink
                        onClick={() => {
                          setMenuItem(item);
                          toggleModal();
                        }}
                        className="bg-red-600 text-white py-2 px-4 rounded-full"
                      >
                        Pesan
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            {isPesan && (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
                <div className="bg-white rounded-lg shadow-xl max-w-md mx-auto relative">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Pesan Makanan</h2>
                      <button
                        className="text-gray-500 hover:text-gray-500 focus:outline-none"
                        onClick={toggleModal}
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                      {menuItem && (
                        <div className="mb-4">
                          <img
                            src={menuItem.url}
                            alt={menuItem.image}
                            className="w-32 h-auto object-contain mb-2"
                          />
                          <p className="text-gray-800 font-semibold">
                            {menuItem.name}
                          </p>
                          <p className="text-gray-600">
                            {menuItem.restaurant.name}
                          </p>
                          <p className="text-gray-500">
                            {menuItem.description}
                          </p>
                          <p className="text-red-600 font-bold">
                            Rp. {menuItem.price}
                          </p>
                        </div>
                      )}
                      <div className="mb-4">
                        <label
                          htmlFor="quantity"
                          className="block text-gray-700 font-semibold mb-2"
                        >
                          Jumlah
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          // value={'1'}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="notes"
                          className="block text-gray-700 font-semibold mb-2"
                        >
                          Catatan
                        </label>
                        <textarea
                          name="notes"
                          id="notes"
                          onChange={(e) => setNotes(e.target.value)}
                          cols="30"
                          rows="4"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        Pesan
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
