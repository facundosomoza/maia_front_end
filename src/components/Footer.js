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
      <Row className="mt-4">
        <Col xs={12} sm={10} md={8} lg={6} className="offset-md-3 col-md-6">
          <p
            className="text-center"
            style={{ fontSize: "14px", fontFamily: "Georgia" }}
          >
            All artwork is the sole property of Maia Tsintsadze and is held
            under copyright. The images, artwork, and contents of this website
            may not be copied, collected, or used for personal or professional
            gain without express written permission from the artist.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
