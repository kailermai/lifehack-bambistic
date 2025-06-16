import React from 'react';
import { auth } from "../config/firebase"

const ProtectedRoute = ({ children }) => {
    return auth ? children : <Navigate to='/signIn' />
};

export default ProtectedRoute;