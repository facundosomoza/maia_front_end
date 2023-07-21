import React, { useState, useContext, useEffect } from "react";

import { Button, Col, Row } from "react-bootstrap";

import imgNoPicture from "../assets/images/no-picture.png";

import { getConfig } from "../utils/config";

import { appContext } from "../contexts/appContext";

export default function PictureWithUploader({
  order,
  initialImage,
  imageClass,
}) {
  const context = useContext(appContext);

  console.log({ initialImage });

  const PICTURE_URL = `${getConfig().URL_BASE_BACKEND}/images/biography/`;

  const [image, setImage] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    setImage(initialImage ? PICTURE_URL + initialImage : "");
  }, [initialImage]);

  const handlePictureBiography = (event) => {
    console.log("Select image", order);

    //Guardar en la bd
    // Aquí puedes enviar las imágenes al backend
    // utilizando una solicitud POST y FormData
    const formData = new FormData();

    formData.append("image", event.target.files[0]);
    formData.append("position", order);

    // Ejemplo de envío de imágenes al backend utilizando fetch
    fetch(`${getConfig().URL_BASE_BACKEND}/biography-pictures`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes manejar la respuesta del backend
        console.log(data);
        //Actualizar la preview
        setUploadedImage(event.target.files[0]);
      })
      .catch((error) => {
        console.error("Error al enviar las imágenes al backend", error);
      });
  };

  return (
    <Col className="d-flex align-items-center justify-content-center ">
      <img
        className={`img-fluid img-thumbnail ${imageClass ? imageClass : ""}`}
        src={
          uploadedImage
            ? URL.createObjectURL(uploadedImage)
            : image
            ? image
            : imgNoPicture
        }
        alt="Maia Tsintsadze"
        width="80%"
      />
      {context.user && context.user.email === "maia@gmail.com" && (
        <Row>
          <Col>
            <input type="file" onChange={handlePictureBiography} />
          </Col>
        </Row>
      )}
    </Col>
  );
}
