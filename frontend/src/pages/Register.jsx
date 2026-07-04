// Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from '../api';

const Register = () => {
   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         await API.post('/auth/register', formData);
         navigate('/login');
      } catch (err) {
         setError('Registration failed. Email may already be in use.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center px-4">
         <div className="bg-surface-card border border-surface-muted rounded-xl p-8 w-full max-w-md">

            <h1 className="text-2xl font-extrabold text-text-primary mb-1">Create account</h1>
            <p className="text-sm text-text-muted mb-6">Join Verity to buy and sell locally</p>

            {error && (
               <div className="bg-red-50 border border-red-200 text-danger text-sm px-4 py-3 rounded-lg mb-4">
                  {error}
               </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">
                     Full Name
                  </label>
                  <input
                     name="name"
                     placeholder="John Doe"
                     onChange={handleChange}
                     required
                     className="w-full border border-surface-muted bg-surface-page px-4 py-2.5 rounded-lg text-sm text-text-primary focus:outline-none focus:border-brand-primary transition-colors"
                  />
               </div>
               <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">
                     Email
                  </label>
                  <input
                     type="email"
                     name="email"
                     placeholder="you@example.com"
                     onChange={handleChange}
                     required
                     className="w-full border border-surface-muted bg-surface-page px-4 py-2.5 rounded-lg text-sm text-text-primary focus:outline-none focus:border-brand-primary transition-colors"
                  />
               </div>
               <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">
                     Password
                  </label>
                  <input
                     type="password"
                     name="password"
                     placeholder="••••••••"
                     onChange={handleChange}
                     required
                     className="w-full border border-surface-muted bg-surface-page px-4 py-2.5 rounded-lg text-sm text-text-primary focus:outline-none focus:border-brand-primary transition-colors"
                  />
               </div>
               <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm mt-2"
               >
                  {loading ? 'Creating account...' : 'Create Account'}
               </button>
            </form>

            <p className="text-sm text-text-muted text-center mt-6">
               Already have an account?{' '}
               <Link to="/login" className="text-brand-primary font-semibold hover:underline">
                  Sign in
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Register;