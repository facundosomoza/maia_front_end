import React, { useState, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";

import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="auto">
          <NavLink
            className="nav-link"
            to="/terms-privacy"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            TERMS AND PRIVACY
          </NavLink>
        </Col>
        <Col xs="auto">
          <NavLink
            className="nav-link"
            to="/shipping-returns"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            SHIPPING & RETURNS
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
