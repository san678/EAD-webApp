import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import TrainList from './TrainManagement/TrainList';
import UpdateTrain from './TrainManagement/UpdateTrain';
import ViewTrain from './TrainManagement/ViewTrain';
import AddTrain from './TrainManagement/AddTrain';
import AddReservation from './ReservationManagement/AddReservation';
import ReservationList from './ReservationManagement/ReservationList';
import ViewReservation from './ReservationManagement/ViewReservation';
import UpdateReservation from './ReservationManagement/UpdateReservation';
import SignIn from './UserManagement/SignIn';
import Signup from './UserManagement/SignUp';
import Home from './Home';
import Logout from '../Components/Logout';
import Profile from '../Components/UserManagement/Profile';
import { UserProvider } from './UserContext';
import UpdateProfile from './UserManagement/UpdateProfile';
import TravelerUser from './UserManagement/BackOfficeUser/TravellerUser';
import TravellerList from './UserManagement/TravelAgent/TravellerList';
import UpdateTraveller from './UserManagement/TravelAgent/UpdateTraveller';
import ViewTraveller from './UserManagement/TravelAgent/ViewTraveller';
import AddTraveller from './UserManagement/TravelAgent/AddTraveller';
import Navbar from '../Components/NavBar';
import Footer from './Footer';
import BackOfficeUserHome from './BackOfficeUserHome';
import TravelAgentHome from './TravelAgentHome';
import TravelAgentProfile from './UserManagement/TravelAgentProfile';
import UpdateTravelAgentProfile from './UserManagement/UpdateTravelAgentProfile';

const AppRouter = () => {
  const location = useLocation();

  const hideNavbarRoutes = ['/', '/signup'];
  const hideFooterRoutes = ['/', '/footer'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <Router>
      <UserProvider>
        {!shouldHideNavbar && <Navbar />}
        <Switch>
          <Route path="/trainlist" exact component={TrainList} />
          <Route path="/view/:trainID" component={ViewTrain} />
          <Route path="/update/:trainID" component={UpdateTrain} />
          <Route path="/addtrain" component={AddTrain}/>
          <Route path="/reservationlist" component={ReservationList}/>
          <Route path="/addreservation" component={AddReservation}/>
          <Route path="/reservationview/:reservationID" component={ViewReservation} />
          <Route path="/reservationupdate/:reservationID" component={UpdateReservation} />
          <Route path="/logout" component={Logout} />
          <Route path="/backofficeuserprofile/:userId" component={Profile} />
          <Route path="/travelagentprofile/:userId" component={TravelAgentProfile} />
          <Route path="/home" component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/" exact component={SignIn} />
          <Route path="/updatebackofficeuserprofile/:userId" component={UpdateProfile} />
          <Route path="/updatetravelagentprofile/:userId" component={UpdateTravelAgentProfile} />
          <Route path="/traveluser" component={TravelerUser} />
          <Route path="/travellerlist" component={TravellerList} />
          <Route path="/updatetraveller/:userId" component={UpdateTraveller} />
          <Route path="/viewtraveller/:userId" component={ViewTraveller} />
          <Route path="/addtraveller" component={AddTraveller} />
          <Route path="/bhome" component={BackOfficeUserHome} />
          <Route path="/thome" component={TravelAgentHome} />
        </Switch>
        {!shouldHideFooter && <Footer />}
      </UserProvider>
    </Router>
  );
};

export default AppRouter;