import React, { useEffect, useState, useContext } from "react";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import { useHistory } from "react-router-dom";

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

import Swal from "sweetalert2";

import logoPaypal from "../assets/images/logo_paypal.png";

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, userData }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const context = useContext(appContext);
  //const { createOrder, onApprove } = usePaypal();

  const history = useHistory();

  function createOrder() {
    return fetch(`${getConfig().URL_BASE_BACKEND}/paypal/createorder`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userData,
        cart: context.cart,
      }),
    })
      .then((response) => response.json())
      .then((order) => {
        return order.id;
      });
  }
  async function onApprove(data) {
    // replace this url with your server
    const response = await fetch(
      `${getConfig().URL_BASE_BACKEND}/paypal/capture-order`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    );

    if (response.status === 201) {
      await response.json();

      context.setCart([]);

      history.push("/purchase-success");
    } else {
      Swal.fire({ text: "Error", icon: "error" });
    }
  }

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        //style={style}
        disabled={false}
        //forceReRender={[style]}
        //fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </>
  );
};

const CheckOut = () => {
  const [countries, setCountries] = useState([]);
  const [emailError, setEmailError] = useState("");

  const paypalUrl = "https://www.paypal.com/signin";

  const getCountries = async () => {
    const url = `${getConfig().URL_BASE_BACKEND}/countries`;

    const response = await fetch(url);
    const data = await response.json();

    setCountries(data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  const context = useContext(appContext);
  const history = useHistory();

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

  const [validForm, setValidForm] = useState(false);

  const handleCancel = () => {
    setValidForm(false);
  };

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
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);

    // Expresión regular para verificar la presencia de '@' en el correo electrónico
    const emailPattern = /\S+@\S+\.\S+/;

    // Validación y actualización del mensaje de error
    if (!emailPattern.test(enteredEmail)) {
      setEmailError("Enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleMobileNumber = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleCheckOut = () => {
    setValidForm(false);
    let value = true;

    if (firstName.trim().length === 0) {
      setMessage("You must fill in the field");
      value = false;
    }
    if (surname.trim().length === 0) {
      setMessage("You must fill in the field");
      value = false;
    }
    if (address.trim().length === 0) {
      setMessage("You must fill in the field");
      value = false;
    }
    if (city.trim().length === 0) {
      setMessage("You must fill in the field");
      value = false;
    }
    if (county.trim().length === 0) {
      setMessage("You must fill in the field");
      value = false;
    }
    if (eircode.trim().length === 0) {
      setMessage("You must fill in the field");
      value = false;
    }

    if (emailError) {
      setEmailError("Enter a valid email address.");
      value = false;
    }

    if (mobileNumber.trim().length === 0) {
      setMessage("You must fill in the field");
      value = false;
    }
    if (value) {
      setValidForm(true);
    }
  };

  useEffect(() => {
    if (
      context.checkLoggedFinished &&
      (!context.loggedUser || context.cart.length === 0)
    ) {
      history.push("/portfolio");
    }
  }, [context.checkLoggedFinished]);

  return (
    <Container>
      <Row className="mt-4 d-flex justify-content-center">
        <Col className="col-12 d-flex justify-content-center">
          <Form>
            <Row className="form-row">
              <Col>
                <Form.Group>
                  <Form.Label>First Name </Form.Label>
                  <Form.Control
                    onChange={handleFirstName}
                    disabled={validForm}
                  />
                  <Form.Text className="text-muted">Required</Form.Text>
                  {firstName ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Surname </Form.Label>
                  <Form.Control onChange={handleSurname} disabled={validForm} />
                  <Form.Text className="text-muted">Required</Form.Text>
                  {surname ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="form-row">
              <Col>
                <Form.Group>
                  <Form.Label>House/Flat number and street address</Form.Label>
                  <Form.Control onChange={handleAddress} disabled={validForm} />
                  <Form.Text className="text-muted">Required</Form.Text>
                  {address ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control onChange={handleCity} disabled={validForm} />
                  <Form.Text className="text-muted">Required</Form.Text>
                  {city ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="form-row">
              <Col>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    onChange={handleCounty}
                    as="select"
                    disabled={validForm}
                  >
                    <option value="">Select country...</option>
                    {countries.map(({ id, name }) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                  </Form.Control>

                  {/*                  <Form.Control onChange={handleCounty} disabled={validForm} /> */}
                  <Form.Text className="text-muted">Required</Form.Text>
                  {county ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>Eircode</Form.Label>
                  <Form.Control onChange={handleEircode} disabled={validForm} />
                  <Form.Text className="text-muted">Required</Form.Text>
                  {eircode ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="form-row">
              <Col>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control onChange={handleEmail} disabled={validForm} />
                  <Form.Text className="text-muted">Required</Form.Text>
                  {emailError && (
                    <p className="text-danger font-italic">{emailError}</p>
                  )}
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    onChange={handleMobileNumber}
                    disabled={validForm}
                  />
                  <Form.Text className="text-muted">Required</Form.Text>
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
        <Col md={8}>
          <Row className="row-cols-2 row-cols-md-4 my-4 justify-content-center">
            {context.cart.map((cartItem) => (
              <Col className="text-center my-2">
                <Image
                  src={`${PICTURES_ART_URL_BASE}/${cartItem.imagen}`}
                  alt={cartItem.name}
                  fluid
                  style={{ maxHeight: "100px", padding: 0 }}
                />
              </Col>
            ))}
          </Row>

          <Row>
            <Col
              style={{ fontSize: "18px", fontFamily: "Georgia" }}
              className="d-flex align-items-center justify-content-center"
            >
              Total: € {context.totalAmount()}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col
              className="d-flex align-items-center justify-content-center "
              style={{ flexDirection: "column" }}
            >
              {!validForm ? (
                <button className="button-style" onClick={handleCheckOut}>
                  Pay with <img src={logoPaypal} height="22px" />
                </button>
              ) : (
                <>
                  {/* SANDBOX */}
                  <Row>
                    <Col>
                      <PayPalScriptProvider
                        options={{
                          "client-id":
                            "AUsVdu_ALzBec4O2PpwAdMhbeZpLCAxUsrcl49tDo_D7vTzR3LoYpBFIfUsn986cd6JBXno64uCwYVSy",
                          locale: "en_US",
                          currency: "EUR",
                        }}
                      >
                        <ButtonWrapper
                          showSpinner={false}
                          userData={{
                            firstName,
                            surname,
                            address,
                            city,
                            county,
                            eircode,
                            email,
                            mobileNumber,
                          }}
                        />
                      </PayPalScriptProvider>

                      {/* LIVE */}
                      {/*               <PayPalScriptProvider
                        options={{
                          "client-id":
                            "AdTUHdeWxmLBjD2Okx5XUjkXdq8YNwmyC3GpLHIy2F1VqAk66_iXf4WivhMsQZXCsDAmJU0HBswA3FAR",
                          locale: "en_US",
                        }}
                      >
                        <ButtonWrapper showSpinner={false} />
                      </PayPalScriptProvider> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <button className="button-style" onClick={handleCancel}>
                        Cancel
                      </button>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOut;
