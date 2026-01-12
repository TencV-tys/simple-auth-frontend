import { UserListHooks } from "./adminHooks/userListHooks";
export default function UserLists(){
     const {
         users,
         loading,
         message,
         handleDelete,
         fetchUsers, 
         formatDate
     } = UserListHooks();

 if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div>Loading users...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Management</h2>
      <p>Total Users: {users.length}</p>
      
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
          color: message.includes('✅') ? '#155724' : '#721c24',
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}
      
      <button 
        onClick={fetchUsers}
        style={{ marginBottom: '15px', padding: '8px 16px' }}
      >
        Refresh List
      </button>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          backgroundColor: 'white'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Joined</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '20px', textAlign: 'center' }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.id}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.name}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.role}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    {formatDate(user.createdAt)}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}