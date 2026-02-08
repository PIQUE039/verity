import { useState } from 'react';
import API from '../api'; 
import { useNavigate } from 'react-router-dom';

const AddListing = () => {
const [formData, setFormData] = useState({
      title: '',
      price: '',
      category: '',
      description: ''
});
const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);
const [loading, setLoading] = useState(false); // To prevent double-clicks

const navigate = useNavigate();

const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleFileChange = (e) => {
   const file = e.target.files[0];
      if (file) {
         setImage(file);
         setPreview(URL.createObjectURL(file)); 
      }
};

const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      // THE ENVELOPE (FormData)
      const data = new FormData();
      data.append('title', formData.title);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('description', formData.description);
      if (image) {
         data.append('image', image); 
      }

      try {
         const response = await API.post('/listings', data);
         console.log("Server Response:", response.data);
         alert("Ad posted successfully!");
         navigate('/'); 
      } catch (err) {
         console.error("Upload Error:", err);
         alert("Error uploading: " + (err.response?.data?.message || "Check backend console"));
      } finally {
         setLoading(false);
      }
};

   return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
         <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
         
         <div className="bg-cyan-900 py-6 px-8 text-white text-center">
            <h2 className="text-2xl font-bold uppercase tracking-widest">Post Your Ad</h2>
         </div>

         <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* IMAGE UPLOAD */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-6 bg-slate-50 hover:bg-slate-100 transition-colors">
               {preview ? (
               <img src={preview} alt="Preview" className="h-48 w-full object-contain rounded mb-4" />
               ) : (
               <div className="text-center text-slate-400">
                  <p className="text-5xl">📷</p>
                  <p className="text-sm mt-2 font-semibold uppercase">Add Product Photo</p>
               </div>
               )}
               <input 
               type="file" 
               accept="image/*" 
               onChange={handleFileChange} 
               className="mt-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-900 file:text-white hover:file:bg-cyan-950 cursor-pointer"
               required
               />
            </div>

            {/* TITLE */}
            <div>
               <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">Ad Title</label>
               <input type="text" name="title" placeholder="What are you selling?" className="w-full border border-slate-300 p-3 rounded outline-none focus:ring-2 focus:ring-cyan-900" onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* PRICE */}
               <div>
               <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">Price (₹)</label>
               <input type="number" name="price" placeholder="Set a fair price" className="w-full border border-slate-300 p-3 rounded outline-none focus:ring-2 focus:ring-cyan-900" onChange={handleChange} required />
               </div>

               {/* CATEGORY */}
               <div>
               <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">Category</label>
               <select name="category" className="w-full border border-slate-300 p-3 rounded outline-none focus:ring-2 focus:ring-cyan-900 bg-white" onChange={handleChange} required>
                  <option value="">Select Category</option>
                  <option value="Mobiles">Mobiles</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Home">Home</option>
               </select>
               </div>
            </div>

            {/* DESCRIPTION */}
            <div>
               <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">Description</label>
               <textarea name="description" rows="4" placeholder="Include condition, age, features..." className="w-full border border-slate-300 p-3 rounded outline-none focus:ring-2 focus:ring-cyan-900" onChange={handleChange} required />
            </div>

            {/* SUBMIT BUTTON */}
            <button 
               type="submit" 
               disabled={loading}
               className={`w-full text-white font-bold py-4 rounded uppercase tracking-widest transition-all ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-cyan-900 hover:bg-cyan-950 shadow-md'}`}
            >
               {loading ? "Uploading..." : "Post Now"}
            </button>
         </form>
         </div>
      </div>
   );
};

export default AddListing;