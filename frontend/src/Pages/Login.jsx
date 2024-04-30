import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const [login, setLogin] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getLogin();
  }, []);
  const getLogin = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setLogin(response.data);
  };

  const verifEmail = login.map((item) => item.email);
  const Auth = (e) => {
    e.preventDefault();
    for (const em of verifEmail) {
      const eml = em;
      if (eml == email) {
        console.log("berhasil");
        login.map((item) => {
          if (item.email === eml) {
            navigate(`/${item.id}`);
          }
        });
      } else {
        console.log("salah");
      }
    }
  };

  return (
    <div className="flex px-5 flex-col items-center justify-center h-screen dark">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-4">
          Login To{" "}
          <NavLink to={"/"} className="fontH1">
            Street Food
          </NavLink>
        </h2>
        <form className="flex flex-col" onSubmit={Auth}>
          <input
            placeholder="Email address"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between flex-wrap">
            <p className="text-white mt-4">
              {" "}
              Don't have an account?{" "}
              <NavLink
                className="text-sm text-blue-500 -200 hover:underline mt-4"
                to={"/register"}
              >
                Signup
              </NavLink>
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
