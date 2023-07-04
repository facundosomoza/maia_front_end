import React from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AdminTool({ handleNew }) {
  return (
    <>
      <Button onClick={handleNew}>New</Button>
    </>
  );
}
