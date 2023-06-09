import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../contexts/appContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import UpdateImageHome from "./UpdateImageHome";
import ModalHome from "./ModalHome";
const Home = () => {
  const context = useContext(appContext);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [homeImage, setHomeImage] = useState("");

  const [isImageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchHomeImage = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/admin-pictures/active-background"
        );
        const data = await response.json();

        console.log("DEFAULT BKG", data);

        setHomeImage(data.image);
        setImageLoaded(true);
      } catch (error) {
        console.error("error to get the main picture");
      }
    };
    fetchHomeImage();
  }, []);

  const handleUpdateImage = () => {
    setShowUpdateModal(true);
    console.log("abrir");
  };

  const handleClose = () => {
    setShowUpdateModal(false);
  };

  return (
    <Container>
      <Row>
        <Col className="text-center">
          {isImageLoaded ? (
            <img
              src={`http://localhost:8001/images/profile/${homeImage}`}
              alt="Home"
            />
          ) : (
            <p>Loading...</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          {context.user && context.user.email === "maia@gmail.com" && (
            <UpdateImageHome handleUpdateImage={handleUpdateImage} />
          )}
        </Col>
      </Row>
      <ModalHome showUpdateModal={showUpdateModal} handleClose={handleClose} />
    </Container>
  );
};

export default Home;
