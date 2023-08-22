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

import usePaypal from "./hooks/usePaypal";
import Swal from "sweetalert2";

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, userData }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  useEffect(() => {
    console.log({ userData });
  }, [userData]);

  const context = useContext(appContext);
  //const { createOrder, onApprove } = usePaypal();

  console.log("Carrito....", context.cart);

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
        console.log(order.id);
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

    console.log("STATUS", response.status);

    if (response.status === 201) {
      const orderData = await response.json();

      console.log(orderData, "approved!");

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
  const paypalUrl = "https://www.paypal.com/signin";

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

  const [validForm, setValidForm] = useState(false);

  const loadDataLocal = () => {
    console.log(context.cart);
  };

  useEffect(loadDataLocal, []);

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
    setEmail(event.target.value);
  };

  const handleMobileNumber = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleCheckOut = () => {
    setValidForm(false);

    console.log("TOTAL:", context.totalAmount());
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
    if (email.trim().length === 0) {
      setMessage("You must fill in the field");
      value = false;
    }
    if (mobileNumber.trim().length === 0) {
      setMessage("You must fill in the field");
      value = false;
    }
    if (value) {
      console.log("ok");
      setValidForm(true);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col className="col-8">
          <Form>
            <Row>
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
            <Row>
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
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control onChange={handleCounty} disabled={validForm} />
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

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control onChange={handleEmail} disabled={validForm} />
                  <Form.Text className="text-muted">Required</Form.Text>
                  {email ? (
                    ""
                  ) : (
                    <p className="text-danger font-italic">{message}</p>
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
            <Col
              style={{ fontSize: "18px", fontFamily: "Georgia" }}
              className="d-flex align-items-center justify-content-center"
            >
              Total: USD {context.totalAmount()}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col
              className="d-flex align-items-center justify-content-center "
              style={{ flexDirection: "column" }}
            >
              {!validForm ? (
                <button className="button-style" onClick={handleCheckOut}>
                  Pay with
                  <img
                    src={paypalUrl} // Reemplaza con la ruta del logotipo de PayPal
                    alt="PayPal"
                    style={{ marginRight: "10px" }} // Agrega un margen derecho para separar el logotipo del texto
                  />
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
