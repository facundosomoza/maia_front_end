import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { getConfig } from "../utils/config";

import { Link } from "react-router-dom";

export default function ForgotPassword() {
  /*
  const [emailCustomer, setEmailCustomer] = useState("");

  const handleEmailChange = (event) => {
    setEmailCustomer(event.target.value);
  };

  const handleFormSubmit = async () => {
    const url = `${getConfig().URL_BASE_BACKEND}/forgot_password`;

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
    <Container>
      <Row className="mt-4 d-flex justify-content-center">
        <Col className="col-6">
          <Form>
            <Row>
              <Col>
                <h2>Forgotten your password?</h2>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <span>
                  Please enter your email address below and we'll email you
                  instructions to reset it
                </span>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address:</Form.Label>
                  <Form.Control type="email" required className="bg-light" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <button
                  className="mr-2 button-style"
                  onClick={handleFormSubmit}
                >
                  Reset Password
                </button>
                <Link to="/youraccount">Cancel</Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
