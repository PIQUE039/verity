import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm.trim()}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-surface-card border-b border-surface-muted sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">

        {/* LOGO */}
        <Link to="/" className="flex-shrink-0">
          <span className="text-xl font-extrabold tracking-tight text-brand-primary">
            Verity
          </span>
        </Link>

        {/* SEARCH */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for anything..."
            className="w-full border border-surface-muted bg-surface-page text-text-primary px-4 py-2 rounded-l-lg text-sm focus:outline-none focus:border-brand-primary transition-colors"
          />
          <button
            type="submit"
            className="bg-brand-primary text-white px-5 py-2 rounded-r-lg text-sm font-semibold hover:bg-brand-dark transition-colors"
          >
            Search
          </button>
        </form>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {token ? (
            <>
              <Link to="/saved" className="text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors hidden md:block">
                Saved
              </Link>
              <Link to="/my-listings" className="text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors hidden md:block">
                My Ads
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                Logout
              </button>
              <Link to="/add" className="flex items-center gap-1.5 bg-brand-accent text-white text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                + Sell
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-sm font-bold bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;