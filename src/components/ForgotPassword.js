import React, { useState, useContext, useEffect } from "react";

import { appContext } from "../contexts/appContext";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getConfig } from "../utils/config";

import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const context = useContext(appContext);
  const history = useHistory();

  const [emailCustomer, setEmailCustomer] = useState("");

  const handleEmailChange = (event) => {
    setEmailCustomer(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const url = `${getConfig().URL_BASE_BACKEND}/forgot_password`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailCustomer }),
    });

    const data = await response.json();

    if (response.status === 200) {
      Swal.fire({ text: data.message, icon: "success" });
    } else {
      Swal.fire({ text: data.message, icon: "error" });
    }
  };

  useEffect(() => {
    if (context.loggedUser) {
      history.push("/portfolio");
    }
  }, [context.loggedUser]);

  return (
    <Container>
      <Row className="mt-4 d-flex justify-content-center">
        <Col sm={10} md={6}>
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
                  <Form.Control
                    value={emailCustomer}
                    onChange={handleEmailChange}
                    type="email"
                    required
                    className="bg-light"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <button
                  className="mr-2 button-style mb-4 w-100"
                  onClick={handleFormSubmit}
                >
                  Reset Password
                </button>
                <Link
                  className="button-style mb-4 w-100 d-block text-center"
                  to="/youraccount"
                >
                  Cancel
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
