import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  const subtotal = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

const discount = subtotal * 0.1;

const finalPrice = subtotal - discount;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (

        <div className="space-y-6">

          {cart.map(item => (

            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded"
            >

              <img
                src={item.image}
                alt={item.title}
                className="h-20"
              />

              <div className="w-64">
                <h2 className="font-semibold">
                  {item.title}
                </h2>

                <p>₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2">

                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-gray-300 px-2 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-gray-300 px-2 rounded"
                >
                  +
                </button>

              </div>

              <div className="font-bold">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>

            </div>

          ))}

          <div className="text-right text-xl font-bold">
            Total: ₹{total.toFixed(2)}
          </div>

        </div>

        

      )}

      <div className="mt-8 border-t pt-4 text-right space-y-2">

  <p className="text-lg">
    Subtotal: ₹{subtotal.toFixed(2)}
  </p>

  <p className="text-green-600">
    Discount (10%): -₹{discount.toFixed(2)}
  </p>

  <p className="text-2xl font-bold">
    Final Price: ₹{finalPrice.toFixed(2)}
  </p>

</div>

    </div>

    
  );
}

export default Cart;