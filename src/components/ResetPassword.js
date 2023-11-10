import React, { useState, useContext, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { getConfig } from "../utils/config";

import { useHistory, useLocation } from "react-router-dom";

import { appContext } from "../contexts/appContext";

import Swal from "sweetalert2";
import { Card } from "react-bootstrap";
import { checkPasswordValidity } from "../utils/passwordValidation";

const ResetPassword = () => {
  const history = useHistory();

  const [passwordNew, setPasswordNew] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [recoveryToken, setRecoveryToken] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const token = searchParams.get("token");

    setRecoveryToken(token);
  }, []);

  const handlePasswordNew = (event) => {
    const newPassword = event.target.value;
    setPasswordNew(newPassword);
    setIsPasswordValid(checkPasswordValidity(newPassword));
  };

  const handleContinue = async () => {
    let value = true;

    console.log({ isPasswordValid });

    if (!isPasswordValid) {
      value = false;
    }

    if (value) {
      try {
        console.log("Cambiar", recoveryToken, passwordNew);
        const url = `${
          getConfig().URL_BASE_BACKEND
        }/forgot_password/change_password`;

        const recoveryData = {
          recoveryToken,
          passwordNew,
        };

        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(recoveryData),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        /*const data = await response.json();

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
        } */
      } catch {
        Swal.fire("Password are not valid");
      }
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center ">
      <Row className="justify-content-center mt-4">
        <Col xs={10} md={6}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Reset your password</Card.Title>
              <Card.Text>
                <Form>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      className="bg-light"
                      onChange={handlePasswordNew}
                    />
                    <Form.Text className={`text-muted`}>
                      Include a minimum of 8 characters, contain at least one
                      uppercase letter, one lowercase letter, and one number
                    </Form.Text>
                  </Form.Group>
                </Form>
              </Card.Text>
              <button className="button-style" onClick={handleContinue}>
                Continue
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
