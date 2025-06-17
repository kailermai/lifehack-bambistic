import { useState } from "react"
import { auth } from "../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import './signIn.css'
import { Link, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import { Modal, Button } from 'react-bootstrap'
import { getFriendlyErrorMessage } from '../constants/constants'

export const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showFailure, setShowFailure] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (e) {
            setErrorMessage(getFriendlyErrorMessage(e));
            setShowFailure(true);
        }
    }

    const handleCloseFailure = () => {
        setErrorMessage("");
        setShowFailure(false);
    }

    return (
        <>
            <div className="login">
                <h1 className="text-center mb-4">Login</h1>
                <Form>
                    <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                </Form>

                <div className="d-flex justify-content-between">
                    <Button variant="outline-dark" onClick={signIn}>Sign In</Button>
                    <Link to='/register'>
                        <Button variant="outline-dark">
                            Register
                        </Button>
                    </Link>
                </div>
            </div>

            <Modal show={showFailure} onHide={handleCloseFailure}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign in unsuccesful!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{errorMessage}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseFailure}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}