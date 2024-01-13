import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { txtDB } from '../config.js';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

function Submissions() {
  const [allEntries, setAllEntries] = useState([]);
  const [displayDetail, setDisplayDetail] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    checkboxValues: [],
    cardNumber: '',
    category: '',
    subject: '',
    dateOfOccurrence: '',
    placeOfOccurrence: '',
    description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entriesCollection = await getDocs(collection(txtDB, 'entries'));
        const entriesData = entriesCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllEntries(entriesData);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, []);

  const getCheckboxValue = (type, entry) => {
    let value = '';

    if (entry && entry.checkboxValues && entry.checkboxValues.length > 0) {
      const filteredValues = entry.checkboxValues.filter(
        (item) => item.split('_')[0] === type
      );
      if (filteredValues.length > 0) {
        value = filteredValues[0].split('_')[1];
      }
    }

    return value;
  };

  const renderDetailCard = () => {
    return (
      <Container>
        <Card>
          <Card.Header>
            <cite title="Source Title">Details</cite>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>Customer Name</Col>
              <Col>{selectedEntry.name}</Col>
            </Row>
            <Row>
              <Col>Email</Col>
              <Col>{selectedEntry.email}</Col>
            </Row>
            <Row>
              <Col>Phone</Col>
              <Col>{selectedEntry.phone}</Col>
            </Row>
            <Row>
              <Col>Card Number</Col>
              <Col>{selectedEntry.cardNumber}</Col>
            </Row>
            {Object.keys(feedbackTypes).map((type, index) => (
              <Row key={index}>
                <Col>{feedbackTypes[type]}</Col>
                <Col>{getCheckboxValue(type, selectedEntry)}</Col>
              </Row>
            ))}
          </Card.Body>
        </Card>
      </Container>
    );
  };

  const feedbackTypes = {
    qos: 'Rate the quality of the service received from your station',
    qob: 'Rate the quality of our interactions',
    roc: 'Was our police department well-informed with updates on the investigation',
    exp: 'Share your overall experience with us',
    eyp: 'Rate the speed and efficiency of the police response to your reported incident',
    ezp: 'Are you satisfied with our investigation',
  };

  const handleViewDetails = (entry) => {
    setSelectedEntry(entry);
    setDisplayDetail(true);
  };

  return (
    <>
      {displayDetail ? (
        renderDetailCard()
      ) : (
        <div className='padding30px'>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Details</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Category</th>
                <th>Subject</th>
                <th>Date of Occurrence</th>
                <th>Place of Occurrence</th>
                <th>Description</th>
                {Object.keys(feedbackTypes).map((type, index) => (
                  <th key={index}>{feedbackTypes[type]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allEntries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <button onClick={() => handleViewDetails(entry)}>
                      View Details
                    </button>
                  </td>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.phone}</td>
                  <td>{entry.gender}</td>
                  <td>{entry.dateOfBirth}</td>
                  <td>{entry.address}</td>
                  <td>{entry.category}</td>
                  <td>{entry.subject}</td>
                  <td>{entry.dateOfOccurrence}</td>
                  <td>{entry.placeOfOccurrence}</td>
                  <td>{entry.description}</td>
                  {Object.keys(feedbackTypes).map((type, index) => (
                    <td key={`${entry.id}_${type}`}>
                      {getCheckboxValue(type, entry)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default Submissions;
