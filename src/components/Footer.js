import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import logoInstagram from "../assets/images/instagram_logo.png";
import logoFacebook from "../assets/images/facebook_logo.png";
import logoTiktok from "../assets/images/tiktok_logo.png";

import { appContext } from "../contexts/appContext";

const Footer = () => {
  const context = useContext(appContext);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="text-center mt-4">
          <a
            href="https://www.instagram.com/maiatsintsadzeart/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-3"
          >
            <img src={logoInstagram} height="20px" />
          </a>

          <a
            href="https://www.facebook.com/maiatsintsadzeart/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-3"
          >
            <img src={logoFacebook} height="22px" />
          </a>

          <a
            href="https://www.tiktok.com/@maiatsintsadzeart/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logoTiktok} height="24px" />
          </a>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center ">
        {context.checkFooter !== "terms-privacy" && (
          <Col md={3} className="text-center mb-3">
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
          </Col>
        )}
        {context.checkFooter !== "shipping-returns" && (
          <Col md={3} className="text-center mb-3">
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
          </Col>
        )}
      </Row>

      <Row className="mt-4 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} className="col-md-6">
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
