import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const TrainList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('/api/trains/getall')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleDelete = (trainID) => {
    axios.delete(`/api/trains/delete/${trainID}`)
      .then(response => {
        alert('Train successfully deleted!');
        window.location.reload(); // Refresh the page after deletion
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error deleting train. Please try again later.');
      });
  };  

  return (
    <div className="text-center">
      <h2 style={{ margin: '25px' }}>Train List</h2>
      <Table striped bordered hover style={{ marginTop: '20px', width:"75%" }} className="mx-auto">
        <thead>
          <tr>
            <th>Train ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trains.map(train => (
            <tr key={train.ID}>
              <td>{train.TrainID}</td>
              <td>{train.TrainStatus}</td>
              <td>
                <Link to={`/view/${train.ID}`}>
                  <Button variant="warning" style={{marginRight:"17px", color:"white"}}>View</Button>
                </Link>
                <Link to={`/update/${train.ID}`}>
                  <Button variant="success" style={{marginRight:"17px"}}>Update</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(train.ID)} style={{marginRight:"17px"}}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TrainList;