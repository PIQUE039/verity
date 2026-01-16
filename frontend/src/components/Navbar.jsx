import {Link} from 'react-router-dom'

//Simple links to move around
const Navbar = () =>(
   <nav style={{ padding: '10px', background: '#f0f0f0' }}>
    <Link to="/" style={{ margin: '10px' }}>Home</Link>
    <Link to="/login" style={{ margin: '10px' }}>Login</Link>
    <Link to="/register" style={{ margin: '10px' }}>Register</Link>
  </nav>
);

export default Navbar;  