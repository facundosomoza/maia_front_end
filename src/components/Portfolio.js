import React, { useEffect, useState, useContext } from "react";

import AdminTool from "./AdminTool";

import OrderPictures from "./OrderPictures";
import ModalOrderPictures from "./ModalOrderPictures";

import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { appContext } from "../contexts/appContext";

import { useHistory } from "react-router";
import ModalNewPicture from "./ModalNewPicture";
import Swal from "sweetalert2";

const Portfolio = () => {
  const context = useContext(appContext);

  const history = useHistory();

  const [images, setImages] = useState([]);

  const [showPictureModal, setShowPictureModal] = useState(false);

  const [buttonModal, setButtonModal] = useState("");

  const [modalInfo, setModalInfo] = useState("");

  const [orderPicture, setOrderPicture] = useState(false);

  const PICTURES_ART_URL_BASE = "http://localhost:8001/images/pictures_art";

  const loadImages = async () => {
    console.log("loading...");
    try {
      const url = `http://localhost:8001/picturesart`;

      const response = await fetch(url, {
        method: "get",
        credentials: "include",
      });
      const data = await response.json();

      console.log({ data });

      setImages(data);
    } catch (error) {
      console.error("Error al cargar las imágenes:", error);
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  useEffect(() => {
    loadImages();
  }, []);

  const handleClick = (dataImage) => {
    const { id } = dataImage;
    const updatedImage = images.find((image) => image.id === id);
    const updatedDataImage = { ...dataImage, sold: updatedImage.sold };

    history.push("/details", updatedDataImage);
  };

  const handleDelete = async (productId) => {
    console.log("delete", productId);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await fetch(`http://localhost:8001/picturesart/${productId}`, {
            method: "DELETE",
            credentials: "include",
          });

          loadImages();

          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.error("Error to delete the product", error);
    }
  };

  const handleEdit = (data, dataArte) => {
    setShowPictureModal(true);
    setButtonModal(null);
    setModalInfo(dataArte);
  };

  const handleNew = () => {
    setShowPictureModal(true);
    setButtonModal("new");
    setModalInfo("");
  };

  const handleClose = () => {
    setShowPictureModal(false);
    setModalInfo(null);
  };

  const handleOrderPictures = () => {
    setOrderPicture(true);
  };

  const handleCloseOrder = () => {
    setOrderPicture(false);
  };

  const handleSold = async (imageId) => {
    const updatedImages = images.map((image) => {
      if (image.id === imageId) {
        const updatedImage = { ...image, sold: !image.sold };

        // Realizar la solicitud al servidor para actualizar el estado "sold" en la base de datos
        fetch(`http://localhost:8001/picturesart/${imageId}/sold`, {
          method: "PUT", // Utilizar el método PUT para actualizar la imagen en el servidor
          headers: {
            "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
          },
          body: JSON.stringify({ sold: updatedImage.sold }), // Enviar el valor actualizado de "sold" en el cuerpo de la solicitud como JSON
        })
          .then((response) => {
            if (response.ok) {
              // Si la respuesta es exitosa, devolver la respuesta en formato JSON
              return response.json();
            }
            throw new Error(
              'Error al actualizar el estado "sold" en la base de datos.'
            );
          })
          .catch((error) => {
            console.error(error);
            // Manejar el error en caso de fallo en la solicitud
          });

        // Devolver la imagen actualizada
        return updatedImage;
      }
      // Mantener la imagen sin cambios si no coincide con el ID
      return image;
    });

    // Actualizar el estado "images" en el componente con el arreglo de imágenes actualizado
    setImages(updatedImages);
  };

  const handleUpdateImagesOrder = () => {
    /* const updatedImages = JSON.parse(JSON.stringify(newImagesOrder));
    console.log(updatedImages);
    setImages(updatedImages); */
    handleCloseOrder();
    loadImages();
  };

  return (
    <>
      <Container fluid className="mt-2">
        {context.user && context.user.email === "maia@gmail.com" && (
          <Row>
            <Col className="m-4 ">
              <AdminTool handleNew={handleNew} />

              <OrderPictures handleOrderPictures={handleOrderPictures} />
            </Col>
          </Row>
        )}
        <Row className="row-cols-1 row-cols-sm-2">
          {console.log(images)}
          {images.map((obraArte) => (
            <Col className="mb-4">
              <Card className="h-100 p-4">
                {obraArte.images.length > 0 && (
                  <div style={{ position: "relative" }}>
                    <Card.Img
                      onClick={() => handleClick(obraArte)}
                      variant="top"
                      src={`${PICTURES_ART_URL_BASE}/${obraArte.images[0].file_image}`}
                    />
                    {obraArte.sold ? (
                      <div
                        style={{
                          position: "absolute",
                          top: "18px",
                          right: "-20px",

                          backgroundColor: "blue",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "50%",
                          fontWeight: "bold",
                          fontSize: "25px",
                          transform: "translateX(-50%)",
                        }}
                      >
                        <span>SOLD</span>
                      </div>
                    ) : null}
                  </div>
                )}
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title className="text-center">
                    {obraArte.name}
                  </Card.Title>
                  <div className="row">
                    <div className="col text-center">{obraArte.price}</div>
                  </div>

                  {context.user && context.user.email === "maia@gmail.com" && (
                    <div className="card-footer d-flex justify-content-center">
                      <Button
                        variant="success"
                        className="mx-1"
                        onClick={() => handleEdit(true, obraArte)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="mx-1"
                        onClick={() => handleDelete(obraArte.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="primary"
                        className="mx-1"
                        onClick={() => handleSold(obraArte.id)}
                      >
                        Sold
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <ModalNewPicture
        show={showPictureModal}
        handleClose={handleClose}
        buttonModal={buttonModal}
        modalInfo={modalInfo}
      />

      <ModalOrderPictures
        orderPicture={orderPicture}
        handleCloseOrder={handleCloseOrder}
        imagesOrder={images}
        updateImagesOrder={handleUpdateImagesOrder}
      ></ModalOrderPictures>
    </>
  );
};

export default Portfolio;
