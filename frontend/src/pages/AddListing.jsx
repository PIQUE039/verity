import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Mobiles', 'Cars', 'Bikes', 'Electronics', 'Furniture', 'Fashion', 'Home'];

const AddListing = () => {
   const [formData, setFormData] = useState({ title: '', price: '', category: '', description: '' });
   const [image, setImage] = useState(null);
   const [preview, setPreview] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
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
      setError('');
      const data = new FormData();
      data.append('title', formData.title);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('description', formData.description);
      if (image) data.append('image', image);

      try {
         await API.post('/listings', data);
         navigate('/');
      } catch (err) {
         setError(err.response?.data?.message || 'Failed to post listing. Try again.');
      } finally {
         setLoading(false);
      }
   };

   const inputClass = "w-full border border-surface-muted bg-surface-page px-4 py-2.5 rounded-lg text-sm text-text-primary focus:outline-none focus:border-brand-primary transition-colors";
   const labelClass = "block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5";

   return (
      <div className="min-h-screen py-10 px-4">
         <div className="max-w-2xl mx-auto">

            <h1 className="text-2xl font-extrabold text-text-primary mb-1">Post an Ad</h1>
            <p className="text-sm text-text-muted mb-6">Fill in the details below to list your item.</p>

            {error && (
               <div className="bg-red-50 border border-red-200 text-danger text-sm px-4 py-3 rounded-lg mb-6">
                  {error}
               </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

               {/* IMAGE UPLOAD */}
               <div className="bg-surface-card border border-surface-muted rounded-xl p-6">
                  <label className={labelClass}>Photo</label>
                  <div className="border-2 border-dashed border-surface-muted rounded-lg p-6 flex flex-col items-center justify-center hover:border-brand-primary transition-colors cursor-pointer">
                     {preview ? (
                        <img src={preview} alt="Preview" className="h-48 w-full object-contain rounded mb-4" />
                     ) : (
                        <div className="text-center text-text-muted">
                           <p className="text-4xl mb-2">📷</p>
                           <p className="text-sm font-semibold">Click to add a photo</p>
                           <p className="text-xs mt-1">JPG, PNG or WEBP</p>
                        </div>
                     )}
                     <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-dark cursor-pointer"
                        required
                     />
                  </div>
               </div>

               {/* DETAILS */}
               <div className="bg-surface-card border border-surface-muted rounded-xl p-6 space-y-5">
                  <div>
                     <label className={labelClass}>Ad Title</label>
                     <input
                        type="text"
                        name="title"
                        placeholder="What are you selling?"
                        onChange={handleChange}
                        required
                        className={inputClass}
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div>
                        <label className={labelClass}>Price (₹)</label>
                        <input
                           type="number"
                           name="price"
                           placeholder="0"
                           onChange={handleChange}
                           required
                           className={inputClass}
                        />
                     </div>
                     <div>
                        <label className={labelClass}>Category</label>
                        <select
                           name="category"
                           onChange={handleChange}
                           required
                           className={inputClass}
                        >
                           <option value="">Select category</option>
                           {CATEGORIES.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                           ))}
                        </select>
                     </div>
                  </div>

                  <div>
                     <label className={labelClass}>Description</label>
                     <textarea
                        name="description"
                        rows="4"
                        placeholder="Condition, age, features, reason for selling..."
                        onChange={handleChange}
                        required
                        className={inputClass}
                     />
                  </div>
               </div>

               <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-accent text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed text-sm"
               >
                  {loading ? 'Posting...' : 'Post Ad'}
               </button>
            </form>
         </div>
      </div>
   );
};

export default AddListing;