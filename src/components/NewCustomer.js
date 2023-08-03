import React, { useState, useContext, useEffect } from "react";

import { checkPasswordValidity } from "../utils/passwordValidation";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { getConfig } from "../utils/config";

import Swal from "sweetalert2";

import { appContext } from "../contexts/appContext";

import { useHistory, useLocation } from "react-router-dom";

const NewCustomer = () => {
  const history = useHistory();

  const location = useLocation();

  const picture = location.state;

  const context = useContext(appContext);

  const [emailAddressNew, setEmailAddressNew] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [existingEmails, setExistingEmails] = useState([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchExistingEmails = async () => {
      try {
        const response = await fetch(`${getConfig().URL_BASE_BACKEND}/users`);
        const data = await response.json();
        setExistingEmails(data.email);
      } catch (error) {
        console.log("Error fetching existing emails", error);
      }
    };
    fetchExistingEmails();
  }, []);

  const handleEmailAddressNew = (event) => {
    setEmailAddressNew(event.target.value);
  };

  const handlePasswordNew = (event) => {
    const newPassword = event.target.value;
    setPasswordNew(newPassword);
    setIsPasswordValid(checkPasswordValidity(newPassword));
  };

  const checkExistingEmail = (email) => {
    return existingEmails.includes(email);
  };

  const handleRegisterNew = () => {
    registerNewCustomer();
  };

  const registerNewCustomer = async () => {
    let value = true;

    if (emailAddressNew.trim().length === 0) {
      setMessage("You must complete the field");
      value = false;
    }
    if (passwordNew.trim().length === 0) {
      setMessage("You must complete the field");
      value = false;
    }

    if (isPasswordValid(passwordNew)) {
      setMessage(
        "Password must include at least 8 characters, one uppercase letter, one lowercase letter, and one number"
      );
      value = false;
    }

    if (checkExistingEmail(emailAddressNew)) {
      setMessage("Email already exists");
      value = false;
    }
    if (value) {
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

        console.log(response);

        if (response.status === 200) {
          const dataNewUser = await response.json();

          context.changeUser({
            email: emailAddressNew,
            userId: dataNewUser.insertId,
          });

          console.log("data user new customer", dataNewUser);
          context.loginUser(true);
          history.push("/");
        } else if (response.status === 500) {
          const dataError = await response.json();

          Swal.fire(dataError.message);
        }
      } catch (err) {
        Swal.fire("User or Password are not valid");
      }
    }
  };

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center mt-4">
        <Col className="col-5">
          <Form>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                onChange={handleEmailAddressNew}
                required
                className="bg-light"
              />
              {emailAddressNew ? "" : message}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={handlePasswordNew}
                required
                className={`bg-light ${isPasswordValid ? "" : "border-danger"}`}
              />

              <Row>
                <Col>
                  <span>
                    Include a minimum of 8 characters, contain at least one
                    uppercase letter, one lowercase letter and one number
                  </span>
                </Col>
              </Row>

              {passwordNew ? "" : message}
            </Form.Group>
          </Form>
          <button className="button-style" onClick={handleRegisterNew}>
            Register
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default NewCustomer;
