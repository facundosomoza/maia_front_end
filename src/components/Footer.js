import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import logoInstagram from "../assets/images/instagram_logo.png";

import { appContext } from "../contexts/appContext";

const Footer = () => {
  const context = useContext(appContext);

  console.log("checkFooter", context.checkFooter);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="text-center">
          <a
            href="https://www.instagram.com/maiatsadzeart/"
            target="_blank"
            rel=""
          >
            <img src={logoInstagram} height="22px" />
          </a>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          {context.checkFooter !== "terms-privacy" && (
            <NavLink
              className="terms-shipping"
              to="/terms-privacy"
              onClick={() => {
                context.handleCheckFooter("terms-privacy");
              }}
              style={{
                textDecoration: "none",
                color: "#c68c53",
                fontFamily: "Georgia",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              TERMS AND PRIVACY
            </NavLink>
          )}
        </Col>
        <Col xs="auto">
          {context.checkFooter !== "shipping-returns" && (
            <NavLink
              className="terms-shipping"
              to="/shipping-returns"
              onClick={() => {
                context.handleCheckFooter("shipping-returns");
              }}
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
          )}
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
