import React, { useState, useContext, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
        const url = "http://localhost:8001/auth";

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

        console.log(data);

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
    <Container className="d-flex align-items-center justify-content-center mt-5">
      {context.yourAccount === true ? (
        <Row>
          <h1>You must be logged in to purchase or add products to cart</h1>
          <Col className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Existing Customer</Card.Title>
                <Card.Text>
                  <Form>
                    <Form.Group>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="text" onChange={handleEmailEx} />
                    </Form.Group>
                    {emailEx ? "" : message}
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        onChange={handlePasswordEx}
                      />
                    </Form.Group>
                  </Form>
                </Card.Text>
                <Button variant="primary" onClick={handleContinue}>
                  Continue
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
              <Card.Body className="d-flex flex-column justify-content-center my-auto">
                <Card.Title>New Customer</Card.Title>
                <NavLink to="/newcustomer">JOIN</NavLink>
                <Card.Text>Create your account</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col className="justify-content-center">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Existing Customer</Card.Title>
                <Card.Text>
                  <Form>
                    <Form.Group>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="text" onChange={handleEmailEx} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        onChange={handlePasswordEx}
                      />
                    </Form.Group>
                    <Link to="/forgot-password">Forgotten Your Password</Link>
                  </Form>
                </Card.Text>
                <Button variant="primary" onClick={handleContinue}>
                  Continue
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body className="d-flex flex-column justify-content-center my-auto">
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
