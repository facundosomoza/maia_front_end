import React from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const EmailSent = () => {
  return (
    <Container>
      <Row className="mt-4 justify-content-center align-items-center">
        <Col xs={10} sm={10} md={8} lg={12}>
          <h1 className="font-weight-bold text-dark text-center">
            You must confirm your email
          </h1>
        </Col>
      </Row>
    </Container>
  );
};

export default EmailSent;
