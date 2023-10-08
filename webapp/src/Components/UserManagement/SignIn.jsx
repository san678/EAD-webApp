import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const SignIn = () => {
  const { setUser, UserType } = useContext(UserContext);
  const [formData, setFormData] = useState({
    NIC: '',
    Password: ''
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

    axios.post('/api/users/signin', formData)
      .then(response => {
        console.log('User authenticated:', response.data);
        setUser(response.data.ID, response.data.UserType);
        sessionStorage.setItem('userId', response.data.ID);
        console.log('User Type:', response.data.UserType);
        console.log('UserType:', UserType);

        if (response.data.UserType === 'backofficeuser') {
          history.push('/bhome');
          window.location.href="/bhome";
        } else if (response.data.UserType === 'travelagent') {
          history.push('/thome');
          window.location.href="/thome";
        } else {
          history.push('/home');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          alert('Password or NIC mismatch. Please try again.');
        } else if (error.response && error.response.status === 400) {
          alert('Invalid User credentials. Please check your inputs.');
        } else {
          console.error('Error authenticating user:', error);
          alert('Invalid User credentials. Please check your inputs.');
        }
      });
  };

  return (
    <Container className="my-5 text-center">
      <Row className="justify-content-center" style={{marginTop:"130px"}}>
        <Col md={6}>
          <Card style={{ padding: '25px', margin: '25px' }}>
            <h2 style={{margin: "25px"}}>Sign In</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="NIC" style={{marginBottom: "25px"}}>
                <Form.Control 
                  type="text" 
                  name="NIC" 
                  value={formData.NIC} 
                  onChange={handleChange} 
                  placeholder='NIC'
                  required 
                />
              </Form.Group>
              <Form.Group controlId="Password" style={{marginBottom:"25px"}}>
                <Form.Control 
                  type="password" 
                  name="Password" 
                  value={formData.Password} 
                  onChange={handleChange} 
                  placeholder='Password'
                  required 
                />
              </Form.Group>
              <Button variant="primary" type="submit" style={{ padding: '10px 20px' }}>
                Sign In
              </Button>
            </Form>
            <p style={{marginTop: "15px"}}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;