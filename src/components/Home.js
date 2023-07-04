import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../contexts/appContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import UpdateImageHome from "./UpdateImageHome";
import ModalHome from "./ModalHome";
const Home = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  const [imageId, setImageId] = useState("");

  const PROFILE_IMAGE_URL = "http://localhost:8001/images/profile/img3.jpg";

  const context = useContext(appContext);

  const handleUpdateImage = () => {
    setShowUpdateModal(true);
    console.log("abrir");
  };

  const handleClose = () => {
    setShowUpdateModal(false);
  };

  const handleImageChange = (newImageUrl) => {
    setImageUrl(newImageUrl);
  };

  if (!imageUrl) {
    return null;
  }

  return (
    <div>
      {context.user && context.user.email === "maia@gmail.com" && (
        <UpdateImageHome
          handleUpdateImage={handleUpdateImage}
        ></UpdateImageHome>
      )}
      <ModalHome
        showUpdateModal={showUpdateModal}
        handleClose={handleClose}
        handleImageChange={handleImageChange}
        imageId={imageId}
      ></ModalHome>

      <div>
        <img src={imageUrl} alt="Profile" />
      </div>
    </div>
  );
};
export default Home;
