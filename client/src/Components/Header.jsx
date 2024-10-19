import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">Sahand</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </Link>

          <form className="flex bg-slate-100 items-center p-3 rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              className="text-xs sm:text-sm bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <button>
              <FaSearch />
            </button>
          </form>

          <nav>
            <ul className="flex gap-4">
              <li>
                <Link to="/" className="hidden sm:inline text-slate-700 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hidden sm:inline text-slate-700 hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-slate-700 hover:underline">
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
