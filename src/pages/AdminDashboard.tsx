import { useAuth } from '../context/AuthContext';
import UserLists from '../AdminComponents/UserLists';
export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin, {user?.name}!</p>
      <p>You have admin privileges.</p>
       {/* User Management Section */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <UserLists />
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
} 