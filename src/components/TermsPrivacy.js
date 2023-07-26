import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TermsPrivacy = () => {
  useEffect(() => {
    console.log("hola...terms...");
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="my-5">Terms of Service</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <Row>
            <Col>
              <h6 className="text-left mb-4">General Terms and Conditions</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ maxWidth: "100%" }}>
                <p className="text-left ml-3 mb-2">
                  1- The artist retains the copyright of all images on this
                  website.
                </p>
                <p className="text-left ml-3 mb-2">
                  2- The artist retains the right, in perpetuity, to use
                  digitally recorded images of any purchased artwork for
                  whatever purpose she chooses, including, but not restricted
                  to, the purposes of promotion and creating reproductions based
                  on such images for financial gain.
                </p>
                <p className="text-left ml-3 mb-2">
                  3- Prints of commissioned works will only be made available
                  with the consent of the purchaser.
                </p>
                <p className="text-left ml-3 mb-2">
                  4- Whilst every effort shall be made to ensure that the
                  digital images shown on the website are an accurate
                  representation of the original paintings, there may be minor
                  colour differences due to the lighting conditions at the time
                  of photographing and also due to the settings on the screen
                  that the photo is being displayed on.
                </p>
                <p className="text-left ml-3 mb-2">
                  5- Minor blemishes are considered intrinsic properties of the
                  work of art and do not constitute a significant discrepancy.
                </p>
                <p className="text-left ml-3 mb-2">
                  6- Customer and user information will only be used for
                  purposes relating to the content of MaiaTsadzeArt.com. I may,
                  at times draw attention to other 3rd party products or
                  services if they are deemed to be relevant to the above.
                </p>
                <p className="text-left ml-3 mb-2">
                  7- I will never use customer information for the purposes of
                  generating spam.
                </p>
                <p className="text-left ml-3 mb-2">
                  8- I am not responsible for the content of any external site
                  that may be linked to on these pages.
                </p>
                <p className="text-left ml-3 mb-2">
                  9- I reserve the right to modify the contents of this website,
                  including user comments and terms and conditions, in any way I
                  feel is appropriate.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsPrivacy;
