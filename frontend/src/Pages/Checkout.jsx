import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Contact from "../components/Home/Contact";
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Checkout from "../components/Checkout";
import Pembayaran from "../components/Pembayaran";
import ModalSuccess from "../components/Modal/Success";
import { useNavigate } from "react-router-dom";

const Pesan = () => {
  const [cartItems, setCartItems] = useState([]);
  const [id, setId] = useState([]);
  const [editedQuantity, setEditedQuantity] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    getCartItem();
  }, []);

  const getCartItem = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart-item");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const Total = () => {
    const hargaAwal = cartItems.reduce(
      (total, item) => total + item.menu.price * item.quantity,
      0
    );
    const ongkir = 15000;
    const total = hargaAwal + ongkir;
    return total;
  };

  // Modal Update
  const [isUpdate, setIsUpdate] = useState(false);
  const openUpdate = () => {
    setIsUpdate(true);
  };
  const closeUpdate = () => {
    setIsUpdate(false);
  };
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
      closeUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  // Modal Delete
  const [isDelete, setIsDelete] = useState(false);
  const openDelete = () => {
    setIsDelete(true);
  };
  const closeDelete = () => {
    setIsDelete(false);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/cart-item/${id}`);
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.log(error);
    }
    setIsDelete(false); // Tutup modal setelah hapus
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 mb-4">
        <div className="flex justify-center my-2 mb-9">
          <ol class="items-nter flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            <li class="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg
                  class="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Cart
              </span>
            </li>

            <li class="flex shrink-0 items-center">
              <svg
                class="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Checkout
            </li>
          </ol>
        </div>
        <div className="bg-gray-100 rounded-lg shadow-lg p-6">
          <Checkout />
          <div className="mt-7 border-t-4">
            <h2 className="text-xl font-bold my-4">Item Pesanan</h2>
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
                            openUpdate();
                          }}
                          className="bg-yellow-400 hover:bg-yellow-500 mx-2 text-black font-bold py-2 px-4 rounded"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setId(item.id);
                            openDelete();
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
          <div className="my-8 border-t-4 pt-4">
            <Pembayaran />
          </div>
          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="">
                <p className="text-lg font-bold">Ongkos Kirim:</p>
                <p className="text-lg font-bold">Diskon:</p>
                <p className="text-lg font-bold">Total:</p>
              </div>
              <div className="">
                <p className="text-2xl font-bold text-right">Rp 15000</p>
                <p className="text-2xl font-bold text-right">Rp 0</p>
                <p className="text-2xl font-bold">Rp {Total()}</p>
              </div>
            </div>
            <ModalSuccess />
          </div>
          <div>
            {/* Main modal */}
            {isUpdate && (
              <div
                id="updateProductModal"
                className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
              >
                <div className="relative p-4 w-full max-w-2xl">
                  <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Update Makanan
                      </h3>
                      <button
                        onClick={closeUpdate}
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
                      <div className="flex items-center justify-between space-x-4">
                        <button
                          type="submit"
                          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={closeUpdate}
                          className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
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
                          Kembali
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            {isDelete && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
                  <button
                    onClick={closeDelete}
                    className="absolute top-2 right-2"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <svg
                    className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                    aria-hidden="true"
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
                  <p className="mb-4 text-gray-500 dark:text-gray-300 text-center">
                    Apakah Anda yakin ingin menghapus pesanan ini?
                  </p>
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      onClick={closeDelete}
                      className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      cancel
                    </button>
                    <button
                      type="submit"
                      onClick={handleDelete}
                      className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Yes
                    </button>
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
