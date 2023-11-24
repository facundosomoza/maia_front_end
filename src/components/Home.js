import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../contexts/appContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import UpdateImageHome from "./UpdateImageHome";
import ModalHome from "./ModalHome";
import Footer from "./Footer";
import Spinner from "react-bootstrap/Spinner";

import { getConfig } from "../utils/config";

const Home = () => {
  const context = useContext(appContext);

  useEffect(() => {
    context.handleCheckFooter("");
  }, []);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [homeImage, setHomeImage] = useState("");

  const [isImageLoaded, setImageLoaded] = useState(false);

  const fetchHomeImage = async () => {
    try {
      const response = await fetch(
        `${getConfig().URL_BASE_BACKEND}/admin-pictures/active-background`
      );
      const data = await response.json();

      setHomeImage(data.image);
      setImageLoaded(true);
    } catch (error) {
      console.error("error to get the main picture");
    }
  };

  useEffect(() => {
    fetchHomeImage();
  }, []);

  const handleUpdateImage = () => {
    setShowUpdateModal(true);
  };

  const handleClose = () => {
    setShowUpdateModal(false);
  };

  return (
    <Container>
      <Row>
        <Col className="text-center mt-4">
          {context.user && context.user.email === "maia@gmail.com" && (
            <UpdateImageHome handleUpdateImage={handleUpdateImage} />
          )}
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          {isImageLoaded ? (
            <img
              className="img-fluid custom-border w-75"
              src={`${
                getConfig().URL_BASE_BACKEND
              }/images/profile/${homeImage}`}
              alt="Home"
            />
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden"></span>
            </Spinner>
          )}
        </Col>
      </Row>

      <ModalHome
        showUpdateModal={showUpdateModal}
        handleClose={handleClose}
        reloadHomeImage={fetchHomeImage}
      />
    </Container>
  );
};

export default Home;
