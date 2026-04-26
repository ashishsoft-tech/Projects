function Navbar({cartCount, openCart}) {

    return (

        <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">AshishZone</h1>
            <button
              onClick={openCart} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Cart ({cartCount})
            </button>
        </div>
        
    )

}

export default Navbar;