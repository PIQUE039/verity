import { useState } from "react";
import API from '../api';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () =>{

   const { login } = useAuth();

   //Keeping track of what user types.
   const [formData, setFormData] = useState({email:'',password:''});
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   //Updates states when user types
   const handleChange = (e) =>{
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      });
   };

   //submit action
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try{
         //Using the agent to post data
         const {data} = await API.post('/auth/login', formData);
         login(data.user, data.token);
         navigate('/');
      }catch(err){
         setError('Invalid email or password.');
         console.error(err);
      }finally{
         setLoading(false);
      }
   };

   //Temp UI
   return(
      <div>
         <h2>Login</h2>
         {error && <p className="text-red-500 text-sm">{error}</p>}
         <form onSubmit={handleSubmit}>
            <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            onChange={handleChange} // Call handler on every keystroke
            />
            <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            />
         <button type="submit" disabled={loading}>
            {loading ? "Logging in...": "Login"}
         </button>
         </form>
      </div>
   );
};

export default Login;