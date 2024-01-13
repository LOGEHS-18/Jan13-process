import React, { useState } from 'react';
import { Card, Container, Form, InputGroup, Row, Col, Button, Alert } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { collection, addDoc } from 'firebase/firestore';
import { ref, push } from 'firebase/database';
import { database, txtDB } from '../config';
import './Form.css';

const FeedbackForm = () => {
    const [displayForm, setDisplay] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        identification: '',
        cardNumber: '',
        phone: '',
    });

    const [checkedValues, setCheckedValues] = useState([]);
    const [errorMsg, setErrorMsg] = useState('Please enter the value for the above field');
    const [selectedIdentification, setSelectedIdentification] = useState({
        type: '',
        number: '',
    });

    const handleChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleChange1 = (field, value) => {
        setSelectedIdentification((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleOnChange = (isChecked, value) => {
        let temp = [...checkedValues];
        const pre = value.split('_')[0];
        if (isChecked) {
            temp = temp.filter((item) => item.split('_')[0] !== pre);
            temp.push(value);
            setCheckedValues(temp);
        } else {
            setCheckedValues(temp.filter((item) => item !== value));
        }
    };

    const validateForm = () => {
        setErrorMsg('Please enter the value for the above field');
        document.querySelectorAll('.alert-danger').forEach((element) => {
            element.style.display = 'none';
        });

        const { name, email, phone, identification, cardNumber } = formData;

        if (!name) {
            document.getElementById('name_er').style.display = 'block';
        } else if (!email || (!email.includes('.com') || !email.includes('@'))) {
            document.getElementById('email_er').style.display = 'block';
            setErrorMsg('Invalid Email');
        } else if (!phone || phone.length < 13) {
            document.getElementById('phone_er').style.display = 'block';
            setErrorMsg('Invalid Phone number');
        } else if (identification === 'passport' && !/^[a-zA-Z0-9]{12}$/.test(cardNumber)) {
            document.getElementById('cardNumber_er').style.display = 'block';
            setErrorMsg('Passport Invalid');
        } else if (identification === 'aadhar' && !/^\d{12}$/.test(cardNumber)) {
            document.getElementById('cardNumber_er').style.display = 'block';
            setErrorMsg('Invalid Aadhar Number');
        } else if (identification === 'pancard' && !/^[a-zA-Z0-9]{10}$/.test(cardNumber)) {
            document.getElementById('cardNumber_er').style.display = 'block';
            setErrorMsg('PAN Invalid');
        } else if (identification === 'driver_license' && !/^[a-zA-Z0-9\s-]{16}$/.test(cardNumber)) {
            document.getElementById('cardNumber_er').style.display = 'block';
            setErrorMsg("Incorrect Driver's License ");
        }

        return !document.querySelectorAll('.alert-danger[style="display: block;"]').length;
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const existingEntries = JSON.parse(localStorage.getItem('allEntries')) || [];
            const new_id = existingEntries.length > 0 ? existingEntries[existingEntries.length - 1].id + 1 : 0;

            const entry = {
                id: new_id,
                email: formData.email,
                name: formData.name,
                phone: formData.phone,
                checkbox_values: checkedValues,
                cardNumber: formData.cardNumber,
            };

            // Store in Firestore
            try {
                const docRef = await addDoc(collection(txtDB, 'entries'), entry);
                console.log('Document written with ID: ', docRef.id);
            } catch (error) {
                console.error('Error storing data in Firestore', error);
            }

            // Store in Realtime Database
            try {
                const dbRef = push(ref(database, 'entries'), entry);
                console.log('Data stored in Realtime Database with key: ', dbRef.key);
            } catch (error) {
                console.error('Error storing data in Realtime Database', error);
            }

            existingEntries.push(entry);
            localStorage.setItem('allEntries', JSON.stringify(existingEntries));
            setDisplay(false);
        }
    };

    const feedback_type = {
        qos: 'Please rate the quality of the service you received from your station',
        qob: 'Please take a moment to rate the quality of our interactions',
        roc: 'Did our police department keep you well-informed with updates on the investigation',
        exp: 'Your satisfaction is our priority. Please take a moment to share your overall experience with us',
        eyp: 'Please rate the speed and efficiency of the police response to your reported incident. Your input helps us enhance our response times and effectiveness',
        ezp: 'Are you satisfied with our investigation',
    };

    const feedback_opts = ['Excellent', 'Good', 'Fair', 'Bad'];

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
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label className="required-field">Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={e => handleChange('name', e.target.value)}
                                        />
                                        <Alert variant="danger" id="name_er">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicAddress">
                                        <Form.Label className="required-field">Address</Form.Label>
                                        <Form.Control
                                            type="textbox"
                                            required
                                            placeholder="Address"
                                            value={formData.address}
                                            onChange={e => handleChange('address', e.target.value)}
                                        />
                                        <Alert variant="danger" id="address_er">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            required
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={e => handleChange('email', e.target.value)}
                                        />
                                        <Alert variant="danger" id="email_er">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicIdentification">
                                        <Form.Label className="required-field">Identification</Form.Label>
                                        <Form.Control
                                            as="select"
                                            required
                                            value={selectedIdentification.type}
                                            onChange={(e) => handleChange1('type', e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value="passport">Passport</option>
                                            <option value="driver_license">Driver's License</option>
                                            <option value="aadhar">Aadhar</option>
                                            <option value="pancard">PAN Card</option>
                                            {/* Add other identification options as needed */}
                                        </Form.Control>
                                        <Alert variant="danger" id="Identification_er">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicCardNumber">
                                        <Form.Label className="required-field">Identification Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter card Number "
                                            value={formData.cardNumber}
                                            onChange={(e) => handleChange('cardNumber', e.target.value)}
                                        />
                                        <Alert variant="danger" id="cardNumber_er">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPhone">
                                        <Form.Label className="required-field">Phone</Form.Label>
                                        <InputGroup>
                                            <PhoneInput
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={(value) => handleChange('phone', value)}
                                            />
                                        </InputGroup>
                                        <Alert variant="danger" id="phone_er">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                                <Col></Col>
                            </Row>

                            <Container>
                                {Object.keys(feedback_type).map((ty) => (
                                    <Row key={ty}>
                                        <Col>
                                            <Form.Group className="mb-3" controlId={ty}>
                                                <Form.Label className="required-field">{feedback_type[ty]}</Form.Label>
                                                <InputGroup>
                                                    <div className="mb-3">
                                                        {feedback_opts.map((opt, key) => (
                                                            <div key={`${ty}_${key}`} className="mb-3">
                                                                <Form.Check
                                                                    label={opt}
                                                                    name={`${ty}_feedback_opts`}
                                                                    id={`${ty}_${key}`}
                                                                    checked={checkedValues.includes(ty + '_' + opt)}
                                                                    onChange={(e) => handleOnChange(e.target.checked, ty + '_' + opt)}
                                                                    type="checkbox"
                                                                    value={opt}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </InputGroup>
                                                <Alert variant="danger" id={`er_${ty}`}>
                                                    &#9432;{errorMsg}
                                                </Alert>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                ))}
                            </Container>
                            {/* End of Feedback Form */}
                            <Button className="btn_purp" onClick={(e) => formSubmit(e)}>
                                Submit
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
                        <Card.Text className="text-center">Thank you for providing the feedback</Card.Text>
                        <Form.Text muted className="text-center">
                            We will work towards improving your experience
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
};

export default FeedbackForm;
