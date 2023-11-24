import React, { useState, useEffect } from "react";

import { Button, Modal, Form, Row, Col, Image } from "react-bootstrap";

import noPictureImage from "../assets/images/no-picture.png";

export default function FileRowImage({
  data,
  onChangePicture,
  index,
  onOrderChange,
}) {
  const { file, image } = data;

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    image ? image : noPictureImage
  );

  useEffect(() => {
    if (selectedFile) {
      setPreviewImage(URL.createObjectURL(selectedFile));
    } else {
      if (!image) {
        setPreviewImage(noPictureImage);
      }
    }

    onChangePicture(selectedFile, index);
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleOrderChange = (event) => {
    onOrderChange(index, event.target.value);
  };

  return (
    <>
      <Form.Group>
        <Row>
          <Col>
            <Image
              fluid
              style={{ maxHeight: "80px", padding: 0 }}
              src={previewImage}
              alt="Preview"
            />
          </Col>

          <Col>
            <Form.Control
              type="text"
              onChange={handleOrderChange}
              value={data.order}
            />
          </Col>

          <Col>
            <Form.Label>File</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Col>
        </Row>
      </Form.Group>
    </>
  );
}
