import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../contexts/appContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PictureWithUploader from "./PictureWithUploader";
import { getConfig } from "../utils/config";

const Biography = () => {
  const [biographyImages, setBiographyImages] = useState([]);

  const context = useContext(appContext);

  useEffect(() => {
    context.handleCheckFooter("");
  }, []);

  useEffect(() => {
    const fetchBiographyImages = async () => {
      try {
        const response = await fetch(
          `${getConfig().URL_BASE_BACKEND}/biography-pictures`
        );
        const data = await response.json();

        setBiographyImages(data);
      } catch (error) {
        console.error("Error al obtener las imágenes de la biografía", error);
      }
    };

    fetchBiographyImages();
  }, []);

  const getInitialImage = (position) => {
    if (biographyImages.length > 0) {
      return biographyImages[position - 1].image;
    } else {
      return null;
    }
  };

  return (
    <>
      <Container>
        <Row className="custom-row">
          <Col className="text-center">
            <h1 className="mt-4">Maia Tsintsadze</h1>
            <p className="mx-auto mt-4 text-center">
              is an abstract artist who creates captivating and expressive
              artwork that explores human emotions and the constantly changing
              nature of life.
              <br />
              Her unique artistic style invites viewers to interpret her
              thought-provoking pieces in their own personal way.
            </p>
          </Col>
        </Row>
        <Row className="mt-4 custom-row align-items-center">
          <Col className="col-12 col-lg-6 mb-2">
            <PictureWithUploader order={1} initialImage={getInitialImage(1)} />
          </Col>

          <Col>
            <p className="text-center">
              Maia began her artistic journey in her late twenties, using art as
              a form of meditation and self-discovery.
              <br />
              Despite challenges on her path to recognition due to her
              background in the hospitality sector, she displayed courage and
              determination to establish herself as an accomplished artist.
              <br />
              Over time, her art has evolved to capture the essence of her
              emotions and experiences, reflecting her personal and artistic
              maturation. Sharing her art holds great significance for Maia, as
              it evokes emotions, provokes introspection, and inspires viewers
              to connect with their inner selves.
              <br />
              She believes that art is a universal medium for communication and
              understanding, capable of transcending language and culture.
              <br />
              Maia's artwork conveys messages of resilience, hope, and the
              celebration of the human spirit through the use of color to
              establish a deep emotional connection between her work and its
              viewers.
            </p>
          </Col>
        </Row>

        <Row className="mt-4 custom-row align-items-center">
          <Col>
            <p className="text-center">
              Maia's story is a testament to the power of resilience and
              pursuing one's dreams. She faced numerous challenges after
              emigrating from Georgia to Ireland during her teenage years.
              <br />
              The transition was not easy, and she experienced confusion and
              uncertainty. However, through perseverance and a deep connection
              to her new home, Ireland eventually became the place where she
              found solace and a sense of belonging.
              <br />
              Despite becoming a single mother to two children, Maia pursued her
              dream of becoming an artist without letting societal expectations
              or personal circumstances hold her back.
              <br />
              She fearlessly embraced her artistic path, setting an example for
              women who may feel vulnerable or uncertain. Through her art and
              dedication, Maia aims to inspire and empower others to rise above
              their circumstances and embrace the extraordinary possibilities
              that await them.
            </p>
          </Col>

          <Col className="col-12 col-lg-6 mb-2">
            <PictureWithUploader order={2} initialImage={getInitialImage(2)} />
          </Col>
        </Row>
        <Row className="mt-4 custom-row align-items-center">
          <Col md={10} className="mx-auto">
            <p className="text-center">
              Embark on Maia's inspiring journey to break free from societal
              expectations, honor your passions, and embrace the freedom to
              create and live life on your own terms.
              <br />
              Her captivating contemporary abstract art invites you to unlock
              the extraordinary potential that lies within you.
              <br />
              Maia's journey stands as a testament to the resilience and
              strength of the human spirit, reminding us all that we can
              overcome obstacles and pursue a life of fulfillment and
              authenticity.
            </p>
          </Col>
        </Row>
        <Row className="mt-4 d-flex justify-content-center">
          <Col className="col-12 col-lg-10 mb-2">
            <PictureWithUploader
              order={3}
              initialImage={getInitialImage(3)}
              imageClass="img-lg"
            />
          </Col>
        </Row>

        <Row className="mt-4 custom-row align-items-center">
          <Col md={10} className="mx-auto">
            <p className="text-center">
              Chase your dreams with determination, but don't forget about love,
              responsibility, and compassion.
              <br />
              True success is even better when it positively impacts others”
              M.T.
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="col-12 col-md-6 mb-2">
            <PictureWithUploader order={4} initialImage={getInitialImage(4)} />
          </Col>
          <Col className="col-12 col-md-6">
            <PictureWithUploader order={5} initialImage={getInitialImage(5)} />
          </Col>
        </Row>
        <Row className="mt-4 custom-row align-items-center">
          <Col md={11} className="mx-auto">
            <p className="text-center">
              Join Maia Tsintsadze on her mesmerizing artistic odyssey and let
              her captivating abstract artworks ignite the fire within you,
              empowering you to embrace your own creative potential and live a
              life filled with authenticity and boundless inspiration.
              <br />
              As an artist and a guiding light, Maia aims to inspire and empower
              others to embrace their true selves and embrace the boundless
              possibilities that await.
              <br />
              Through her art, she invites you to step into a world where
              imagination knows no limits, where resilience conquers adversity,
              and where the human spirit soars.
            </p>
          </Col>
        </Row>
        <Row className="mt-4 d-flex justify-content-center">
          <Col className="col-12 col-lg-10 mb-2">
            <PictureWithUploader
              order={6}
              initialImage={getInitialImage(6)}
              imageClass="img-lg"
            />
          </Col>
        </Row>
      </Container>
      {/*  <ModalBiography
        pictureBiography={pictureBiography}
        handleClose={handleClose}
        handleSaveImages={handleSaveImages}
      ></ModalBiography> */}
    </>
  );
};

export default Biography;
