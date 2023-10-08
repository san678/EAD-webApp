import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Define a function to fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/getall');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Call the function to fetch users
    fetchUsers();
  }, []); // Empty dependency array to ensure the effect runs once on component mount

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.ID}>
            <strong>Username:</strong> {user.UserName}, <strong>Email:</strong> {user.Email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUsers;