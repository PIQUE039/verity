import { useState } from "react";
import API from '../api';
import {useNavigate} from 'react-router-dom';

const AddListing = () =>{
   //SINGLE STATE OBJECT: Keeping all form fields in one bucket
   const [formData, setFormData] = useState({
      title:'',
      price:'',
      category:'',
      description:''
   });

   const navigate = useNavigate(); //Use to redirect user after success.

   //UNIVERSAL CHANGE HANDELER
   const handleChange = (e) =>{
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      });
   };

   const handleSubmit = async (e) =>{
      e.preventDefault();

      try{
         //The API Agent check for Token automatically
         await API.post('/listings', formData);
         alert("Item Listed Successfully");
         navigate('/');
      }catch(err){
         console.error(err);
         alert("Error:" + (err.response?.data?.message || "Something went wrong"));
      }
   };

   return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd' }}>
      <h2>Sell Your Item</h2>
      <form onSubmit={handleSubmit}>
        
      {/* TITLE INPUT */}
         <div style={{ marginBottom: '15px' }}>
            <label>Ad Title</label>
            <input 
            type="text" 
            name="title" // Crucial: Must match the key in state
            value={formData.title} 
            onChange={handleChange}
            style={inputStyle}
            required 
            />
        </div>

        {/* PRICE INPUT */}
         <div style={{ marginBottom: '15px' }}>
            <label>Price</label>
            <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange}
            style={inputStyle}
            required 
            />
         </div>

        {/* CATEGORY INPUT */}
         <div style={{ marginBottom: '15px' }}>
            <label>Category</label>
            <input 
            type="text" 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            style={inputStyle}
            required 
            />
         </div>

        {/* DESCRIPTION INPUT */}
         <div style={{ marginBottom: '15px' }}>
            <label>Description</label>
            <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            style={{ ...inputStyle, height: '100px' }}
            required 
            />
         </div>

         <button type="submit" style={buttonStyle}>Post Now</button>
      </form>
      </div>
   );
};

const inputStyle = { width: '100%', padding: '8px', marginTop: '5px' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#002f34', color: 'white', border: 'none', cursor: 'pointer' };

export default AddListing;