import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home({addToCart}) {

    const [products,setProducts] = useState([]);

    useEffect(()=>{

        fetch("https://fakestoreapi.com/products")
       .then(res => res.json())
       .then(data => setProducts(data))

       },[])


    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {products.map(product => (

                 <ProductCard
                 key={product.id}
                 product={product}
                 addToCart={addToCart}
                />

                ))}

            </div>

        </div>
    )
}

export default Home;









