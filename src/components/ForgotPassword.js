import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export default function ForgotPassword() {
  /*
  const [emailCustomer, setEmailCustomer] = useState("");

  const handleEmailChange = (event) => {
    setEmailCustomer(event.target.value);
  };

  const handleFormSubmit = async () => {
    const url = "http://localhost:8001/forgot_password";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailCustomer }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
*/
  const handleFormSubmit = () => {
    console.log("hola");
  };
  return (
    <Container className="mt-4 d-flex justify-content-center">
      <div className="w-50">
        <Form>
          <h2>Forgotten your password?</h2>
          <p>
            Please enter your email address below and we'll email you
            instructions to reset it
          </p>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address:</Form.Label>
            <Form.Control type="email" required className="bg-light" />
          </Form.Group>

          <Button variant="primary" onClick={handleFormSubmit}>
            RESET PASSWORD
          </Button>
          <Link to="/youraccount">CANCEL</Link>
        </Form>
      </div>
    </Container>
  );
}
