import React, { useState } from "react";

import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/common";

const CookieBanner = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(
    localStorage.getItem("cookiesAccepted") === "true"
  );

  const handleAcceptCookies = () => {
    setAcceptedCookies(true);
    localStorage.setItem("cookiesAccepted", "true");
  };

  if (acceptedCookies) {
    return null; // No mostrar el banner si las cookies ya fueron aceptadas
  }

  return (
    <div className="cookie-banner-container">
      <h6>Use of Cookies. </h6>
      <p>
        We use cookies to provide the services and features offered on our
        website, and to improve our user experience. Please note that if you
        delete or disable our cookies you may experience interruptions or
        limited functionality in certain areas of the website.
      </p>
      <p>
        <Link to="/terms-privacy" onClick={scrollToTop}>
          Terms of Service
        </Link>
      </p>
      <div>
        <button onClick={handleAcceptCookies}>Accept Cookies</button>
      </div>
    </div>
  );
};

export default CookieBanner;
