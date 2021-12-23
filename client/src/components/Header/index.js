import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/" className="text-white">
          <h1 className="text-white">HacAtac MERNql</h1>
        </Link>

        <nav className="text-center text-white">
          <Link to="/login" className="text-white">
            {" "}
            Login{" "}
          </Link>
          <Link to="/signup" className="text-white">
            {" "}
            Signup{" "}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
