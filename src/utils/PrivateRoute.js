import React from 'react'
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    let { user } = useContext(AuthContext);

    if (!user) {
      return  <Navigate to="/login"/>
    }

    return children;
}

export default PrivateRoute ;
