import React, { useState, useContext, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { getConfig } from "../utils/config";

import { NavLink, useHistory, useLocation, Link } from "react-router-dom";

import { appContext } from "../contexts/appContext";

import Swal from "sweetalert2";

const YourAccount = () => {
  const location = useLocation();

  const picture = location.state;

  const history = useHistory();

  const context = useContext(appContext);

  const [emailEx, setEmailEx] = useState("");
  const [passwordEx, setPasswordEx] = useState("");

  const [message, setMessage] = useState("");

  const handleEmailEx = (event) => {
    setEmailEx(event.target.value);
  };

  const handlePasswordEx = (event) => {
    setPasswordEx(event.target.value);
  };

  const handleContinue = async () => {
    let value = true;

    if (emailEx.trim().length === 0) {
      setMessage("You must complete the field");
      value = false;
    }

    if (passwordEx.trim().length === 0) {
      setMessage("You must complete the field");
      value = false;
    }

    if (value) {
      try {
        const url = `${getConfig().URL_BASE_BACKEND}/auth`;

        const dataUser = {
          email: emailEx,
          password: passwordEx,
        };

        const response = await fetch(url, {
          method: "post",
          body: JSON.stringify(dataUser),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();

        if (response.status === 200) {
          console.log(data);
          console.log("este es el data user....", dataUser);
          context.changeUser({
            email: dataUser.email,
            userId: data.userId,
          });
          context.loginUser(true);
          history.push("/");
        } else {
          Swal.fire({ title: data.message, icon: "error" });
        }
      } catch {
        Swal.fire("User or Password are invalid");
      }
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center ">
      {context.yourAccount === true ? (
        <>
          <Row className="d-flex align-items-center justify-content-center  ">
            <Row className="mt-4 justify-content-center align-items-center">
              <Col xs={10} sm={10} md={8} lg={12}>
                <h1 className="font-weight-bold text-dark text-center">
                  You must be logged in to purchase or add products to cart
                </h1>
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col xs={10} md={6}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>Existing Customer</Card.Title>
                    <Card.Text>
                      <Form>
                        <Form.Group>
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="text"
                            className="bg-light"
                            onChange={handleEmailEx}
                          />
                        </Form.Group>

                        {emailEx ? (
                          ""
                        ) : (
                          <p className="text-danger font-italic">{message}</p>
                        )}
                        <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            className="bg-light"
                            onChange={handlePasswordEx}
                          />

                          {passwordEx ? (
                            ""
                          ) : (
                            <p className="text-danger font-italic">{message}</p>
                          )}
                        </Form.Group>
                        <Link to="/forgot-password">
                          Forgotten Your Password?
                        </Link>
                      </Form>
                    </Card.Text>
                    <button className="button-style" onClick={handleContinue}>
                      Continue
                    </button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={10} md={6}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>New Customer</Card.Title>
                    <NavLink to="/newcustomer">JOIN</NavLink>

                    <Card.Text>Create your account</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Row>
        </>
      ) : (
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={6}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Existing Customer</Card.Title>
                <Card.Text>
                  <Form>
                    <Form.Group>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="text"
                        className="bg-light"
                        onChange={handleEmailEx}
                      />
                    </Form.Group>
                    {emailEx ? (
                      ""
                    ) : (
                      <p className="text-danger font-italic">{message}</p>
                    )}
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        className="bg-light"
                        onChange={handlePasswordEx}
                      />
                    </Form.Group>
                    {passwordEx ? (
                      ""
                    ) : (
                      <p className="text-danger font-italic">{message}</p>
                    )}
                    <Link to="/forgot-password">Forgotten Your Password?</Link>
                  </Form>
                </Card.Text>
                <button className="button-style" onClick={handleContinue}>
                  Continue
                </button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>New Customer</Card.Title>
                <NavLink to="/newcustomer">JOIN</NavLink>
                <Card.Text>Create your account</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default YourAccount;
