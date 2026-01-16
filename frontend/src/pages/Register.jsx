import { useState } from "react";
import API from '../api';
import {useNavigate} from 'react-router-dom';

const Register = () =>{
   const [formData, setFormData] = useState({name:'',email:'',password:''});
   const navigate = useNavigate();

   const handleChange = (e) => setFormData({
      ...formData,
      [e.target.name]: e.target.value
   });

   const handleSubmit = async (e) =>{
      e.preventDefault();
      try{
         await API.post('/auth/register', formData);
         alert('Registered! Please Login.');
         navigate('/login');
      }catch(err){
         alert('Error Registering!');
      }
   };

   return(
      <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
   );
};

export default Register;