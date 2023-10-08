import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Row, Col, Button } from 'react-bootstrap';

const ViewTrain = () => {
  const [train, setTrain] = useState({});
  const { trainID } = useParams();

  useEffect(() => {
    axios.get(`/api/trains/get/${trainID}`)
      .then(response => {
        setTrain(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [trainID]);

  return (
    <div className="text-center" style={{margin:"25px"}}>
      <h2 style={{margin: "25px"}}>Train Details</h2>
      <div className="mx-auto" style={{ maxWidth: '600px' }}>
        <Table striped bordered hover>
          <tbody>
            {/* <tr>
              <td><strong>Train ID</strong></td>
              <td>{train.TrainID}</td>
            </tr> */}
            <tr>
              <td><strong>Train Name</strong></td>
              <td>{train.TrainName}</td>
            </tr>
            <tr>
              <td><strong>Driver</strong></td>
              <td>{train.Driver}</td>
            </tr>
            <tr>
              <td><strong>Departure Time</strong></td>
              <td>{train.DTime}</td>
            </tr>
            <tr>
              <td><strong>Arrival Time</strong></td>
              <td>{train.ATime}</td>
            </tr>
            <tr>
              <td><strong>Status</strong></td>
              <td>{train.TrainStatus}</td>
            </tr>
          </tbody>
        </Table>
        <Row className="justify-content-center" style={{margin: "25px"}}>
              <Col xs="auto">
              <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
              </Col>
            </Row>
      </div>
    </div>
  );
};

export default ViewTrain;