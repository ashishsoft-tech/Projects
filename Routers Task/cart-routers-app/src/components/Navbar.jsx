import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {

  const { cart } = useContext(CartContext);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">

      <h1 className="text-xl font-bold">
        AshishZone
      </h1>

      <div className="space-x-6">

        <Link to="/">Products</Link>

        <Link to="/cart">
          Cart ({cart.length})
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;