import React from "react";
import { Col, Row } from "react-bootstrap";

import { useHistory } from "react-router-dom";

export default function PurchaseSuccess() {
  const history = useHistory();

  const handleGoToPortfolio = () => {
    history.push("/portfolio");
  };

  return (
    <Row>
      <Col className=" my-5 text-center">
        <div style={{ fontFamily: "Georgia", fontSize: "24px" }}>
          Thank you for your purchase!
        </div>
        <button class="button-style-second mt-5" onClick={handleGoToPortfolio}>
          Go to Portfolio
        </button>
      </Col>
    </Row>
  );
}
