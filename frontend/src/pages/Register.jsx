import { useState } from "react";
import API from '../api';
import {useNavigate} from 'react-router-dom';

const Register = () =>{
   const [formData, setFormData] = useState({name:'',email:'',password:''});
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   const handleChange = (e) => setFormData({
      ...formData,
      [e.target.name]: e.target.value
   });

   const handleSubmit = async (e) =>{
      e.preventDefault();
      setLoading(true);
      try{
         await API.post('/auth/register', formData);
         navigate('/login');
      }catch(err){
         setError('Registration failed. Email may already be in use.');
      }finally{
         setLoading(false);
      }
   };

   return(
   <>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form onSubmit={handleSubmit}>
         <input name="name" placeholder="Name" onChange={handleChange} />
         <input name="email" placeholder="Email" onChange={handleChange} />
         <input name="password" placeholder="Password" onChange={handleChange} />
         <button type="submit" disabled = {loading}>
            {loading ? "Registering..." : "Register"}
         </button>
      </form>
   </>
   );
};

export default Register;