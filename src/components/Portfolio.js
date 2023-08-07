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

import { getConfig } from "../utils/config";

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

  const PICTURES_ART_URL_BASE = `${
    getConfig().URL_BASE_BACKEND
  }/images/pictures_art`;

  const loadImages = async () => {
    try {
      const url = `${getConfig().URL_BASE_BACKEND}/picturesart`;

      const response = await fetch(url, {
        method: "get",
        credentials: "include",
      });
      const data = await response.json();

      setImages(data);
    } catch (error) {
      console.error("Error al cargar las imágenes:", error);
    }
  };

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
          await fetch(
            `${getConfig().URL_BASE_BACKEND}/picturesart/${productId}`,
            {
              method: "DELETE",
              credentials: "include",
            }
          );

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
        fetch(`${getConfig().URL_BASE_BACKEND}/picturesart/${imageId}/sold`, {
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
          {images.map((obraArte) => (
            <Col key={obraArte.id} className="mb-4">
              <Card className="h-100 p-4 custom-border">
                <div className="d-flex flex-column align-items-center">
                  <Card.Img
                    onClick={() => handleClick(obraArte)}
                    variant="top"
                    style={{ cursor: "pointer" }}
                    src={`${PICTURES_ART_URL_BASE}/${
                      obraArte.images[0].file_image
                    }?${Math.random()}`}
                  />
                  <div className="text-center mt-3">
                    <Card.Title>{obraArte.name}</Card.Title>
                    <div>{obraArte.price}</div>
                  </div>
                  {obraArte.sold && (
                    <span
                      className="badge badge-pill badge-dark mt-2"
                      style={{ fontSize: "20px" }}
                    >
                      SOLD OUT
                    </span>
                  )}
                </div>
                {context.user && context.user.email === "maia@gmail.com" && (
                  <div className="card-footer d-flex justify-content-center mt-3">
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
        reloadPorfolio={loadImages}
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
