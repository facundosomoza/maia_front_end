import React, { useContext, useEffect } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { NavLink, useHistory } from "react-router-dom";

import { appContext } from "../contexts/appContext";

import { getConfig } from "../utils/config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const context = useContext(appContext);

  const history = useHistory();

  const handleLogOut = async () => {
    const url = `${getConfig().URL_BASE_BACKEND}/auth/logout`;

    const response = await fetch(url, {
      method: "delete",
      credentials: "include",
    });

    if (response.status === 200) {
      context.loginUser(false);
      context.changeUser(null);

      context.setCart([]);
      console.log("Vaciando el carrito...");

      context.checkPictureSelected([]);

      history.push("/");
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    console.log("CARRITO...", context.cart);
  }, [context.cart]);

  const checkLogged = async () => {
    context.handleCheckLoggedFinished(false);

    const url = `${getConfig().URL_BASE_BACKEND}/auth/check_logged`;

    const response = await fetch(url, {
      method: "get",
      credentials: "include",
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log("DATA 222...", data);
      context.loginUser(true);
      context.changeUser(data);
      context.getInfo();

      console.log("USUARIO YA LOGUEADO", data);
    } else {
      console.log("USUARIO NO LOGUEADO");
      context.loginUser(false);
    }

    context.handleCheckLoggedFinished(true);
  };

  useEffect(() => {
    checkLogged();
  }, []);

  return (
    <Navbar expand="lg" className="button-style">
      <Container>
        <NavLink
          className="navbar-brand white-link"
          style={{ fontFamily: "Georgia" }}
          exact
          to="/"
        >
          Maia Tsintsadze
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link white-link" to="/portfolio">
              Portfolio
            </NavLink>
            <NavLink to="/biography" className="nav-link white-link">
              Biography
            </NavLink>
            <NavLink className="nav-link white-link" to="/contact">
              Contact
            </NavLink>
          </Nav>
          <Nav className="ml-auto">
            {context.loggedUser ? (
              <>
                {context.user && context.user.email === "maia@gmail.com" && (
                  <>
                    <div>
                      <span className="mr-2">{context.user.email}</span>
                      <Button onClick={handleLogOut}>Log-out</Button>
                    </div>
                  </>
                )}

                {!context.user ||
                  (context.user.email !== "maia@gmail.com" && (
                    <>
                      {context.cart.length > 0 ? (
                        <NavLink className="nav-link" to="/cartdetail">
                          <div className="d-flex align-items-center">
                            <FontAwesomeIcon
                              icon={faCartShopping}
                              className="mr-1"
                            />
                            <span className="badge badge-primary ">
                              {context.cart.length}
                            </span>
                            <span className="ml-2">{context.user.email}</span>
                            <button
                              className="button-style-second"
                              onClick={handleLogOut}
                            >
                              Log-out
                            </button>
                          </div>
                        </NavLink>
                      ) : (
                        <div className="nav-link">
                          <div className="d-flex align-items-center">
                            <FontAwesomeIcon
                              icon={faCartShopping}
                              className="mr-1"
                            />
                            <span className="ml-2">{context.user.email}</span>
                            <button
                              className="button-style-second"
                              onClick={handleLogOut}
                            >
                              Log-out
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
              </>
            ) : (
              <>
                <NavLink
                  className="nav-link"
                  to="/youraccount"
                  onClick={() => context.handleYourAccount(true)}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/youraccount"
                  onClick={() => context.handleYourAccount(false)}
                >
                  Your Account
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
