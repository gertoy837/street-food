import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative isolate overflow-hidden bg-transparent text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Tentang Kami</h3>
            <p>Kami adalah penyedia <span className='fontH1'>street food</span> terbaik di kota ini. Kami bangga menyajikan makanan lezat dengan bahan-bahan berkualitas tinggi.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan</h3>
            <ul className="space-y-2">
              <li><NavLink to={'/'} className="hover:text-gray-300 hover:border-b">Beranda</NavLink></li>
              <li><NavLink to={'/kategori'} className="hover:text-gray-300 hover:border-b">Kategori</NavLink></li>
              <li><NavLink to={'/makanan'} className="hover:text-gray-300 hover:border-b">Makanan</NavLink></li>
              <li><NavLink to={'/restaurant'} className="hover:text-gray-300 hover:border-b">Restaurant</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Ikuti Kami</h3>
            <ul className="space-y-2">
              <li><NavLink href="#" className="hover:text-gray-300 hover:border-b">Facebook</NavLink></li>
              <li><NavLink href="#" className="hover:text-gray-300 hover:border-b">Instagram</NavLink></li>
              <li><NavLink href="#" className="hover:text-gray-300 hover:border-b">Twitter</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p>&copy; 2024 Street Food. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;