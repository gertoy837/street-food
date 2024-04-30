import React from "react";
import Hero from "./Hero";
import CTA from "./CTA";
import RestaurantSlider from "./RestaurantSider";
import Contact from "./Contact";
import About from "./About";
import TestimonialSection from "./Testimonial";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Restaurant Slider */}
      <RestaurantSlider />

      {/* About Section */}
      <About />

      {/* CTA Section */}
      <CTA />

      {/* Menu Section */}
      {/* <section className="bg-gray-100 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8">
            Menu Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Menu Item"
                className="w-full h-40 md:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-bold mb-2">Nama Menu</h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Deskripsi singkat menu dalam gaya handwritten.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg font-bold text-red-600">
                    Rp 25.000
                  </span>
                  <button className="bg-red-600 text-white py-2 px-4 rounded-full">
                    Pesan
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Menu Item"
                className="w-full h-40 md:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-bold mb-2">Nama Menu</h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Deskripsi singkat menu dalam gaya handwritten.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg font-bold text-red-600">
                    Rp 25.000
                  </span>
                  <button className="bg-red-600 text-white py-2 px-4 rounded-full">
                    Pesan
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Menu Item"
                className="w-full h-40 md:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-bold mb-2">Nama Menu</h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Deskripsi singkat menu dalam gaya handwritten.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg font-bold text-red-600">
                    Rp 25.000
                  </span>
                  <button className="bg-red-600 text-white py-2 px-4 rounded-full">
                    Pesan
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Menu Item"
                className="w-full h-40 md:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-bold mb-2">Nama Menu</h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Deskripsi singkat menu dalam gaya handwritten.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg font-bold text-red-600">
                    Rp 25.000
                  </span>
                  <button className="bg-red-600 text-white py-2 px-4 rounded-full">
                    Pesan
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Menu Item"
                className="w-full h-40 md:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-bold mb-2">Nama Menu</h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Deskripsi singkat menu dalam gaya handwritten.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg font-bold text-red-600">
                    Rp 25.000
                  </span>
                  <button className="bg-red-600 text-white py-2 px-4 rounded-full">
                    Pesan
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Menu Item"
                className="w-full h-40 md:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-bold mb-2">Nama Menu</h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Deskripsi singkat menu dalam gaya handwritten.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg font-bold text-red-600">
                    Rp 25.000
                  </span>
                  <button className="bg-red-600 text-white py-2 px-4 rounded-full">
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonial Section */}
      <TestimonialSection/>

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Home;
