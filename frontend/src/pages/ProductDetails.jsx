import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from '../api';

const ProductDetails = ()=>{
   const {id} = useParams(); //Grabs ID from the URL bar
   const [listing, setListing] = useState(null);
   const [loading, setLoading] = useState(true);


   useEffect(() => {
      const fetchProduct = async () => {
         try{
            const {data} = await API.get(`/listings/${id}`);
            setListing(data);
         }catch(err){
            console.error("Error fetching product:", err);
         }finally{
            setLoading(false);
         }
      };
      fetchProduct();
   },[id]); //Re-run if the ID in the URL changes

   if(loading) return <div className="p-10 text-center">Loading item...</div>;
   if(!listing) return <div className="p-10 text-center text-red-500">Product not found.</div>

   return (
      <div className="bg-slate-50 min-h-screen py-8 px-4">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* LEFT COLUMN: Image & Description (2/3 width) */}
         <div className="lg:col-span-2 space-y-4">
            <div className="bg-black rounded-lg h-[500px] flex items-center justify-center overflow-hidden shadow-lg">
               {listing.image ? (
                  <img
                     src={`${import.meta.env.VITE_API_URL}/${listing.image}`}
                     alt={listing.title}
                     className="w-full h-full object-contain"
                  />
                  ) : (
                  <span className="text-xl font-bold tracking-widest opacity-50 uppercase text-white">No Image</span>
               )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
               <h2 className="text-2xl font-bold text-slate-800 mb-4 uppercase tracking-tight">Description</h2>
               <p className="text-slate-600 leading-relaxed whitespace-pre-line">
               {listing.description}
               </p>
            </div>
         </div>

         {/* RIGHT COLUMN: Price & Seller Info (1/3 width) */}
         <div className="space-y-4">
            {/* PRICE CARD */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
               <h1 className="text-4xl font-bold text-slate-900 mb-2">
               ₹ {listing.price?.toLocaleString('en-IN')}
               </h1>
               <p className="text-slate-500 text-lg uppercase truncate">{listing.title}</p>
               
               <div className="flex justify-between items-center mt-6 text-xs text-slate-400 font-medium">
                  <span>{listing.category}</span>
                  <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
               </div>
            </div>

            {/* SELLER CARD */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
               <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase">Seller Description</h3>
               <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 bg-cyan-900 rounded-full flex items-center justify-center text-white font-bold">
                  {listing.seller?.name?.charAt(0) || "U"}
               </div>
               <div>
                  <p className="font-bold text-slate-900">{listing.seller?.name || "Verified User"}</p>
                  <p className="text-xs text-slate-500 italic">
                     Member since {new Date(listing.seller?.createdAt).toLocaleDateString('en-IN', {month:'long', year:'numeric'})}
                  </p>
               </div>
               </div>
               
               <button className="w-full bg-cyan-900 text-white font-bold py-3 rounded hover:bg-cyan-950 transition-colors mb-3">
               Chat with Seller
               </button>
               <div className="text-center">
                  <span className="text-cyan-900 font-bold text-sm cursor-pointer hover:underline">Show Phone Number</span>
               </div>
            </div>

            {/* SAFETY TIPS */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
               <h3 className="font-bold text-slate-800 mb-2 uppercase text-sm">Safety Tips</h3>
               <ul className="text-xs text-slate-500 list-disc ml-4 space-y-1">
                  <li>Meet in a public place</li>
                  <li>Check the item before you pay</li>
                  <li>Don't pay in advance</li>
               </ul>
            </div>
         </div>

         </div>
      </div>
   );
};

export default ProductDetails;