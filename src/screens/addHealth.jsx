import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from "../config/firebase";

function AddRecordModal({ show, handleClose, patientId }) {
  const [formData, setFormData] = useState({
    doctorName: '',
    symptoms: '',
    medication: ''
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
      await addDoc(collection(db, 'medicalRecords'), {
        ...formData,
        patientId, // associate with the current user
        lastEdited: serverTimestamp() // adds current timestamp
      });
      handleClose();
      setFormData({ doctorName: '', symptoms: '', medication: '' });
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Medical Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Doctor Name</Form.Label>
            <Form.Control
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Symptoms</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Medication</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="medication"
              value={formData.medication}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Record'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddRecordModal;