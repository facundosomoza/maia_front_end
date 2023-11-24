import React, { useState, useContext, useEffect } from "react";

import { checkPasswordValidity } from "../utils/passwordValidation";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

import { getConfig } from "../utils/config";

import Swal from "sweetalert2";

import { appContext } from "../contexts/appContext";

import { Link, useHistory, useLocation } from "react-router-dom";

//import emailVerifier from "email-verifier";

const NewCustomer = () => {
  const history = useHistory();

  const location = useLocation();

  const picture = location.state;

  const context = useContext(appContext);

  const [emailAddressNew, setEmailAddressNew] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setpasswordErrorMessage] = useState("");

  const handleEmailAddressNew = (event) => {
    setEmailAddressNew(event.target.value);
  };

  const handlePasswordNew = (event) => {
    const newPassword = event.target.value;
    setPasswordNew(newPassword);
    setIsPasswordValid(checkPasswordValidity(newPassword));
  };

  const checkExistingEmail = async () => {
    const url = `${
      getConfig().URL_BASE_BACKEND
    }/users/verify_email/${emailAddressNew}`;

    const response = await fetch(url);

    return response.status === 200;
  };

  const handleRegisterNew = async () => {
    let isValidData = true;

    const isValidEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      emailAddressNew
    );

    if (!isValidEmailFormat) {
      setEmailErrorMessage("Invalid email format");
      isValidData = false;
    } else {
      setEmailErrorMessage("");
    }

    if (!isPasswordValid) {
      setpasswordErrorMessage("Password is not valid");
      isValidData = false;
    } else {
      setpasswordErrorMessage("");
    }

    if (isValidData) {
      const emailNotExists = await checkExistingEmail();

      if (emailNotExists) {
        registerNewCustomer();

        try {
        } catch (erorr) {
          Swal.fire({ text: "Registration error", icon: "error" });
        }
      } else {
        Swal.fire({ text: "Email already exists", icon: "error" });
      }
    }
  };

  const registerNewCustomer = async () => {
    try {
      const url = `${getConfig().URL_BASE_BACKEND}/users`;

      const dataUser = {
        email: emailAddressNew,
        password: passwordNew,
      };

      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify(dataUser),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.status === 200) {
        history.push("/email-sent");
      } else if (response.status === 500) {
        const dataError = await response.json();

        Swal.fire(dataError.message);
      }
    } catch (err) {
      Swal.fire({
        text: "Registration fail",
        customClass: {
          container: "my-swal-container",
          popup: "my-swal-popup",
          content: "my-swal-content",
        },
      });
    }
  };

  useEffect(() => {
    if (context.loggedUser) {
      history.push("/portfolio");
    }
  }, [context.loggedUser]);

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center mt-4">
        <Col xs={10} md={6}>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleEmailAddressNew}
                    required
                    className="bg-light"
                    value={emailAddressNew}
                  />
                  {emailErrorMessage && (
                    <Form.Text className="text-error">
                      {emailErrorMessage}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={handlePasswordNew}
                    required
                    className={`bg-light ${
                      passwordNew && !isPasswordValid ? "is-invalid" : ""
                    }`}
                  />
                  {passwordErrorMessage && (
                    <Form.Text className="text-error">
                      {passwordErrorMessage}
                    </Form.Text>
                  )}

                  <Form.Text
                    className={`text-muted ${
                      passwordNew && !isPasswordValid ? "text-danger" : ""
                    }`}
                  >
                    Include a minimum of 8 characters, contain at least one
                    uppercase letter, one lowercase letter, and one number
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <button className="button-style mr-2" onClick={handleRegisterNew}>
            Register
          </button>

          <Link className="card-title" to="/youraccount">
            Cancel
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NewCustomer;
