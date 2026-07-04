// Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from '../api';
import { useAuth } from "../context/AuthContext";

const Login = () => {
   const { login } = useAuth();
   const [formData, setFormData] = useState({ email: '', password: '' });
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const { data } = await API.post('/auth/login', formData);
         login(data.user, data.token);
         navigate('/');
      } catch (err) {
         setError('Invalid email or password.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center px-4">
         <div className="bg-surface-card border border-surface-muted rounded-xl p-8 w-full max-w-md">

            <h1 className="text-2xl font-extrabold text-text-primary mb-1">Welcome back</h1>
            <p className="text-sm text-text-muted mb-6">Sign in to your Verity account</p>

            {error && (
               <div className="bg-red-50 border border-red-200 text-danger text-sm px-4 py-3 rounded-lg mb-4">
                  {error}
               </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  {loading ? 'Signing in...' : 'Sign In'}
               </button>
            </form>

            <p className="text-sm text-text-muted text-center mt-6">
               Don't have an account?{' '}
               <Link to="/register" className="text-brand-primary font-semibold hover:underline">
                  Register
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Login;