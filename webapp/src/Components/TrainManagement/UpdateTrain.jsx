import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const UpdateTrain = () => {
  const { trainID } = useParams();
  const [trainId, setTrainId] = useState('');
  const [updatedTrainData, setUpdatedTrainData] = useState({
    TrainID: '',
    TrainName: '',
    Driver: '',
    DTime: '',
    ATime: '',
    TrainStatus: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTrainData({
      ...updatedTrainData,
      [name]: value,
    });
  };

  const handleTrainIdChange = (e) => {
    setTrainId(e.target.value);
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const trainIdPattern = /^[A-Z]\d{4}$/;

  if (!trainIdPattern.test(updatedTrainData.TrainID)) {
    alert('Invalid Train ID. Please enter a valid Train ID (e.g., T1234).');
    return;
  }

    axios.put(`/api/trains/update/${trainID}`, updatedTrainData)
      .then(response => {
        console.log('Train updated:', response.data);
        alert('Train updated successfully!');
        history.push('/bhome');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error updating train. Please try again later.');
      });
  };

  useEffect(() => {
    // Fetch data based on trainID
    if (trainID) {
      axios.get(`/api/trains/get/${trainID}`)
        .then(response => {
          setUpdatedTrainData(response.data);
        })
        .catch(error => {
          console.error('Error fetching train data:', error);
        });
    }
  }, [trainID]);  

  return (
    <Container className="text-center mt-5">
      <h2 style={{ margin: "25px" }}>Update a Train</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Train ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Train ID"
              value={updatedTrainData.TrainID}
              onChange={handleTrainIdChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>New Train Name</Form.Label>
            <Form.Control
              type="text"
              name="TrainName"
              placeholder="New Train Name"
              value={updatedTrainData.TrainName}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Driver</Form.Label>
            <Form.Control
              type="text"
              name="Driver"
              placeholder="New Driver"
              value={updatedTrainData.Driver}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Departure Time</Form.Label>
            <Form.Control
              type="date"
              name="DTime"
              placeholder="New Departure Time"
              value={updatedTrainData.DTime}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Arrival Time</Form.Label>
            <Form.Control
              type="date"
              name="ATime"
              placeholder="New Arrival Time"
              value={updatedTrainData.ATime}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
  <Col md={6} className="mx-auto">
    <Form.Label>Train Status</Form.Label>
    <Form.Select
      name="TrainStatus"
      value={updatedTrainData.TrainStatus}
      onChange={handleChange}
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </Form.Select>
  </Col>
</Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button variant="primary" type="submit" style={{ width: '150px' }}>Update Train</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UpdateTrain;