import React, { useContext } from "react";

import { Carousel } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useLocation } from "react-router-dom";

import { appContext } from "../contexts/appContext";

const Details = () => {
  const IMAGES_BASE_URL = "http://localhost:8001/images/pictures_art/";

  const context = useContext(appContext);

  const location = useLocation();

  const picture = location.state;

  const sold = picture.sold;

  console.log(picture);

  const pictureSelected = context.checkPictureSelected(picture.id);

  return (
    <Container fluid>
      <Row className="mt-4">
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
                  className=""
                  src={`${IMAGES_BASE_URL}${pict.file_image}`}
                  alt="First slide"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        <Col xs={12} md={4}>
          <div>
            <Form.Text>{picture.name}</Form.Text>
            <Form.Text>{picture.description}</Form.Text>
            <Form.Text>{picture.price}</Form.Text>
            {context.user && context.user.email === "maia@gmail.com" ? (
              ""
            ) : pictureSelected ? (
              <>
                <span>Picture added to the cart</span>
                <Button
                  onClick={() =>
                    context.handleDelete({
                      id_obra_arte: picture.id,
                      id_usuario: context.user.userId,
                    })
                  }
                >
                  Delete
                </Button>
              </>
            ) : (
              !picture.sold && (
                <Button
                  onClick={() => context.handleAddToCart(picture, "portfolio")}
                >
                  Add to Cart
                </Button>
              )
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
