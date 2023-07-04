import React from "react";
import { Container, Col, Row } from "react-bootstrap";

import Button from "react-bootstrap/Button";

export default function OrderPictures({ handleOrderPictures }) {
  return (
    <>
      <Button onClick={handleOrderPictures}>Order Pictures</Button>
    </>
  );
}
