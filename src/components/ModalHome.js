import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, Image, Figure } from "react-bootstrap";

import { getConfig } from "../utils/config";

const ModalHome = ({ showUpdateModal, handleClose, reloadHomeImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      // Si no se ha seleccionado ninguna imagen, puedes mostrar un mensaje de error

      return;
    }

    try {
      // Crea una instancia de FormData para enviar la imagen al backend
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Realiza una solicitud POST al backend para subir la imagen
      const response = await fetch(
        `${getConfig().URL_BASE_BACKEND}/admin-pictures`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // La imagen se subió exitosamente, cierra el modal y actualiza la página si es necesario
        reloadHomeImage();
        handleClose();
      } else {
        // Si la respuesta no fue exitosa, muestra un mensaje de error o maneja el error según tus necesidades
        console.error("Error al subir la imagen");
      }
    } catch (error) {
      // Si se produjo un error en la solicitud, muestra un mensaje de error o maneja el error según tus necesidades
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <Modal show={showUpdateModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="imageUpload">
            <Form.Label>Select an Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalHome;
