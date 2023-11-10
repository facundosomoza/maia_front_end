import React from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const EmailValidationSuccess = () => {
  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center mt-4">
        <Col xs={10} md={6}>
          <p>You email has been confirmed successfully!</p>
          <Link to="/youraccount">Login</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default EmailValidationSuccess;
