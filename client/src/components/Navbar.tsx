import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Cart from "./Cart";

export default function Navbar() {
  const [cartStyle, setCartStyle] = useState({ display: "none" });

  const ShowCart = () => {
    if (cartStyle.display === "none") setCartStyle({ display: "block" });
    else setCartStyle({ display: "none" });
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>Night Market</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Shop</Link>
        <Link to="/purchased-items">purchases</Link>
        <div>
          <FontAwesomeIcon onClick={ShowCart} icon={faShoppingCart} />
          <Cart cartStyle={cartStyle} />
        </div>
      </div>
    </div>
  );
}
