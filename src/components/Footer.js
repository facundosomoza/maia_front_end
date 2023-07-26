import React, { useState, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";

import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <NavLink
            className="nav-link"
            to="/terms-privacy"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontFamily: "Georgia",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            TERMS AND PRIVACY
          </NavLink>
        </Col>
        <Col xs="auto">
          <NavLink
            className="nav-link"
            to="/shipping-returns"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontFamily: "Georgia",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            SHIPPING & RETURNS
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
