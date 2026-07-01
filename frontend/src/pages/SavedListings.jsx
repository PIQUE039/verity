import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";

const SavedListings = () => {
   const [listings, setListings] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
   const { toggleSaved, savedListings } = useAuth();

   useEffect(() => {
      const fetchSaved = async () => {
         try {
            const { data } = await API.get('/listings/saved');
            setListings(data);
         } catch (err) {
            setError('Failed to fetch saved listings.');
         } finally {
            setLoading(false);
         }
      };
      fetchSaved();
   }, [savedListings]); // re-fetches when savedListings changes in context

   if (loading) return <div className="p-10 text-center">Loading saved ads...</div>;
   if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

   return (
      <div className="max-w-4xl mx-auto px-4 py-8">
         <h1 className="text-2xl font-bold text-slate-800 mb-6">Saved Ads</h1>
         {listings.length === 0 ? (
            <div className="text-center py-20">
               <p className="text-slate-500">No saved ads yet.</p>
               <Link to="/" className="text-cyan-900 font-bold hover:underline mt-2 inline-block">
                  Browse listings
               </Link>
            </div>
         ) : (
            <div className="space-y-4">
               {listings.map((listing) => (
                  <div key={listing._id} className="bg-white border border-slate-200 rounded-lg p-4 flex gap-4 items-center shadow-sm">
                     <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-24 h-24 object-cover rounded"
                     />
                     <div className="flex-1">
                        <h2 className="font-bold text-slate-800">{listing.title}</h2>
                        <p className="text-cyan-900 font-bold">₹ {listing.price?.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-slate-400 mt-1">{listing.category}</p>
                     </div>
                     <Link
                        to={`/listing/${listing._id}`}
                        className="text-sm text-cyan-900 font-bold hover:underline"
                     >
                        View
                     </Link>
                     <button
                        onClick={() => toggleSaved(listing._id)}
                        className="text-sm text-red-500 font-bold hover:underline"
                     >
                        Unsave
                     </button>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default SavedListings;