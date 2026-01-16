import { useState } from "react";
import API from '../api';
import { useNavigate } from "react-router-dom";

const Login = () =>{
   //Keeping track of what user types.
   const [formData, setFormData] = useState({email:'',password:''});

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
      try{
         //Using the agent to post data
         const {data} = await API.post('/auth/login', formData);

         //saving the token
         localStorage.setItem('token', data.token);

         alert('Login Successful!');
         navigate('/');
      }catch(err){
         alert('Login Failed. Check console for details.');
         console.error(err);
      }
   };

   //Temp UI
   return(
      <div>
         <h2>Login</h2>
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
         <button type="submit">Login</button>
         </form>
      </div>
   );
};

export default Login;