import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {

  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const isInCart = cart.find(item => item.id === product.id);

  return (
    <div className="border rounded-lg p-4 shadow">

      <img
        src={product.image}
        alt={product.title}
        className="h-40 mx-auto object-contain"
      />

      <h2 className="font-semibold mt-4 line-clamp-2">
        {product.title}
      </h2>

      <p className="text-gray-500 text-sm line-clamp-2 mt-2">
        {product.description}
      </p>

      <div className="flex justify-between items-center mt-4">

        <span className="font-bold text-lg">
          ₹{product.price}
        </span>

        {isInCart ? (
          <button
            onClick={() => removeFromCart(product.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add to Cart
          </button>
        )}

      </div>

    </div>
  );
}

export default ProductCard;