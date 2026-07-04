import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from '../api';

const ProductDetails = () => {
   const { id } = useParams();
   const [listing, setListing] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const { data } = await API.get(`/listings/${id}`);
            setListing(data);
         } catch (err) {
            console.error("Error fetching product:", err);
         } finally {
            setLoading(false);
         }
      };
      fetchProduct();
   }, [id]);

   if (loading) return (
      <div className="flex justify-center items-center h-64">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
   );
   if (!listing) return (
      <div className="p-10 text-center text-danger">Product not found.</div>
   );

   return (
      <div className="min-h-screen py-8 px-4">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-4">

               {/* IMAGE */}
               <div className="bg-brand-dark rounded-xl h-[480px] flex items-center justify-center overflow-hidden">
                  {listing.image ? (
                     <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-contain"
                     />
                  ) : (
                     <span className="text-sm font-semibold tracking-widest uppercase text-text-muted">No Image</span>
                  )}
               </div>

               {/* DESCRIPTION */}
               <div className="bg-surface-card p-6 rounded-xl border border-surface-muted">
                  <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-3">Description</h2>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                     {listing.description}
                  </p>
               </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4">

               {/* PRICE CARD */}
               <div className="bg-surface-card p-6 rounded-xl border border-surface-muted">
                  <p className="text-3xl font-extrabold text-text-primary mb-1">
                     ₹ {listing.price?.toLocaleString('en-IN')}
                  </p>
                  <p className="text-text-secondary text-base font-medium truncate">{listing.title}</p>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-surface-muted text-xs text-text-muted font-medium">
                     <span className="uppercase tracking-wide">{listing.category}</span>
                     <span>{new Date(listing.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
               </div>

               {/* SELLER CARD */}
               <div className="bg-surface-card p-6 rounded-xl border border-surface-muted">
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Seller</h3>
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-11 h-11 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {listing.seller?.name?.charAt(0) || "U"}
                     </div>
                     <div>
                        <p className="font-bold text-text-primary">{listing.seller?.name || "Verified User"}</p>
                        <p className="text-xs text-text-muted">
                           Member since {new Date(listing.seller?.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                        </p>
                     </div>
                  </div>
                  <button className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-brand-dark transition-colors mb-3 text-sm">
                     Chat with Seller
                  </button>
                  <button className="w-full border border-brand-primary text-brand-primary font-bold py-3 rounded-lg hover:bg-surface-page transition-colors text-sm">
                     Show Phone Number
                  </button>
               </div>

               {/* SAFETY TIPS */}
               <div className="bg-surface-card p-5 rounded-xl border border-surface-muted">
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">Safety Tips</h3>
                  <ul className="text-xs text-text-secondary space-y-2">
                     <li className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold mt-0.5">—</span>
                        Meet in a public place
                     </li>
                     <li className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold mt-0.5">—</span>
                        Check the item before you pay
                     </li>
                     <li className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold mt-0.5">—</span>
                        Don't pay in advance
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductDetails;