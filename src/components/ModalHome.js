import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, Image, Figure } from "react-bootstrap";

const ModalHome = ({
  showUpdateModal,
  handleClose,
  handleImageChange,
  imageId,
}) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `http://localhost:8001/admin-pictures/admin-pictures/${imageId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        handleImageChange(data.imageUrl);
        handleClose();
      } else {
        console.error("Error al actualizar la imagen");
      }
    } catch (error) {
      console.error("Error al actualizar la imagen:", error);
    }
  };

  return (
    <>
      <Modal show={showUpdateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" onChange={handleFileChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUploadImage}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalHome;
