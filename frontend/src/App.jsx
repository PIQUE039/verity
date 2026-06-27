import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddListing from './pages/AddListing';
import ProductDetails from './pages/ProductDetails';
import MyListings from './pages/MyListings';
import ProtectedRoute from './components/ProtectedRoute';

function App(){
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/add" element={
          <ProtectedRoute>
            <AddListing />
          </ProtectedRoute>
          } />
        <Route path="/listing/:id" element={<ProductDetails />} />
        <Route path="/my-listings" element={
            <ProtectedRoute>
              <MyListings/>
            </ProtectedRoute>
          }/>
      </Routes>
    </Router>
  );
}

export default App;