import { useState } from "react"
import { auth, db } from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { Modal, Button } from 'react-bootstrap';
import { getFriendlyErrorMessage } from "../constants/constants";

export const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const register = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user

            await setDoc(doc(db, "users", user.uid), {
                email: email,
                uid: user.uid,
                createdAt: new Date(),
            });

            setShowSuccess(true);
        } catch (e) {
            setErrorMessage(getFriendlyErrorMessage(e));
            setShowFailure(true);
        }
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        navigate('/signIn')
    }

    const handleCloseFailure = () => {
        setErrorMessage("");
        setShowFailure(false);
    }

    return (
        <>
            <div>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={register}>Register</button>
                <Link to='/signIn'>
                    <button>
                        Back
                    </button>
                </Link>
            </div>

            <Modal show={showSuccess} onHide={handleCloseSuccess}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration successful!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Sign in to access the dashboard</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseSuccess}>Ok</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showFailure} onHide={handleCloseFailure}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration unsuccesful!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{errorMessage}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseFailure}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};