import React, { useEffect, useState, useContext } from "react";

import FileRowImage from "./FileRowImage";
import { Button, Modal, Form, Row, Col, Image } from "react-bootstrap";

import { appContext } from "../contexts/appContext";
import Swal from "sweetalert2";

import { getConfig } from "../utils/config";

export default function ModalNewPicture({
  show,
  handleClose,
  buttonModal,
  modalInfo,
}) {
  const [newName, setNewName] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newDescription, setNewDescription] = useState();

  const [message, setMessage] = useState();

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
          order: img.order_file,
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
        { file: "", image: "", order: 1 },
        { file: "", image: "", order: 2 },
        { file: "", image: "", order: 3 },
        { file: "", image: "", order: 4 },
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

  const cmpOrder = (order1, order2) => {
    return order1 - order2;
  };

  const validateOrder = () => {
    const orders = selectedFiles.map(({ order }) => parseInt(order));

    const filteredOrders = orders
      .sort(cmpOrder)
      .filter((order, index) => order === index + 1);

    return filteredOrders.length === 4;
  };

  const handleNewSave = async () => {
    console.log({ selectedFiles });

    if (validateOrder()) {
      let value = true;

      if (newName.trim().length === 0) {
        setMessage("You must complete the field");
        value = false;
      }

      if (("" + newPrice).trim().length === 0) {
        setMessage("You must complete the field");
        value = false;
      }
      if (newDescription.trim().length === 0) {
        setMessage("You must complete the field");
        value = false;
      }

      const allFilesSelected = selectedFiles.every(({ file, image }) =>
        file || image ? true : false
      );

      if (!allFilesSelected) {
        value = false;
      }

      if (value) {
        console.log("soy value");
        const formData = new FormData();

        console.log({ selectedFiles });

        selectedFiles.forEach(({ file }, i) => {
          console.log(file);
          formData.append(`file${i + 1}`, file);
        });

        selectedFiles.forEach(({ image }, i) => {
          console.log(image);
          formData.append(`originalFile${i + 1}`, image);
        });

        selectedFiles.forEach(({ order, id }, i) => {
          console.log(`order_${id ? id : i + 1}`, parseInt(order));

          formData.append(`order_${id ? id : i + 1}`, parseInt(order));
        });

        formData.append("newName", newName);
        formData.append("newPrice", newPrice);
        formData.append("newDescription", newDescription);

        console.log(formData);

        try {
          if (buttonModal === "new") {
            const url = `${getConfig().URL_BASE_BACKEND}/picturesart`;

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
    } else {
      Swal.fire({ text: "Invalid Order", icon: "error" });
    }
  };

  const handleChangePicture = (selectedFile, index) => {
    const newSelectedFiles = [...selectedFiles];

    newSelectedFiles[index].file = selectedFile;

    setSelectedFiles(newSelectedFiles);
  };

  const handleFileOrderChange = (index, newOrder) => {
    console.log("Cambio la imagen de la posicion", index, "orden", newOrder);

    const newSelectedFiles = [...selectedFiles];

    newSelectedFiles[index].order = newOrder;

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
            {newName ? "" : message}
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="price"
              value={newPrice}
              onChange={handleNewPrice}
            />
            {newPrice ? "" : message}
          </Form.Group>

          {selectedFiles.map((selectedFile, i) => (
            <FileRowImage
              key={selectedFile.id}
              index={i}
              data={selectedFile}
              onChangePicture={handleChangePicture}
              onOrderChange={handleFileOrderChange}
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
            {newDescription ? "" : message}
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
