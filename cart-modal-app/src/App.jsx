import { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CartModal from "./components/CartModal";


function App() {

    const [cart,setCart] = useState([]);
    const [showModal,setShowModal] = useState(false);

    const addToCart = (product)=>{

    const exists = cart.find(item => item.id === product.id)

    if(exists){
      alert("Item already added to the cart")
      return
    }
    setCart([...cart,product])

    }


    const removeFromCart = (id)=>{

        setCart(cart.filter(item => item.id !== id))
        }


    return (

        <div>

            <Navbar cartCount={cart.length}
             openCart={()=>setShowModal(true)}
            />

            <Home addToCart={addToCart}/>

            {showModal && (

                <CartModal cart={cart} removeFromCart={removeFromCart} closeModal={()=>setShowModal(false)}/>

            )}

        </div>
        
    )
}

export default App;