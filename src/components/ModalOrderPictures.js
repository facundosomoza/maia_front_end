import React, { useEffect, useState } from "react";

import { Button, Modal, Form, Row, Col, Image, Figure } from "react-bootstrap";
import Swal from "sweetalert2";

import { getConfig } from "../utils/config";

export default function ModalOrderPictures({
  orderPicture,
  handleCloseOrder,
  imagesOrder,
  updateImagesOrder,
}) {
  console.log({ imagesOrder });

  const initInputValues = () => {
    console.log("Initializing input values...", imagesOrder);
    const newInputValues = imagesOrder.map(
      ({ id, name, price, description, order_picture, sold }) => {
        return { id, name, price, description, order_picture, sold };
      }
    );

    console.log({ newInputValues });

    setInputValues(newInputValues);
  };

  useEffect(initInputValues, [imagesOrder]);

  const [inputValues, setInputValues] = useState([]);

  const PICTURES_ART_URL_BASE = `${
    getConfig().URL_BASE_BACKEND
  }/images/pictures_art/`;

  const comparePosition = (pos1, pos2) => {
    return pos1 - pos2;
  };

  const handleSaveChanges = async () => {
    const positions = inputValues.map(({ order_picture }) => order_picture);

    const orderedPositions = positions.sort(comparePosition);

    const errorPosition = orderedPositions.find((pos, i) => {
      return pos !== i + 1 || !positions[i];
    });

    if (errorPosition !== undefined) {
      Swal.fire({ text: "Hay errores", icon: "error" });
    } else {
      console.log("Posiciones OK! - > GUARDAR", inputValues);

      const newOrders = inputValues.map(({ id, order_picture }) => ({
        id,
        order_picture,
      }));

      console.log({ newOrders });

      /*       inputValues.forEach(({ id, order_picture }) => {
        fetch(`http://localhost:8001/picturesart/${id}/order_picture`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newOrder: order_picture }),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Picture order updated successfully");
            } else {
              console.log("Error updating picture order");
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }); */

      await fetch(
        `${getConfig().URL_BASE_BACKEND}/picturesart/order_pictures`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrders),
        }
      );

      updateImagesOrder();
    }
  };

  const handleInputValue = (value, imageOrder) => {
    const newInputValues = JSON.parse(JSON.stringify(inputValues));

    const inputChanged = newInputValues.find(({ id }) => id === imageOrder.id);

    inputChanged.order_picture = value ? parseInt(value) : "";

    setInputValues(newInputValues);
  };
  return (
    <div>
      <Modal
        show={orderPicture}
        onHide={handleCloseOrder}
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Pictures Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {imagesOrder.map((imageOrder, i) => {
              return (
                <Col key={imageOrder.id} xs={6} sm={4} md={3} lg={2}>
                  <Figure>
                    <Figure.Image
                      src={`${PICTURES_ART_URL_BASE}/${imageOrder.images[0].file_image}`}
                      alt="Order Image"
                      className="img-thumbnail img-fluid"
                    />

                    <Form.Control
                      value={
                        inputValues.length > 0 && inputValues[i].order_picture
                      }
                      onChange={(event) =>
                        handleInputValue(event.target.value, imageOrder)
                      }
                    ></Form.Control>
                  </Figure>
                </Col>
              );
            })}
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleCloseOrder}>Close</Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
