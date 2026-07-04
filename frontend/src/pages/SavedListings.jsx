// SavedListings.jsx
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
   }, [savedListings]);

   if (loading) return (
      <div className="flex justify-center items-center h-64">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
   );

   if (error) return <div className="p-10 text-center text-danger">{error}</div>;

   return (
      <div className="max-w-4xl mx-auto px-4 py-8">
         <h1 className="text-2xl font-extrabold text-text-primary mb-1">Saved Ads</h1>
         <p className="text-sm text-text-muted mb-6">Items you've saved for later</p>

         {listings.length === 0 ? (
            <div className="text-center py-20">
               <p className="text-text-secondary mb-3">No saved ads yet.</p>
               <Link to="/" className="bg-brand-primary text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-brand-dark transition-colors">
                  Browse listings
               </Link>
            </div>
         ) : (
            <div className="space-y-3">
               {listings.map((listing) => (
                  <div key={listing._id} className="bg-surface-card border border-surface-muted rounded-xl p-4 flex gap-4 items-center">
                     <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                     />
                     <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-text-primary truncate">{listing.title}</h2>
                        <p className="text-brand-primary font-bold text-sm">₹ {listing.price?.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-text-muted mt-0.5 uppercase tracking-wide">{listing.category}</p>
                     </div>
                     <div className="flex items-center gap-3 flex-shrink-0">
                        <Link
                           to={`/listing/${listing._id}`}
                           className="text-sm font-semibold text-brand-primary hover:underline"
                        >
                           View
                        </Link>
                        <button
                           onClick={() => toggleSaved(listing._id)}
                           className="text-sm font-semibold text-danger hover:underline"
                        >
                           Unsave
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default SavedListings;