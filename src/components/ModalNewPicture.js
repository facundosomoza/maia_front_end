import React, { useEffect, useState } from "react";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import FileRowImage from "./FileRowImage";
import { Button, Modal, Form } from "react-bootstrap";

import Swal from "sweetalert2";

import { getConfig } from "../utils/config";

export default function ModalNewPicture({
  show,
  handleClose,
  buttonModal,
  modalInfo,
  reloadPorfolio,
}) {
  const [newName, setNewName] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newDescription, setNewDescription] = useState();

  const [message, setMessage] = useState();

  const urlPicture = `${getConfig().URL_BASE_BACKEND}/images/pictures_art/`;

  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
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

      setSelectedFiles(images);
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
    }
  }, [modalInfo]);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPrice = (event) => {
    setNewPrice(event.target.value);
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
        const formData = new FormData();

        selectedFiles.forEach(({ file }, i) => {
          formData.append(`file${i + 1}`, file);
        });

        selectedFiles.forEach(({ image }, i) => {
          formData.append(`originalFile${i + 1}`, image);
        });

        selectedFiles.forEach(({ order, id }, i) => {
          formData.append(`order_${id ? id : i + 1}`, parseInt(order));
        });

        formData.append("newName", newName);
        formData.append("newPrice", newPrice);
        formData.append("newDescription", newDescription);

        try {
          if (buttonModal === "new") {
            const url = `${getConfig().URL_BASE_BACKEND}/picturesart`;

            await fetch(url, {
              method: "post",
              body: formData,
              credentials: "include",
            });
          } else {
            const url = `${getConfig().URL_BASE_BACKEND}/picturesart/${
              modalInfo.id
            }`;

            await fetch(url, {
              method: "put",
              body: formData,

              credentials: "include",
            });
          }

          reloadPorfolio();

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
    const newSelectedFiles = [...selectedFiles];

    newSelectedFiles[index].order = newOrder;

    setSelectedFiles(newSelectedFiles);
  };

  const modules = {
    toolbar: [
      ["bold", "italic"], // toggled buttons
      [{ list: "ordered" }, { list: "bullet" }],
      [{ size: ["small", false, "large"] }], // custom dropdown
      //[{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      /*  [{ font: [] }], */
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };

  const { quill, quillRef } = useQuill({ modules });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setNewDescription(quill.root.innerHTML);
      });
    }
  }, [quill]);

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

            <div style={{ width: 468, height: 220, marginBottom: "70px" }}>
              <div ref={quillRef} />
            </div>

            {/* <Form.Control
              v
              as="textarea"
              rows={3}
              value={newDescription}
              onChange={handleNewDescription}
            /> */}

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
