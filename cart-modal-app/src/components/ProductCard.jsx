function ProductCard({product, addToCart}) {

    return (

        <div className="border p-4 rounded-xl shadow hover:shadow-lg hover:scale-105 transition duration-300">
            <img src={product.image} className="h-40 mx-auto object-contain"/>
            <h2 className="text-md font-semibold mt-3 line-clamp-2">{product.title}</h2>
            <p className="text-green-600 font-bold mt-2">₹{product.price}</p>

            <button onClick={()=>addToCart(product)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-3 rounded w-full"
            >Add To Cart
            </button>
            
        </div>
    )
}

export default ProductCard;