import { Link } from 'react-router-dom';

export default function Navbar() {
 
  return (
    <nav style={{ 
      padding: '10px 20px', 
      backgroundColor: '#333', 
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: '15px' }}>
          Home
        </Link>
          <div>
            <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: 'white' }}>
              Sign Up
            </Link>
          </div>
    
      </div>
    </nav>
  );
}