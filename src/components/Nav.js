import React from "react";
import Logo from "../resources/logo.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <img src={Logo} alt="logo" className="logo" />
      <ul className="nav-links">
        <Link className="nav-links" to="/">
          <li>Search Trips</li>
        </Link>
        <Link className="nav-links" to="/Page2">
          <li>General Stats</li>
        </Link>
        <Link className="nav-links" to="/Page3">
          <li>Line Accuracy</li>
        </Link>
        <Link className="nav-links" to="/Page4">
          <li>Delay Spread</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
