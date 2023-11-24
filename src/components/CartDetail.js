import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../contexts/appContext";

import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useHistory } from "react-router-dom";

import { getConfig } from "../utils/config";

const CartDetail = () => {
  const context = useContext(appContext);

  const PICTURES_ART_URL_BASE = `${
    getConfig().URL_BASE_BACKEND
  }/images/pictures_art`;

  const history = useHistory();

  useEffect(() => {
    context.handleCheckFooter("");
  }, []);

  useEffect(() => {
    context.getInfo();
  }, []);

  useEffect(() => {
    if (context.cart.length === 0) {
      history.push("/portfolio");
    }
  }, [context.cart, history]);

  const handleCheckOut = () => {
    if (context.loggedUser === true) {
      history.push("/checkout");
    } else {
      history.push("/youraccount");
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={7}>
            <Table>
              <thead>
                <tr>
                  <th className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-3 text-left">
                    Picture
                  </th>
                  <th className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-4 text-left">
                    Name
                  </th>
                  <th className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-4 text-left">
                    Price
                  </th>
                  <th className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 text-left ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {context.cart.map((info) => (
                  <tr key={info.id}>
                    <td className="text-center">
                      <Image
                        src={`${PICTURES_ART_URL_BASE}/${info.imagen}`}
                        alt={info.name}
                        fluid
                        style={{ maxHeight: "100px", padding: 0 }}
                      />
                    </td>
                    <td
                      style={{ fontFamily: "Georgia" }}
                      className="align-middle"
                    >
                      {info.name}
                    </td>
                    <td
                      style={{ fontFamily: "Georgia" }}
                      className="align-middle"
                    >
                      €{info.price}
                    </td>
                    <td className="align-middle">
                      <button
                        className="delete-button "
                        onClick={() => {
                          context.handleDelete(info);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="text-center align-items-center">
          <Col>
            <div
              style={{ fontSize: "18px", fontFamily: "Georgia" }}
              className="total-amount py-2"
            >
              Total Amount: €{context.totalAmount()}
            </div>

            <button className="button-style mt-3" onClick={handleCheckOut}>
              Check Out
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartDetail;
