import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.firstName} {user.lastName} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
