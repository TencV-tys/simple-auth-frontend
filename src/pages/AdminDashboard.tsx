import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin, {user?.name}!</p>
      <p>You have admin privileges.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
} 