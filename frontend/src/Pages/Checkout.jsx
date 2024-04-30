import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Contact from "../components/Home/Contact";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const Pesan = () => {
  const [cartItems, setCartItems] = useState([]);
  const [id, setId] = useState([]);
  const [editedQuantity, setEditedQuantity] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart-item"); // Replace with the actual endpoint to fetch cart items
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.menu.price * item.quantity,
      0
    );
  };

  // Delete Cart
  const deleteCartItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart-item/${id}`);
      // Memperbarui data cartItems setelah menghapus item
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCartItems);
      navigate("/checkout");
    } catch (error) {
      console.log(error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Modal Update
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/cart-item/${id}`, {
        quantity: editedQuantity,
        notes: notes || note,
      });
      const response = await axios.get("http://localhost:5000/cart-item");
      setCartItems(response.data);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 mb-4">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <div className="bg-gray-100 rounded-lg shadow-lg p-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Item Pesanan</h2>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">{item.menu.name}</h3>
                      <p className="text-gray-600">Jumlah: {item.quantity}</p>
                      <p className="text-gray-600">
                        Catatan: {!item.notes ? "-" : item.notes}
                      </p>
                      <p className="text-gray-600">
                        Harga Satuan: Rp.{item.menu.price}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex">
                        <button
                          onClick={() => {
                            setSelectedMenuItem(item);
                            setEditedQuantity(item.quantity);
                            setId(item.id);
                            setNote(item.notes);
                            openModal();
                          }}
                          className="bg-yellow-400 hover:bg-yellow-500 mx-2 text-black font-bold py-2 px-4 rounded"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Apakah anda yakin ingin menghapus?"
                              )
                            ) {
                              deleteCartItem(item.id);
                            }
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-lg font-bold mt-4">
                        Rp {item.menu.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-bold">Total:</p>
              <p className="text-2xl font-bold">Rp {calculateTotalPrice()}</p>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
              Checkout
            </button>
          </div>
          <div>
            {/* Main modal */}
            {isModalOpen && (
              <div
                id="updateProductModal"
                className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
              >
                <div className="relative p-4 w-full max-w-2xl">
                  {/* Modal content */}
                  <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    {/* Modal header */}
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Update Makanan
                      </h3>
                      <button
                        onClick={closeModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    {/* Modal body */}
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            readOnly="true"
                            value={selectedMenuItem.menu.name}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="jumlah"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Jumlah
                          </label>
                          <input
                            type="number"
                            name="jumlah"
                            id="jumlah"
                            value={editedQuantity}
                            onChange={(e) => setEditedQuantity(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Harga Satuan
                          </label>
                          <input
                            type="number"
                            name="price"
                            id="price"
                            value={selectedMenuItem.menu.price}
                            readOnly="true"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Catatan
                          </label>
                          <textarea
                            id="description"
                            rows="5"
                            onChange={(e) => setNotes(e.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          >
                            {selectedMenuItem.notes}
                          </textarea>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          type="submit"
                          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Update product
                        </button>
                        <button
                          type="button"
                          className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                          <svg
                            className="mr-1 -ml-1 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default Pesan;
