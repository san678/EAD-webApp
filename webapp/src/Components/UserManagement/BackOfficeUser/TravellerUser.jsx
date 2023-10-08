import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { Container, Table, Button } from 'react-bootstrap';

const TravellerUser = () => {
  const { userId } = useContext(UserContext);
  const [travellers, setTravellers] = useState([]);

  useEffect(() => {
    axios.get('/api/users/getall')
      .then(response => {
        setTravellers(response.data);
      })
      .catch(error => {
        console.error('Error fetching travellers:', error);
      });
  }, []);

  const handleStatusChange = (userId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

    axios.put(`/api/users/updatestatusbyid/${userId}`, { UserStatus: newStatus })
      .then(response => {
        if (response.status === 200) {
          setTravellers(travellers.map(traveller =>
            traveller.ID === userId ? { ...traveller, UserStatus: newStatus } : traveller
          ));
          alert('Status updated successfully');
        } else {
          console.error('Error updating status:', response.data);
          alert('Failed to update status');
        }
      })
      .catch(error => {
        console.error('Error updating status:', error);
        alert('Failed to update status');
      });
  };

  return (
    <Container className="my-5 text-center">
  <h2 style={{margin: "25px"}}>Traveller Information</h2>
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
        <th>NIC</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>User Type</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {travellers.map(traveller => (
        <tr key={traveller.ID}>
          <td>{traveller.FirstName}</td>
          <td>{traveller.LastName}</td>
          <td>{traveller.UserName}</td>
          <td>{traveller.NIC}</td>
          <td>{traveller.Email}</td>
          <td>{traveller.PhoneNumber}</td>
          <td>{traveller.UserType}</td>
          <td>{traveller.UserStatus}</td>
          <td>
            <Button
              variant="primary"
              onClick={() => handleStatusChange(traveller.ID, traveller.UserStatus)}
            >
              {traveller.UserStatus === 'Active' ? 'Inactivate' : 'Activate'}
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</Container>
  );
};

export default TravellerUser;