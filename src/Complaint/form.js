import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Alert from 'react-bootstrap/Alert';
import { txtDB } from '../config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, push } from 'firebase/database';
import { database } from '../config';

function PoliceComplaintForm() {
    const [displayForm, setDisplay] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        email: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        category: '',
        subject: '',
        dateOfOccurrence: '',
        placeOfOccurrence: '',
        description: '',
        uploadFile: null,
    });
    const [errorMsg, setErrorMsg] = useState('Please enter the value for the above field');

    const validateForm = () => {
        setErrorMsg('Please enter the value for the above field');
        document.querySelectorAll('.alert-danger').forEach((element) => {
            element.style.display = 'none';
        });
        const { fullName, email, phone, gender, dateOfBirth, category, subject, dateOfOccurrence, placeOfOccurrence, description } = formData;
        if (!fullName) {
            document.getElementById('fullNameError').style.display = 'block';
        } else if (!email || (!email.includes('.com') || !email.includes('@'))) {
            document.getElementById('emailError').style.display = 'block';
            setErrorMsg('Invalid Email');
        } else if (!phone || phone.length < 13) {
            document.getElementById('phoneError').style.display = 'block';
            setErrorMsg('Invalid Phone number');
        } else if (!gender) {
            document.getElementById('genderError').style.display = 'block';
        } else if (!dateOfBirth) {
            document.getElementById('dobError').style.display = 'block';
        } else if (!category) {
            document.getElementById('categoryError').style.display = 'block';
        } else if (!subject) {
            document.getElementById('subjectError').style.display = 'block';
        } else if (!dateOfOccurrence) {
            document.getElementById('dateOccurrenceError').style.display = 'block';
        } else if (!placeOfOccurrence) {
            document.getElementById('placeOccurrenceError').style.display = 'block';
        } else if (!description) {
            document.getElementById('descriptionError').style.display = 'block';
        } else if (category === 'PersonMissing' && !formData.uploadFile) {
            document.getElementById('uploadFileError').style.display = 'block';
        }
        return !document.querySelectorAll('.alert-danger[style="display: block;"]').length;
    };
    const formSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const entry = {
                email: formData.email,
                fullName: formData.fullName,
                phone: formData.phone,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
                category: formData.category,
                address: formData.address,
                subject: formData.subject,
                dateOfOccurrence: formData.dateOfOccurrence,
                placeOfOccurrence: formData.placeOfOccurrence,
                description: formData.description,
                uploadFile: formData.uploadFile,
            };

            try {
                // Save to Firestore
                const docRef = await addDoc(collection(txtDB, 'entries'), entry);
                console.log('Document written with ID: ', docRef.id);
            } catch (error) {
                console.error('Error storing data in Firestore', error);
            }
            try {
                // Save to Realtime Database
                const dbRef = push(ref(database, 'entries'), entry);
                console.log('Data stored in Realtime Database with key: ', dbRef.key);
            } catch (error) {
                console.error('Error storing data in Realtime Database', error);
            }

            setDisplay(false);
        }
    };

    return (
        <Container>
            {displayForm ? (
                <Card>
                    <Card.Header>
                        <cite title="Source Title">
                            We are committed to ensuring the safety and well-being of our community, and we value your feedback to help us serve you better.
                        </cite>
                    </Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">Please fill out this questionnaire.</blockquote>
                    </Card.Body>
                    <Container className="padding30px">
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicFullName">
                                        <Form.Label className="required-field">Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            placeholder="Full Name"
                                            value={formData.fullName}
                                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                        />
                                        <Alert variant="danger" id="fullNameError">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicAddress">
                                        <Form.Label className="required-field">Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Address"
                                            value={formData.address}
                                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        />
                                        <Alert variant="danger" id="addressError">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="required-field">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            required
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <Alert variant="danger" id="emailError">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPhone">
                                        <Form.Label className="required-field">Phone</Form.Label>
                                        <PhoneInput
                                            placeholder="Phone number"
                                            value={formData.phone}
                                            onChange={phone => setFormData({ ...formData, phone })}
                                        />
                                        <Alert variant="danger" id="phoneError">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicGender">
                                        <Form.Label className="required-field">Gender</Form.Label>
                                        <Form.Select
                                            value={formData.gender}
                                            onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                        >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                        <Alert variant="danger" id="genderError">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
                                        <Form.Label className="required-field">Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            required
                                            placeholder="Date of Birth"
                                            value={formData.dateOfBirth}
                                            onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                        />
                                        <Alert variant="danger" id="dobError">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicCategory">
                                        <Form.Label className="required-field">Category</Form.Label>
                                        <Form.Select
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="">Select</option>
                                            <option value="PersonMissing">Person Missing</option>
                                            <option value="VehicleMissingTheft">Vehicle Missing/Theft</option>
                                            <option value="CellPhoneMissingTheft">Cell Phone Missing/Theft</option>
                                            <option value="JewelSnatchingTheft">Jewel Snatching/Theft</option>
                                            <option value="BagLiftingTheft">Bag Lifting/Theft</option>
                                            <option value="KidnappingWrongfulConfinement">Kidnapping/Wrongful Confinement</option>
                                            <option value="CheatingEmbezzlementLandGrabbing">Cheating/Embezzlement/Land Grabbing</option>
                                            <option value="DamagingProperty">Damaging Property</option>
                                        </Form.Select>
                                        <Alert variant="danger" id="categoryError">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicSubject">
                                        <Form.Label className="required-field">Subject</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                        <Alert variant="danger" id="subjectError">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicDateOfOccurrence">
                                        <Form.Label className="required-field">Date of Occurrence</Form.Label>
                                        <Form.Control
                                            type="date"
                                            required
                                            placeholder="Date of Occurrence"
                                            value={formData.dateOfOccurrence}
                                            onChange={e => setFormData({ ...formData, dateOfOccurrence: e.target.value })}
                                        />
                                        <Alert variant="danger" id="dateOccurrenceError">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPlaceOfOccurrence">
                                        <Form.Label className="required-field">Place of Occurrence</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            placeholder="Place of Occurrence"
                                            value={formData.placeOfOccurrence}
                                            onChange={e => setFormData({ ...formData, placeOfOccurrence: e.target.value })}
                                        />
                                        <Alert variant="danger" id="placeOccurrenceError">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicDescription">
                                        <Form.Label className="required-field">Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            required
                                            rows={3}
                                            placeholder="Description"
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        />
                                        <Alert variant="danger" id="descriptionError">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button className="btn_purp" onClick={formSubmit}>
                                Submit Complaint
                            </Button>
                        </Form>
                    </Container>
                </Card>
            ) : (
                <Card bg="light" text="dark">
                    <Card.Body className="d-flex flex-column align-items-center">
                        <div className="padding30px">
                            <div className="circle">
                                <div className="checkmark"></div>
                            </div>
                        </div>
                        <Card.Text className="text-center">Thank you for providing the Complaint</Card.Text>
                        <Form.Text muted className="text-center">
                            We will work towards solving the problem
                        </Form.Text>
                        <div className="padding30px">
                            <Button className="btn_purp" onClick={() => (window.location.href = '/')}>
                                Close
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default PoliceComplaintForm;
