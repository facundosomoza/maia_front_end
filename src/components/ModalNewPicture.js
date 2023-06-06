import React, { useEffect, useState, useContext } from "react";

import FileRowImage from "./FileRowImage";
import { Button, Modal, Form, Row, Col, Image } from "react-bootstrap";

import { appContext } from "../contexts/appContext";

export default function ModalNewPicture({
  show,
  handleClose,
  buttonModal,
  modalInfo,
}) {
  const [newName, setNewName] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newDescription, setNewDescription] = useState();

  const context = useContext(appContext);

  const urlPicture = "http://localhost:8001/images/pictures_art/";

  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    console.log("modalInfo", modalInfo);

    if (modalInfo) {
      setNewName(modalInfo.name);
      setNewPrice(modalInfo.price);
      setNewDescription(modalInfo.description);

      const images = modalInfo.images.map((img) => {
        const newImage = {
          id: img.id,
          file: "",
          image: urlPicture + img.file_image,
        };

        return newImage;
      });

      console.log(images);

      setSelectedFiles(images);

      //setPreviewImage(urlPicture + modalInfo.images[0].file_image);
    } else {
      setNewName("");
      setNewPrice("");
      setNewDescription("");
      setSelectedFiles([
        { file: "", image: "" },
        { file: "", image: "" },
        { file: "", image: "" },
        { file: "", image: "" },
      ]);
      //setPreviewImage("");
    }
  }, [modalInfo]);

  useEffect(() => {
    console.log("Cambio un archivo", selectedFiles);
  }, [selectedFiles]);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPrice = (event) => {
    setNewPrice(event.target.value);
  };

  const handleNewDescription = (event) => {
    console.log(modalInfo);
    setNewDescription(event.target.value);
  };

  const handleNewSave = async () => {
    console.log({ newPrice });

    console.log({ selectedFiles });

    let value = true;

    if (newName.trim().length === 0) {
      value = false;
    }

    if (("" + newPrice).trim().length === 0) {
      value = false;
    }
    if (newDescription.trim().length === 0) {
      value = false;
    }
    if (value) {
      console.log("soy value");
      const formData = new FormData();

      //formData.append("file", selectedFile);
      formData.append("newName", newName);
      formData.append("newPrice", newPrice);
      formData.append("newDescription", newDescription);

      console.log(formData);

      //formData.append("dataNewPicture", JSON.stringify(dataNewPicture));

      try {
        if (buttonModal === "new") {
          const url = "http://localhost:8001/picturesart";

          const response = await fetch(url, {
            method: "post",
            body: formData,
            credentials: "include",
          });
          console.log(response);
        } else {
          const url = `http://localhost:8001/picturesart/${modalInfo.id}`;

          const response = await fetch(url, {
            method: "put",
            body: formData,

            credentials: "include",
          });
          console.log("soy edit 2");

          console.log(response);
        }
        console.log("soy edit");
        handleClose();
      } catch (err) {
        console.log("error");
      }
    }
  };

  const handleChangePicture = (selectedFile, index) => {
    const newSelectedFiles = [...selectedFiles];

    newSelectedFiles[index].file = selectedFile;

    setSelectedFiles(newSelectedFiles);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {buttonModal === "new" ? (
        <Modal.Header>
          <Modal.Title>New Picture</Modal.Title>
        </Modal.Header>
      ) : (
        <Modal.Header>
          <Modal.Title>Edit Picture</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={newName}
              onChange={handleNewName}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="price"
              value={newPrice}
              onChange={handleNewPrice}
            />
          </Form.Group>

          {selectedFiles.map((selectedFile, i) => (
            <FileRowImage
              key={selectedFile.id}
              index={i}
              data={selectedFile}
              onChangePicture={handleChangePicture}
            />
          ))}

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              v
              as="textarea"
              rows={3}
              value={newDescription}
              onChange={handleNewDescription}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleNewSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
