import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const UpdateProfile = () => {
  const { userId } = useParams();
  const history = useHistory();

  const [userData, setUserData] = useState({
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',
    UserType: '',
  });

  useEffect(() => {
    axios.get(`/api/users/get/${userId}`)
      .then(response => {
        console.log('API Response:', response.data);
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/users/updatebyid/${userId}`, userData)
      .then(response => {
        console.log('User updated:', response.data);
        alert('Profile updated successfully!');
        history.push(`/profile/${userId}`);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Container>
  <Row className="justify-content-center" style={{marginTop: "25px"}}>
    <Col md={6}>
      <h2 className="text-center mb-4">Update Profile</h2>
      <div className="text-center mb-4">
            <img src="https://cdn4.vectorstock.com/i/1000x1000/06/18/male-avatar-profile-picture-vector-10210618.jpg" alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="UserName">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="UserName"
            value={userData.UserName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="FirstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="FirstName"
            value={userData.FirstName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="LastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="LastName"
            value={userData.LastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="Email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            value={userData.Email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="PhoneNumber">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="text"
            name="PhoneNumber"
            value={userData.PhoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="UserType">
          <Form.Label>User Type:</Form.Label>
          <Form.Control
            type="text"
            name="UserType"
            value={userData.UserType}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Row className="justify-content-center" style={{marginTop: "25px"}}>
              <Col xs="auto">
              <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button type="submit" variant="primary" style={{ width: '150px' }}>Update Profile</Button>
              </Col>
            </Row>
      </Form>
    </Col>
  </Row>
</Container>
  );
};

export default UpdateProfile;