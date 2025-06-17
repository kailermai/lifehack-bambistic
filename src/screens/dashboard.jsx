import { auth, db } from "../config/firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { Button, Container, Nav, Navbar, Table, Form } from "react-bootstrap";
import './dashboard.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore'
import AddPatientModal from "./addPatient";

const Dashboard = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [records, setRecords] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [patients, setPatients] = useState([]);

    const patientCollectionRef = collection(db, "patientRecords");

    const getRecords = async () => {
        try {
            const data = await getDocs(patientCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                lastEdited: doc.data().lastEdited?.toDate?.() || null
            }));
            setRecords(filteredData);
        } catch (e) {
            console.error(e);
        }
    }

     const refreshPatients = async () => {
        await getRecords();
    };


    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/signIn')
        } catch (e) {
            console.error(e);
        }
    }

    // get patient records from firebase and updates it when there is a change automatically
    useEffect(() => {
        getRecords();
    }, []);

    // Filter records by patient name based on searchTerm
    const filteredRecords = records.filter(record => {
        const recordName = record.name ? record.name.toLowerCase() : '';
        const searchTermLower = searchTerm ? searchTerm.toLowerCase() : '';
        
        return recordName.includes(searchTermLower) && record.lastEdited;
    });

    // Format timestamp for display
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'No timestamp';
        
        return timestamp.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };
    
    return (
        <>
            {/* Navbar */}
            <Navbar  className="bg-body-tertiary" fixed="top">
                <Container fluid className="m-0">
                    <Nav className="ms-auto d-flex flex-row align-items-center" id="bar" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/dashboard">Home</Nav.Link>
                        </Nav.Item>
                        <Button variant="danger" onClick={logout}>Logout</Button>
                    </Nav>
                </Container>
            </Navbar>
             

            {/* Content */}
            <Container className="mt-4" id="content">
                <Form.Group controlId="search">
                    <Container className="d-flex">
                        <Form.Control 
                        type="text" placeholder="Enter patient name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="me-3"
                        />
                    </Container>
                </Form.Group>

                <Table striped bordered hover responsive className="mt-3">

                    <thead>
                    <tr>

                        <th>Patient Name</th>
                        <th>Age</th>
                        <th>Last Edited</th>
                    </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.length > 0 ? (
                            filteredRecords.map(record => (
                            <tr key={record.id}>
                                {/*HERE NEED LINK TO NEW PAGE. ROUTE PATH TO /patientrecord/id */ }
                                <td><Link to={`/patientrecord/${record.id}`} state={{patientRecord: record}}>{record.name}</Link></td>
                                <td>{record.age}</td>
                                <td>{formatTimestamp(record.lastEdited)}</td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan="4" className="text-center">
                                No records found.
                            </td>
                            </tr>
                        )}                   
                    </tbody>

                </Table>
                    <Button variant="success" onClick={() => setShowModal(true)}>
                        + Create New Patient
                    </Button>
                    <AddPatientModal 
                        show={showModal} 
                        handleClose={() => setShowModal(false)}
                        refreshPatients={refreshPatients}
                    />

            </Container>
        </>
    )
}

export default Dashboard;