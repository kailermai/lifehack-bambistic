import { useState } from "react"
import { auth, db } from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { Modal, Button } from 'react-bootstrap';
import { getFriendlyErrorMessage } from "../constants/constants";
import Form from 'react-bootstrap/Form'
import HealthBank  from  '../assets/HealthBank.jpg'
import Dog from '../assets/HealthBankDog.png'

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
        <div className="login">
                <img src={HealthBank} alt="HealthBank Logo" style={{width:"640px", height:"auto", paddingBottom:"40px"}}/>
                <img src={Dog} alt="Dog Logo" style={{width:"auto", height:"200px", paddingBottom:"40px"}}/>
                <h1 className="text-center mb-4">Register</h1>
                <Form>
                    <Form.Group className="mb-3 text-start d-flex justify-content-center" controlId="formBasicEmail">
                        <div style={{width:"50%"}}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3 text-start d-flex justify-content-center" controlId="formBasicPassword">
                        <div style={{width:"50%"}}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </Form.Group>
                </Form>

                <div className="d-flex justify-content-center">
                    <div style={{ width: "50%" }} className="d-flex justify-content-between">
                        <Button variant="outline-dark" onClick={register}>Register</Button>
                        <Link to='/signIn'>
                            <Button variant="outline-dark">
                                Back
                            </Button>
                        </Link>
                    </div>
                </div>
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