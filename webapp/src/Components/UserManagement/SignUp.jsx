import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    NIC: '',
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    RePassword: '',
    PhoneNumber: '',
    UserType: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nicRegex = /^[0-9]{10,12}$/;
    const phoneRegex = /^[0-9]{10}$/;

    const isValidPassword = (password) => {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordPattern.test(password);
    };

  if (!nicRegex.test(formData.NIC.toUpperCase())) {
    alert('Invalid NIC number. Please enter a valid NIC number.');
    return;
  }

  if (!phoneRegex.test(formData.PhoneNumber)) {
    alert('Invalid phone number. Please enter a 10-digit phone number.');
    return;
  }

    if (formData.Password !== formData.RePassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    if (!isValidPassword(formData.Password)) {
      alert('Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.');
      return;
    }
  
    axios.post('/api/users/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('Success:', response.data);
      alert('User registered successfully!');
      history.push('/');
    })    
    .catch(error => {
      console.error('Error:', error);
      alert('Error registering user. Please try again.');
    });
  };

  return (
    <Container style={{width:"50%", marginTop: "5%"}}>
      <Card>
        <Card.Body>
        <h2 className="text-center mb-4">Signup</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="NIC" style={{marginBottom:"25px"}}>
              <Form.Control
                type="text"
                name="NIC"
                value={formData.NIC}
                onChange={handleChange}
                placeholder="NIC"
                required
              />
            </Form.Group>
            <Form.Group controlId="UserName" style={{marginBottom:"25px"}}>
              <Form.Control
                type="text"
                name="UserName"
                value={formData.UserName}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </Form.Group>
            <Form.Group controlId="FirstName" style={{marginBottom:"25px"}}>
              <Form.Control
                type="text"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </Form.Group>
            <Form.Group controlId="LastName" style={{marginBottom:"25px"}}>
              <Form.Control
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </Form.Group>
            <Form.Group controlId="Email" style={{marginBottom:"25px"}}>
              <Form.Control
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </Form.Group>
            <Form.Group controlId="PhoneNumber" style={{marginBottom:"25px"}}>
              <Form.Control
                type="text"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </Form.Group>
            <Form.Group controlId="Password" style={{marginBottom:"25px"}}>
              <Form.Control
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group controlId="RePassword" style={{marginBottom:"25px"}}>
              <Form.Control
                type="password"
                name="RePassword"
                value={formData.RePassword}
                onChange={handleChange}
                placeholder="Re-enter Password"
                required
              />
            </Form.Group>
            <Form.Group controlId="UserType" style={{marginBottom:"25px"}}>
              <Form.Control
                as="select"
                name="UserType"
                value={formData.UserType}
                onChange={handleChange}
                required
              >
                <option value="">Select User Type</option>
                <option value="backofficeuser">Backoffice User</option>
                <option value="travelagent">Travel Agent</option>
              </Form.Control>
            </Form.Group>
            <Row className="justify-content-center">
              <Col xs="auto">
            <Button type="submit" variant="primary" style={{ width: '150px' }}>Sign Up</Button>
              </Col>
            </Row>
            <div className="text-center mt-2">
            Already have an account? <a href="/">Sign In</a>
          </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;