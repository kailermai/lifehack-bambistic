import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

function AddPatientModal({ show, handleClose, refreshPatients }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    nric: '',
    bloodType: '',
    EmergencyContactName: '', 
    EmergencyContact: '',
    Allergies: '',
    MedicalConditions: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await addDoc(collection(db, 'patientRecords'), {
        ...formData,
        age: parseInt(formData.age), // convert to number
        lastEdited: new Date() // add creation timestamp
      });
      handleClose();
      setFormData({ name: '', age: '', nric: '' });
      refreshPatients(); // Refresh the patient list
    } catch (error) {
      console.error("Error adding patient: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Patient Folder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>NRIC</Form.Label>
            <Form.Control
              type="text"
              name="nric"
              value={formData.nric}
              onChange={handleChange}
              required
              placeholder="e.g., S1234567A"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Blood Type</Form.Label>
            <Form.Control
              type="text"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
              placeholder="e.g., O+"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Emergency Contact Name</Form.Label>
            <Form.Control
              type="text"
              name="EmergencyContactName"
              value={formData.EmergencyContactName}
              onChange={handleChange}
              required
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Emergency Contact</Form.Label>
            <Form.Control
              type="text"
              name="EmergencyContact"
              value={formData.EmergencyContact}
              onChange={handleChange}
              required
              placeholder="e.g., 98988989"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Allergies</Form.Label>
            <Form.Control
              type="text"
              name="Allergies"
              value={formData.Allergies}
              onChange={handleChange}
              required
              placeholder=""
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Medical Conditions</Form.Label>
            <Form.Control
              type="text"
              name="MedicalConditions"
              value={formData.MedicalConditions}
              onChange={handleChange}
              required
              placeholder="Medical Condition"
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Patient'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddPatientModal;