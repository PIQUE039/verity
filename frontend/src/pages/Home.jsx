import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from '../api';
import ListingCard from "../components/ListingCard";

const Home = () =>{
   //MEMORY BOX
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const categories = ['All', 'Mobiles', 'Cars', 'Bikes', 'Electronics', 'Furniture', 'Fashion'];
  const navigate = useNavigate();

   //THE TRIGGER: Runs exactly one time when the page loads
  useEffect(() =>{
      const fetchListings = async () => {
        setLoading(true);
        try{
            const {data} = await API.get(`/listings?search=${search}&category=${category}`);
            setListings(data); //Update memory box.
         }catch(err){
            console.error("Error fetching listings:",err);
         }finally{
            setLoading(false); //Stop loading.
         }
      };
      fetchListings(); //Executing the function above.
  },[search, category]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-900"></div>
    </div>
  );

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl text-slate-800 font-semibold mb-6">Fresh Recommendations</h2>

      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => {
            const params = new URLSearchParams();
            if(search) params.set('search', search);
            if(cat !== 'All') params.set('category', cat);
            navigate(`/?${params.toString()}`);
         }}
        className={`px-4 py-1 rounded-full border text-sm font-semibold transition-colors
        ${category === cat || (cat === 'All' && !category)
               ? 'bg-cyan-900 text-white border-cyan-900'
               : 'bg-white text-cyan-900 border-cyan-900 hover:bg-cyan-50'
          }`}>
        {cat}
      </button>
        ))}
      </div>
        
        {/* THE RESPONSIVE GRID */}
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((item) => (
              <ListingCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No ads found. Be the first to sell something!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;