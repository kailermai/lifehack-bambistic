//PAGE FOR SHOWING PATIENT RECORD AFTER CLICKING IN FROM THE DASHBOARD PAGE
import { auth, db } from "../config/firebase"
import { signOut } from "firebase/auth"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Nav, Navbar, Table, Form } from "react-bootstrap";
import './patientrecord.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddRecordModal from './addHealth';
import { getDocs, collection } from 'firebase/firestore'

const Records = () => {
    const { currentPatient } = useParams();
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const location = useLocation();
    const patientRecord = location.state?.patientRecord;

    const patientCollectionRef = collection(db, "medicalRecords");

    const getRecords = async () => {
        try {
            const data = await getDocs(patientCollectionRef);
            const filteredData = data.docs
                .map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                .filter(record => record.patientId == currentPatient);;
            setRecords(filteredData);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getRecords();
    }, []);
    
    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/signIn')
        } catch (e) {
            console.error(e);
        }
    }

    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter records by patient name based on searchTerm
    

    return (
        <>
            {/* Navbar */}
            <Navbar className="bg-body-tertiary" fixed="top">
                <Container fluid className="m-0">
                    <Nav className="ms-auto d-flex flex-row align-items-center" id="bar" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/dashboard">Home</Nav.Link>
                        </Nav.Item>
                        <Button variant="danger" onClick={logout}>Logout</Button>
                    </Nav>
                </Container>
            </Navbar>

            <Container fluid className="p-4 health-card-container text-start">
                {/* Name and NRIC */}
                <Row className="mb-3">
                    <Col xs="auto" className="info-box">
                        <strong>{patientRecord.name}</strong>
                    </Col>
                </Row>

                {/* Blood Type / Emergency Contact / Allergies */}
                <Row className="mb-2">
                    <Col md={4} className="info-box">Blood Type: {patientRecord.bloodType} </Col>
                    <Col md={4} className="info-box">Emergency contact: {patientRecord.EmergencyContactName} / {patientRecord.EmergencyContact}</Col>
                    <Col md={4} className="info-box">Allergies (medication): {patientRecord.Allergies} </Col>
                </Row>

                {/* Medical Conditions */}
                <Row className="mb-3">
                    <Col className="info-box">Medical Conditions: {patientRecord.MedicalConditions}</Col>
                </Row>

                {/* Add Button */}
                <Row className="justify-content-center mt-3">
                    <Button variant="outline-dark" className="add-button" onClick={() => setShowModal(true)}>+Add</Button>
                </Row>
                
                {/* Doctor Records */}
                <Row className="mb-1 justify-content-end pe-3">
                    <Col xs="auto"><em>(most recent)</em></Col>
                </Row>

                {records.map((record) => (
                    <Row key={record.id} className="record-box mb-2">
                        <Col>
                            <p><strong>{record.doctorName}</strong></p>
                            <p>Symptoms: {record.symptoms}</p>
                            <p>Medication: {record.medication}</p>
                        </Col>
                    </Row>
                ))}

                <AddRecordModal
                    show={showModal}
                    handleClose={() => {setShowModal(false); getRecords()}}
                    patientId= { currentPatient }
                    name={records[0]?.name}
                />
            </Container>
        </>
    )
}

export default Records;