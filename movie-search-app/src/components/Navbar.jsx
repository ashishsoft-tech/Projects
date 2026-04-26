import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow">
  <h1 className="text-xl font-bold">🎬 MovieApp</h1>

  <div className="flex gap-4">
    <Link to="/">Home</Link>
    <Link to="/favorites">Favorites</Link>
  </div>
</nav>
  );
}

export default Navbar;