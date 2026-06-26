import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  
  const { user, token, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-100 border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-cyan-900 tracking-tighter">OLX CLONE</span>
        </Link>

        {/* SEARCH BAR PLACEHOLDER  */}
        <div className="hidden md:flex flex-1 mx-10">
          <input 
            type="text" 
            placeholder="Search cars, mobile phones and more..." 
            className="w-full border-2 border-cyan-900 px-4 py-2 rounded-l focus:outline-none"
          />
          <button className="bg-cyan-900 text-white px-6 py-2 rounded-r">
             🔍
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-6 font-semibold text-cyan-900">
          {token ? (
            <>
              {/* LOGGED IN VIEW */}
              <button onClick={handleLogout} className="hover:underline">Logout</button>
              
              <Link to="/add" className="flex items-center gap-1 bg-white border-4 border-t-yellow-400 border-l-cyan-400 border-r-blue-400 border-b-yellow-700 px-4 py-1 rounded-full shadow-md hover:bg-slate-50 transition-all">
                <span className="text-xl">+</span> SELL
              </Link>
            </>
          ) : (
            <>
              {/* LOGGED OUT VIEW */}
              <Link to="/login" className="hover:underline underline-offset-8">Login</Link>
              <Link to="/register" className="bg-cyan-900 text-white px-4 py-2 rounded hover:bg-cyan-800">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;