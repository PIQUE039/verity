import { createContext, useState, useContext } from "react";
import API from '../api'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
   const storedUser = JSON.parse(localStorage.getItem('user'));
   const [user, setUser] = useState(storedUser || null);
   const [token, setToken] = useState(localStorage.getItem('token') || null);
   const [savedListings, setSavedListings] = useState(storedUser?.savedListings || []);

   const login = (userData, tokenData) => {
      setUser(userData);
      setToken(tokenData);
      setSavedListings(userData.savedListings || [])
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', tokenData);
   };

   const logout = () => {
      setUser(null);
      setToken(null);
      setSavedListings([]);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
   };

   const toggleSaved = async (listingId) => {
   try{
         const { data } = await API.patch(`/listings/${listingId}/save`);
         setSavedListings(data.savedListings);
         const updatedUser = { ...user, savedListings: data.savedListings };
         setUser(updatedUser);
         localStorage.setItem('user', JSON.stringify(updatedUser));
      }catch (err) {
         console.error('Failed to toggle saved listing', err);
      }
   };

   return(
      <AuthContext.Provider value={{user, token, login, logout, savedListings, toggleSaved}}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);