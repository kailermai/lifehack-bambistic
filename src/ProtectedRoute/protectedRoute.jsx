import { React, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from "../config/firebase"
import { onAuthStateChanged } from "firebase/auth"

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Or a proper loading spinner
    }

    return user ? children : <Navigate to='/signIn' replace />;
};

export default ProtectedRoute;