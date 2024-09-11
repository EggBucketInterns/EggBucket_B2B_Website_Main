import React from 'react';
import { Search, Menu } from 'lucide-react';
import logo from "../assets/images/logo-egg.jpg";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
      <div className="flex items-center w-1/3">
        <Menu className="mr-4 h-6 w-6 text-gray-500 md:hidden" />
        <img src={logo} alt="User avatar" className="pl-12 h-20" />
      </div>
      
      <div className="flex-grow flex justify-center">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default Header;
