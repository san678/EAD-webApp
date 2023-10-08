import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Components/UserContext';

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    setUser(null);
    history.push('/home');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;