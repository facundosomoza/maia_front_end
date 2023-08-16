import React, { useState, useContext } from "react";

import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { getConfig } from "../utils/config";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [messageContact, setMessageContact] = useState("");
  const [message, setMessage] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessageContact(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("HERE...");

    let value = true;

    if (firstName.trim().length === 0) {
      setMessage("You must fill this field");
      value = false;
    }

    if (lastName.trim().length === 0) {
      setMessage("You must fill this field");
      value = false;
    }

    if (email.trim().length === 0) {
      setMessage("You must fill this field");
      value = false;
    }

    if (subject.trim().length === 0) {
      setMessage("You must fill this field");
      value = false;
    }

    if (messageContact.trim().length === 0) {
      setMessage("You must fill this field");
      value = false;
    }

    if (value) {
      try {
        const url = `${getConfig().URL_BASE_BACKEND}/form_contact`;

        const dataMessage = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          subject: subject,
          message: message,
        };

        const response = await fetch(url, {
          method: "post",
          body: JSON.stringify(dataMessage),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setSubject("");
    setMessageContact("");
  };

  return (
    <>
      <Container className="mt-4 d-flex justify-content-center">
        <div className="w-75 mt-2">
          <Form>
            <Form.Row>
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    className="bg-light"
                  />
                  <Form.Text className="text-muted">Required</Form.Text>
                  {firstName ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                    className="bg-light"
                  />
                  <Form.Text className="text-muted">Required</Form.Text>
                  {lastName ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Group controlId="formEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="bg-light"
              />
              <Form.Text className="text-muted">Required</Form.Text>
              {email ? (
                ""
              ) : (
                <p className="text-danger font-italic">{message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formSubject">
              <Form.Label>Subject:</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={handleSubjectChange}
                className="bg-light"
              />
              <Form.Text className="text-muted">Required</Form.Text>
              {subject ? (
                ""
              ) : (
                <p className="text-danger font-italic">{message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={messageContact}
                onChange={handleMessageChange}
                className="bg-light"
              />
              {message ? (
                ""
              ) : (
                <p className="text-danger font-italic">{message}</p>
              )}
            </Form.Group>

            <button onClick={handleSubmit} className="button-style">
              Submit
            </button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Contact;
