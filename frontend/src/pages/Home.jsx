import { useState, useEffect } from "react";
import API from '../api';

const Home = () =>{
   //MEMORY BOX
   const [listings, setListings] = useState([]);

   //THE TRIGGER: Runs exactly one time when the page loads
   useEffect(() =>{
      const fetchListings = async () =>{
         try{
            console.log('Fetching listings...');
            const response = await API.get('/listings');

            console.log("Data Recieved:", response.data); //Verify data structure.
            setListings(response.data); //Update memory box.
         }catch(err){
            console.error("Error fetching listings:",err);
         }
      };

      fetchListings(); //Executing the function above.
   },[]);

   return (
    <div style={{ padding: '20px' }}>
      <h1>Fresh Recommendations</h1>
      
      {/* THE GRID: Creates a responsive layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        
        {/* THE LOOP: Takes the data and turns it into HTML */}
        {listings.map((item) => (
          <div key={item._id} style={cardStyle}>
            {/* Placeholder image for now */}
            <div style={imagePlaceholder}>
               <span>Image</span>
            </div>
            
            <div style={{ padding: '10px' }}>
               <h3 style={{ margin: '0 0 10px 0' }}>₹ {item.price}</h3>
               <p style={{ margin: '0', fontWeight: '500' }}>{item.title}</p>
               <p style={{ fontSize: '12px', color: 'gray' }}>{item.category}</p>
               
               {/* Optional Chaining (?.) protects us if seller data is missing */}
               <small style={{ display: 'block', marginTop: '10px', color: '#555' }}>
                  Seller: {item.seller?.name || "Unknown User"}
               </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// BASIC STYLES (We will replace this with Tailwind on Day 7)
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '4px',
  overflow: 'hidden', // Keeps image inside the corners
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const imagePlaceholder = {
  width: '100%',
  height: '160px',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#888'
};

export default Home;