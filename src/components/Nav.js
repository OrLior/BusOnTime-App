import React from "react";
import Logo from "../resources/logo.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <img src={Logo} alt="logo" className="logo" />
      <ul className="nav-links">
        <Link className="nav-links" to="/">
          <li>Page 1</li>
        </Link>
        <Link className="nav-links" to="/Page2">
          <li>Page 2</li>
        </Link>
        <Link className="nav-links" to="/Page3">
          <li>Page 3</li>
        </Link>
        <Link className="nav-links" to="/Page4">
          <li>Page 4</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
