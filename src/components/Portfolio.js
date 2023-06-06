import React, { useEffect, useState, useContext } from "react";

import AdminTool from "./AdminTool";

import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { appContext } from "../contexts/appContext";

import { useHistory } from "react-router";
import ModalNewPicture from "./ModalNewPicture";

const Portfolio = () => {
  const context = useContext(appContext);

  const history = useHistory();

  const [images, setImages] = useState([]);

  const [showPictureModal, setShowPictureModal] = useState(false);

  const [buttonModal, setButtonModal] = useState("");

  const [modalInfo, setModalInfo] = useState("");

  const PICTURES_ART_URL_BASE = "http://localhost:8001/images/pictures_art";

  const loadImages = async () => {
    const url = `http://localhost:8001/picturesart`;

    const response = await fetch(url, {
      method: "get",
      credentials: "include",
    });
    const data = await response.json();

    console.log(data);

    setImages(data);
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  useEffect(() => {
    loadImages();
  }, []);

  const handleClick = (dataImage) => {
    console.log(dataImage);
    history.push("/details", dataImage);
  };

  const handleDelete = () => {
    console.log("soy delete");
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

  return (
    <>
      <Container fluid className="mt-4">
        {context.user && context.user.email === "maia@gmail.com" && (
          <Row>
            <AdminTool handleNew={handleNew} />
          </Row>
        )}
        <Row className="row-cols-1 row-cols-sm-2">
          {images.map((obraArte) => (
            <Col className="mb-4">
              <Card className="h-100 p-4">
                {obraArte.images.length > 0 && (
                  <Card.Img
                    onClick={() => handleClick(obraArte)}
                    variant="top"
                    src={`${PICTURES_ART_URL_BASE}/${obraArte.images[0].file_image}`}
                  />
                )}
                <Card.Body>
                  <Card.Title>{obraArte.name}</Card.Title>
                  <Card.Text>{obraArte.price}</Card.Text>

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
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </div>
                  )}

                  {context.user && context.user.email !== "maia@gmail.com" && (
                    <span>
                      {context.checkPictureSelected(obraArte.id)
                        ? "agregada"
                        : "no agregada"}
                    </span>
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
    </>
  );
};

export default Portfolio;
