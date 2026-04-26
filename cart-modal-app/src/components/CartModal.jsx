function CartModal({ cart, removeFromCart, closeModal }) {

    const totalPrice = cart.reduce(

        (total,item)=> total + item.price,0
    )


    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Cart Items</h2>

                {cart.length === 0 ? (<p>No items in cart</p>) : (

                cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between mb-4">

                        <div className="flex items-center gap-3">

                            <img src={item.image} className="h-12 w-12 object-contain"/>

                            <p className="text-sm">{item.title}</p>

                        </div>

                <button onClick={()=>removeFromCart(item.id)} className="text-red-500 text-sm">Remove</button>

            </div>
            ))
            )}


            <div className="mt-4 font-bold">
                Total: ₹{totalPrice.toFixed(2)}
            </div>

              <button onClick={closeModal} className="bg-gray-800 text-white px-4 py-2 mt-4 rounded w-full">Close</button>
              
            </div>
        </div>
        
    )
}

export default CartModal;