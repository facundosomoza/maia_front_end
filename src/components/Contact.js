import React, { useState, useContext, useEffect } from "react";

import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { appContext } from "../contexts/appContext";
import { getConfig } from "../utils/config";

import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Contact = () => {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [messageContact, setMessageContact] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const context = useContext(appContext);

  useEffect(() => {
    context.handleCheckFooter("");
  }, []);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const setError = (fieldName, message) => {
    const newErros = { ...errorMessage };

    newErros[fieldName] = message;

    setErrorMessage(newErros);
  };

  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);

    // Expresión regular para verificar la presencia de '@' en el correo electrónico
    const emailPattern = /\S+@\S+\.\S+/;

    // Validación y actualización del mensaje de error
    if (!emailPattern.test(enteredEmail)) {
      setError("email", "Invalid email.");
    } else {
      setError("email", "");
    }
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessageContact(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    };

    let value = true;

    if (firstName.trim().length === 0) {
      errors.firstName = "You must fill this field";
      value = false;
    }

    if (lastName.trim().length === 0) {
      errors.lastName = "You must fill this field";
      value = false;
    }

    if (email.trim().length === 0) {
      errors.email = "You must fill this field";
      value = false;
    } else {
      // Verificar si el formato del correo electrónico es válido
      const emailPattern = /\S+@\S+\.\S+/;
      if (!emailPattern.test(email)) {
        errors.email = "Invalid email.";

        value = false;
      }
    }

    if (subject.trim().length === 0) {
      errors.subject = "You must fill this field";
      value = false;
    }

    if (messageContact.trim().length === 0) {
      errors.message = "You must fill this field";
      value = false;
    }

    setErrorMessage(errors);

    if (value) {
      try {
        const url = `${getConfig().URL_BASE_BACKEND}/form_contact`;

        const dataMessage = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          subject: subject,
          message: messageContact,
        };

        const response = await fetch(url, {
          method: "post",
          body: JSON.stringify(dataMessage),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        history.push("/");
        Swal.fire({ title: "Your message was sent", icon: "success" });
      } catch (err) {
        Swal.fire({ title: "Your message was not send", icon: "error" });
      }
    }
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
                    <p className="text-danger font-italic">
                      {errorMessage.firstName}
                    </p>
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
                    <p className="text-danger font-italic">
                      {errorMessage.lastName}
                    </p>
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
              {!errorMessage.email ? (
                ""
              ) : (
                <p className="text-danger font-italic">{errorMessage.email}</p>
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
                <p className="text-danger font-italic">
                  {errorMessage.subject}
                </p>
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
              <Form.Text className="text-muted">Required</Form.Text>
              {messageContact ? (
                ""
              ) : (
                <p className="text-danger font-italic">
                  {errorMessage.message}
                </p>
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
