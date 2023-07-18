import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../contexts/appContext";

import CheckOut from "./CheckOut";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import { getConfig } from "../utils/config";

const CartDetail = () => {
  const context = useContext(appContext);

  const PICTURES_ART_URL_BASE = `${
    getConfig().URL_BASE_BACKEND
  }/images/pictures_art`;

  const history = useHistory();

  useEffect(() => {
    context.getInfo();
  }, []);

  const handleCheckOut = () => {
    if (context.loggedUser === true) {
      history.push("/checkout");
    } else {
      history.push("/youraccount");
    }
  };

  console.log(context.cart);

  return (
    <>
      <Container>
        <Table responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {context.cart.map((info) => (
              <tr key={info.id}>
                <td>
                  <Image
                    src={`${PICTURES_ART_URL_BASE}/${info.imagen}`}
                    alt={info.name}
                    fluid
                    style={{ maxHeight: "100px", padding: 0 }}
                  />
                </td>
                <td className="align-middle">{info.name}</td>
                <td className="align-middle">{info.price}</td>
                <td className="align-middle">
                  <Button
                    variant="danger"
                    onClick={() => {
                      console.log(info);
                      context.handleDelete(info);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row className="text-center align-items-center">
          <Col>
            <div className="total-amount py-2">
              Total Amount: {context.totalAmount()}
            </div>

            <Button onClick={handleCheckOut}>Check Out</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartDetail;
