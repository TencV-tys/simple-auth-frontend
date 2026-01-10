import { Link } from 'react-router-dom';


export default function HomePage() {
 
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Auth System</h1>
        <div>
          <p>Please login or sign up to continue</p>
          <div style={{ marginTop: '20px' }}>
            <Link to="/login">
              <button style={{ padding: '10px 20px', margin: '5px' }}>
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button style={{ padding: '10px 20px', margin: '5px' }}>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
    </div>
  );
}