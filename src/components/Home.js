import React, { useContext } from "react";
import { appContext } from "../contexts/appContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const PROFILE_IMAGE_URL = "http://localhost:8001/images/profile/img3.jpg";

  return (
    <Container>
      <Row>
        <Col>
          <img src={PROFILE_IMAGE_URL}></img>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
