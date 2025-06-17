import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from "../config/firebase"

const ProtectedRoute = ({ children }) => {
    return auth ? children : <Navigate to='/signIn' />
};

export default ProtectedRoute;