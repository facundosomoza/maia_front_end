import React, { useEffect, useState, useContext } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";

import { getConfig } from "../utils/config";

import { appContext } from "../contexts/appContext";

import { useLocation } from "react-router-dom";

const CheckOut = ({ totalAmount }) => {
  console.log({ totalAmount });
  const IMAGES_BASE_URL = `${getConfig().URL_BASE_BACKEND}/pictures_art/`;

  const context = useContext(appContext);

  const PICTURES_ART_URL_BASE = `${
    getConfig().URL_BASE_BACKEND
  }/images/pictures_art`;

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [eircode, setEircode] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  const loadDataLocal = () => {
    console.log(context.cart);
  };

  useEffect(loadDataLocal, []);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleSurname = (event) => {
    setSurname(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleCounty = (event) => {
    setCounty(event.target.value);
  };

  const handleEircode = (event) => {
    setEircode(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleMobileNumber = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleCheckOut = () => {
    console.log(totalAmount);
    let value = true;

    if (firstName.trim().length === 0) {
      setMessage("You must complete the field");
      value = false;
    }
    if (surname.trim().length === 0) {
      setMessage("You must complete the field");
      value = false;
    }
    if (address.trim().length === 0) {
      setMessage("You must complete the field");
      value = false;
    }
    if (city.trim().length === 0) {
      setMessage("You must complete the field");
      value = false;
    }
    if (county.trim().length === 0) {
      setMessage("You must complete the field");
      value = false;
    }
    if (eircode.trim().length === 0) {
      setMessage("You must complete the field");
      value = false;
    }
    if (email.trim().length === 0) {
      setMessage("You must complete the field");
      value = false;
    }
    if (mobileNumber.trim().length === 0) {
      setMessage("You must complete the field");
      value = false;
    }
    if (value) {
      console.log("ok");
    }
  };

  return (
    <Container>
      <Row>
        <Col className="col-8">
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control onChange={handleFirstName} />

                  {firstName ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Surname *</Form.Label>
                  <Form.Control onChange={handleSurname} />

                  {surname ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    House/Flat number and street address *
                  </Form.Label>
                  <Form.Control onChange={handleAddress} />

                  {address ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control onChange={handleCity} />

                  {city ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>County</Form.Label>
                  <Form.Control onChange={handleCounty} />

                  {county ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Eircode</Form.Label>
                  <Form.Control onChange={handleEircode} />

                  {eircode ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control onChange={handleEmail} />

                  {email ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control onChange={handleMobileNumber} />

                  {mobileNumber ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col>
          <Table responsive>
            <tbody>
              {context.cart.map((cart) => (
                <tr key={cart.id}>
                  <td className="align-middle text center">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={`${PICTURES_ART_URL_BASE}/${cart.imagen}`}
                        alt={cart.name}
                        fluid
                        style={{ maxHeight: "100px", padding: 0 }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row>
            <Col className="d-flex align-items-center justify-content-center">
              {context.totalAmount()}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center justify-content-center">
              <button className="button-style" onClick={handleCheckOut}>
                Pay with Paypal
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOut;
