import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./Pages/Welcome";
import Kategori from "./Pages/Kategori";
import Makanan from "./Pages/Makanan";
import Restaurants from "./Pages/Restaurants";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import DetailRestaurant from "./Pages/DetailRestaurant";
import DetailMakanan from "./Pages/DetailMakanan";
import Pesan from "./Pages/Checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/kategori/:id" element={<Kategori />} />
          <Route path="/makanan" element={<Makanan />} />
          <Route path="/restaurant" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<DetailRestaurant />} />
          <Route path="/makanan/:id" element={<DetailMakanan />} />
          <Route path="/checkout" element={<Pesan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
