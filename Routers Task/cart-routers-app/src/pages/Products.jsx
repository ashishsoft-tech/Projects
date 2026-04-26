import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (

    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Product List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>

  );
}

export default Products;