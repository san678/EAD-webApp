import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const AddTrain = ({ userID }) => {
  const { userId } = useContext(UserContext);
  const [trainData, setTrainData] = useState({
    TrainID: '',
    UserID: userId,
    TrainName: '',
    Driver: '',
    DTime: '',
    ATime: '',
    TrainStatus: 'Active',
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainData({
      ...trainData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trainIdPattern = /^[A-Z]\d{4}$/;

  if (!trainIdPattern.test(trainData.TrainID)) {
    alert('Invalid Train ID. Please enter a valid Train ID (e.g., T1234).');
    return;
  }
    axios.post('api/trains/add', trainData)
      .then(response => {
        console.log('Train added:', response.data);
        alert("Train Added");
        history.push('/bhome');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={6}>
          <h2 style={{margin:"25px", textAlign:"center"}}>Add a Train</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="trainID">
              <Form.Label>Train ID</Form.Label>
              <Form.Control
                type="text"
                name="TrainID"
                value={trainData.TrainID}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="trainName">
              <Form.Label>Train Name</Form.Label>
              <Form.Control
                type="text"
                name="TrainName"
                value={trainData.TrainName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="driver">
              <Form.Label>Driver</Form.Label>
              <Form.Control
                type="text"
                name="Driver"
                value={trainData.Driver}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="departureTime">
              <Form.Label>Departure Time</Form.Label>
              <Form.Control
                type="date"
                name="DTime"
                value={trainData.DTime}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="arrivalTime">
              <Form.Label>Arrival Time</Form.Label>
              <Form.Control
                type="date"
                name="ATime"
                value={trainData.ATime}
                onChange={handleChange}
              />
            </Form.Group>
            <Row className="justify-content-center">
              <Col xs="auto">
              <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button type="submit" variant="primary" style={{ width: '150px' }}>Submit</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTrain;