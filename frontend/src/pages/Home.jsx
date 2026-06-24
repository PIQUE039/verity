import { useState, useEffect } from "react";
import API from '../api';
import ListingCard from "../components/ListingCard";

const Home = () =>{
   //MEMORY BOX
   const [listings, setListings] = useState([]);
   const [loading, setLoading] = useState(true)

   //THE TRIGGER: Runs exactly one time when the page loads
   useEffect(() =>{
      const fetchListings = async () =>{
         try{
            console.log('Fetching listings...');
            const {data} = await API.get('/listings');
            setListings(data); //Update memory box.
         }catch(err){
            console.error("Error fetching listings:",err);
         }finally{
            setLoading(false); //Stop loading.
         }
      };

      fetchListings(); //Executing the function above.
   },[]);

   if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-900"></div>
    </div>
   );

   return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl text-slate-800 font-semibold mb-6">Fresh Recommendations</h2>
        
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