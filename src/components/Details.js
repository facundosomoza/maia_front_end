import React, { useContext, useEffect, useState } from "react";

import { Carousel } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useLocation, useParams } from "react-router-dom";

import { appContext } from "../contexts/appContext";
import { getConfig } from "../utils/config";

const Details = () => {
  const [picture, setPicture] = useState(null);
  //const [pictureSelected, setPictureSelected] = useState(null);

  const IMAGES_BASE_URL = `${
    getConfig().URL_BASE_BACKEND
  }/images/pictures_art/`;

  const getId = () => {
    const currentUrl = window.location.href;

    const id = currentUrl.split("/").pop();

    console.log("GET ID...", { id });

    return id;
  };

  const getPictureArt = async () => {
    const idPictureArt = getId();

    console.log("HERE...");

    try {
      const response = await fetch(
        `${getConfig().URL_BASE_BACKEND}/picturesart/${idPictureArt}`
      );
      const data = await response.json();

      console.log("Picture art", data);

      setPicture(data);
    } catch (error) {
      console.error("error to get the picture art");
    }
  };

  const context = useContext(appContext);

  //const { id } = useParams();

  //const location = useLocation();

  //const picture = location.state;

  //console.log("RECIBIDO....", location);

  //REFACTOR
  /*   const sold = picture.sold;*/
  const pictureSelected = context.checkPictureSelected(getId());

  useEffect(() => {
    console.log("GET PICTURE...");
    getPictureArt();
  }, []);

  //console.log({ pictureSelected });

  return (
    <Container fluid>
      {picture && (
        <Row className="justify-content-center ">
          <Col xs={12} md={8}>
            <Carousel
              interval={null}
              prevLabel=""
              nextLabel=""
              nextIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="000"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>{" "}
                </svg>
              }
              prevIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="000"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
                </svg>
              }
            >
              {picture.images.map((pict) => (
                <Carousel.Item>
                  <img
                    className="d-block w-100 mt-3"
                    src={`${IMAGES_BASE_URL}${pict.file_image}`}
                    alt="First slide"
                    style={{
                      objectFit: "contain",
                      maxHeight: "100%",
                      marginTop: "10px",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          <Col xs={12} md={4} className="  mt-3" style={{ marginTop: "5px" }}>
            <div className="custom-row">
              <Row>
                <Col>
                  <h2
                    style={{ fontSize: "28px", fontFamily: "Georgia" }}
                    className="mb-3"
                  >
                    {picture.name} {picture.sold ? "(SOLD OUT)" : ""}
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span
                    style={{ fontSize: "22px", fontFamily: "Georgia" }}
                    className="font-weight h5"
                  >
                    €{picture.price}
                  </span>
                </Col>
              </Row>

              {context.user && context.user.email === "maia@gmail.com" ? (
                <Row>
                  <Col>
                    <p
                      style={{ fontFamily: "Georgia" }}
                      dangerouslySetInnerHTML={{ __html: picture.description }}
                      className="mt-3 html-details-description"
                    ></p>
                  </Col>
                </Row>
              ) : context.user && pictureSelected ? (
                <>
                  <Row>
                    <Col>
                      <span className="font-weight">
                        Picture added to the cart
                      </span>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <button
                        className="delete-button"
                        onClick={() =>
                          context.handleDelete({
                            id_obra_arte: picture.id,
                            id_usuario: context.user.userId,
                          })
                        }
                      >
                        Delete
                      </button>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  {!picture.sold && (
                    <button
                      className="button-style mt-3"
                      onClick={() =>
                        context.handleAddToCart(picture, "portfolio")
                      }
                    >
                      Add to Cart
                    </button>
                  )}
                  <Row>
                    <Col>
                      <p
                        style={{ fontFamily: "Georgia" }}
                        dangerouslySetInnerHTML={{
                          __html: picture.description,
                        }}
                        className="mt-3 html-details-description"
                      ></p>
                    </Col>
                  </Row>
                </>
              )}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Details;
