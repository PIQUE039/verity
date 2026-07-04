import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from '../api';
import ListingCard from "../components/ListingCard";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const categories = ['All', 'Mobiles', 'Cars', 'Bikes', 'Electronics', 'Furniture', 'Fashion'];
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm.trim()}`);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/listings?search=${search}&category=${category}`);
        setListings(data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [search, category]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
    </div>
  );

  return (
    <main className="min-h-screen">

      {/* HERO */}
      <div className="bg-brand-primary text-white py-8 px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Find your next deal.</h1>
          <p className="text-surface-muted text-lg mb-6">Buy and sell anything, locally.</p>
          <form onSubmit={handleSearch} className="flex max-w-xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for anything..."
              className="flex-1 px-4 py-3 rounded-l-lg text-text-primary text-sm focus:outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-brand-accent text-white px-6 py-3 rounded-r-lg font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* LISTINGS */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <h2 className="text-2xl text-text-primary font-semibold mb-6">Fresh Recommendations</h2>

        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                const params = new URLSearchParams();
                if (search) params.set('search', search);
                if (cat !== 'All') params.set('category', cat);
                navigate(`/?${params.toString()}`);
              }}
              className={`px-4 py-1.5 rounded-full border text-sm font-semibold transition-colors
                ${category === cat || (cat === 'All' && !category)
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-surface-card text-brand-primary border-surface-muted hover:border-brand-primary'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((item) => (
              <ListingCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">No ads found. Be the first to sell something!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;