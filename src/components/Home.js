import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../contexts/appContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import UpdateImageHome from "./UpdateImageHome";
import ModalHome from "./ModalHome";
import Footer from "./Footer";

import { getConfig } from "../utils/config";

const Home = () => {
  const context = useContext(appContext);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [homeImage, setHomeImage] = useState("");

  const [isImageLoaded, setImageLoaded] = useState(false);

  const fetchHomeImage = async () => {
    try {
      const response = await fetch(
        `${getConfig().URL_BASE_BACKEND}/admin-pictures/active-background`
      );
      const data = await response.json();

      console.log("DEFAULT BKG", data);

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
    console.log("abrir");
  };

  const handleClose = () => {
    console.log("soy handleclose");
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
            <p>Loading...</p>
          )}
        </Col>
      </Row>

      <ModalHome
        showUpdateModal={showUpdateModal}
        handleClose={handleClose}
        reloadHomeImage={fetchHomeImage}
      />

      <Footer></Footer>
    </Container>
  );
};

export default Home;
