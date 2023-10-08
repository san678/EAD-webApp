import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './Components/UserContext';
import AppRouter from './Components/Router';

ReactDOM.render(
  <Router>
    <UserProvider>
      <AppRouter />
    </UserProvider>
  </Router>,
  document.getElementById('root')
);