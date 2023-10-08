import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './UserContext';
import Cookies from 'js-cookie';

const NavbarComponent = () => {
  const { userId, setUser, UserType } = useContext(UserContext);
  console.log(userId);
  console.log(UserType);
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove('userId');
    setUser(null);
    history.push('/');
    window.location.href = "/";
  };

  return (
    <Navbar style={{ backgroundColor: '#00004d', marginBottom: "25px", height: "75px" }} variant="dark" className="justify-content-center">
      <Nav className="mr-auto">
        {UserType === 'travelagent' && (
          <>
          <Navbar.Brand as={Link} to="/thome">Home</Navbar.Brand>
            <Nav.Link as={Link} to="/addreservation">Add Reservation</Nav.Link>
            <Nav.Link as={Link} to="/addtraveller">Add Traveller</Nav.Link>
            <Nav.Link as={Link} to="/travellerlist">Travel user List</Nav.Link>
            <Nav.Link as={Link} to="/reservationlist">Reservation List</Nav.Link>
            <Nav.Link as={Link} to="/traveluser">Travel Users</Nav.Link>
            <Nav.Link as={Link} to={`/backofficeuserprofile/${userId}`}>Profile</Nav.Link>
        <Nav.Link onClick={handleLogout} style={{ color: "white" }}>Logout</Nav.Link>
          </>
        )}
        {UserType === 'backofficeuser' && (
          <>
          <Navbar.Brand as={Link} to="/bhome">Home</Navbar.Brand>
            <Nav.Link as={Link} to="/addtrain">Add Train Schedule</Nav.Link>
            <Nav.Link as={Link} to="/trainlist">Train Schedule Management</Nav.Link>
            <Nav.Link as={Link} to="/traveluser">Travel Users</Nav.Link>
            <Nav.Link as={Link} to={`/travelagentprofile/${userId}`}>Profile</Nav.Link>
        <Nav.Link onClick={handleLogout} style={{ color: "white" }}>Logout</Nav.Link>
          </>
        )}
        
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;