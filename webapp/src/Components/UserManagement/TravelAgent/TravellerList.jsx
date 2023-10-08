import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';

const TravellerList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/getall');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/delete/${userId}`);

      // If successful, update state accordingly
      const updatedUsers = users.filter(user => user.ID !== userId);
      setUsers(updatedUsers);
      alert('Travel user deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container className="my-5 text-center">
  <h2 style={{margin: "25px"}}>All Travellers</h2>
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.ID}>
          <td>{user.UserName}</td>
          <td>{user.Email}</td>
          <td>
            <Link to={`/viewtraveller/${user.ID}`} className="mr-2">
              <Button variant="warning" style={{marginRight: "25px"}}>View</Button>
            </Link>
            <Link to={`/updatetraveller/${user.ID}`} className="mr-2">
              <Button variant="success" style={{marginRight: "25px"}}>Update</Button>
            </Link>
            <Button variant="danger" onClick={() => handleDeleteUser(user.ID)} style={{marginRight: "25px"}}>Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</Container>
  );
};

export default TravellerList;