import React from "react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gray-400 text-white py-28 Hero">
      <div className="container flex justify-between sm:flex-row flex-col items-center mx-auto px-10 sm:px-28">
        <div className="left mb-5 sm:mb-0">
          <h1 className="lg:text-6xl text-5xl sm:text-4xl font-bold mb-4">
            <span className="fontH1">Street Food</span>
          </h1>
          <p className="text-lg mb-8">
            Nikmati Kelezatan makanan jalanan terbaik dengan bahan-bahan
            berkualitas tinggi dan cita rasa autentik.
          </p>
          <NavLink
            to={'/makanan'}
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Pesan Sekarang
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
