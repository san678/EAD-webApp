import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const BackOfficeUserHome = () => {

  return (
    <Container className="mt-5">
        <h1 style={{textAlign: "center", padding: "25px"}}>Back Office User Home Page</h1>
      <Row className="mb-4">
        <Col md={6}>
          <Card style={{textAlign: "center", padding: "25px"}}>
            <Card.Img variant="top" src="https://images7.alphacoders.com/356/356471.jpg" style={{height: "250px"}} />
            <Card.Body>
              <Card.Title>Train Management</Card.Title>
              <Card.Text>
                Manage train schedules, add new trains, and update existing ones.
              </Card.Text>
              <Button variant="primary" href='/trainlist'>Go to Train Management</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{textAlign: "center", padding: "25px"}}>
            <Card.Img variant="top" src="https://farm5.staticflickr.com/4512/37072354804_259c4c90de.jpg" style={{height: "250px"}} />
            <Card.Body>
              <Card.Title>Travel User Management</Card.Title>
              <Card.Text>
              View and manage travel users, change user status.
              </Card.Text>
              <Button variant="primary" href='/traveluser'>Go to Travel User Management</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={0} className="pb-4" style={{textAlign: "center", padding: "25px"}}>
        <Card style={{textAlign: "center", padding: "25px"}}>
        <Card.Img variant="top" src="data:image/jpeg;base64,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" style={{height: "250px"}} />
          <Card.Title>About Us</Card.Title>
          <p>
          Welcome to Sri Lanka Train Booking, your gateway to seamless rail travel experiences across the island. We're dedicated to providing you with convenient and hassle-free access to Sri Lanka's stunning landscapes and vibrant culture through its extensive railway network.
          </p>
          </Card>
        </Col>
        <Col md={0} className="pb-4" style={{textAlign: "center", padding: "25px"}}>
        <Card style={{textAlign: "center", padding: "25px"}}>
        <Card.Img variant="top" src="https://www.localcart.ca/src/images/contact.jpg" style={{height: "250px"}} />
          <Card.Title>Contact Us</Card.Title>
          <p>
            Email: info@example.com<br />
            Phone: +1 234 567 890<br />
            Address: 123 Main Street, Colombo, Sri Lanka
          </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BackOfficeUserHome;