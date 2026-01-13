import { UserListHooks } from "./adminHooks/userListHooks";

export default function UserLists() {
  const {
    users,
    loading,
    message,
    pagination,
    itemsPerPage,
    pageInput,
    setPageInput,
    handleDelete,
    fetchUsers,
    handlePageChange,
    handleItemsPerPageChange,
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
      <p>Total Users: {pagination.totalUsers}</p>
      
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
      
      {/* Controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => fetchUsers(1, itemsPerPage)}
            style={{ padding: '8px 16px' }}
          >
            Refresh List
          </button>
          
          <select 
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            style={{ padding: '8px' }}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
        
        {/* Pagination Info */}
        <div style={{ textAlign: 'center' }}>
          <p>
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
        </div>
        
        {/* Pagination Controls */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            style={{ 
              padding: '8px 16px',
              opacity: pagination.hasPrevPage ? 1 : 0.5,
              cursor: pagination.hasPrevPage ? 'pointer' : 'not-allowed'
            }}
          >
            Previous
          </button>
          
          <div style={{ display: 'flex', gap: '5px' }}>
            <input
              type="number"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onKeyPress={(e) => {
                if(e.key === 'Enter') {
                  handlePageChange(Number(pageInput));
                }
              }}
              style={{ 
                width: '60px',
                padding: '8px',
                textAlign: 'center'
              }}
              min="1"
              max={pagination.totalPages}
            />
            <button 
              onClick={() => handlePageChange(Number(pageInput))}
              style={{ padding: '8px 16px' }}
            >
              Go
            </button>
          </div>
          
          <button 
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            style={{ 
              padding: '8px 16px',
              opacity: pagination.hasNextPage ? 1 : 0.5,
              cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed'
            }}
          >
            Next
          </button>
        </div>
      </div>
      
      {/* User Table */}
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
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.role}</td>
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
      
      {/* Pagination Footer */}
      <div style={{ 
        marginTop: '20px', 
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          Showing {((pagination.currentPage - 1) * itemsPerPage) + 1} to 
          {Math.min(pagination.currentPage * itemsPerPage, pagination.totalUsers)} 
          of {pagination.totalUsers} users
        </div>
        
        {/* Page Numbers */}
        <div style={{ display: 'flex', gap: '5px' }}>
          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
            let pageNum;
            if (pagination.totalPages <= 5) {
              pageNum = i + 1;
            } else if (pagination.currentPage <= 3) {
              pageNum = i + 1;
            } else if (pagination.currentPage >= pagination.totalPages - 2) {
              pageNum = pagination.totalPages - 4 + i;
            } else {
              pageNum = pagination.currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: pageNum === pagination.currentPage ? '#007bff' : 'white',
                  color: pageNum === pagination.currentPage ? 'white' : 'black',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {pageNum}
              </button>
            );
          })}
          
          {pagination.totalPages > 5 && (
            <span style={{ padding: '8px' }}>...</span>
          )}
        </div>
      </div>
    </div>
  );
}