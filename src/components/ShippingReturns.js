import React, { useState, useEffect, useContext } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { appContext } from "../contexts/appContext";

const ShippingReturns = () => {
  const context = useContext(appContext);

  /*   useEffect(() => {
    context.handleCheckFooter(true);
  }, []); */

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="my-5">Shipping & Returns</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <h5 className="text-left mb-4">Shipping Information</h5>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <div style={{ maxWidth: "100%" }}>
            <p className="text-left mb-4">
              Orders are usually shipped by registered mail with Irish Post/ DHL
              or DHL Express or a similar company. The shipping of the items
              ordered will be latest 2-3 weeks after receipt of money, but
              usually within 1-3 business days, depending on demand. Once the
              shipment is processed you will receive an email from me.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <h5 className="text-left mb-4">Customs and Import Taxes</h5>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <div style={{ maxWidth: "100%" }}>
            <p className="text-left mb-4">
              Buyers are responsible for any customs and import taxes their
              country may require. I am not responsible for delays due to
              customs.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <h5 className="text-left mb-4">Estimated Shipping Time</h5>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <div style={{ maxWidth: "40%" }}>
            <p className="text-left mb-4">Ireland ca 1-2 days</p>
            <p className="text-left mb-4">EU ca 4-14 days</p>
            <p className="text-left mb-4">Everywhere else ca 14-21 days</p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <h5 className="text-left mb-4">Easy Returns & Exchanges</h5>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <div style={{ maxWidth: "100%" }}>
            <p className="text-left mb-4">
              You shall be entitled to revoke this contract within fourteen days
              without giving any reason.
            </p>
            <p>
              The revocation period shall be fourteen days from the date on
              which you or a third party designated by you and who is not the
              carrier have or has taken the goods in possession.
            </p>
            <p>
              In order to exercise your right of revocation, you must notify us
              of your resolution to revoke the contract, such notice to be made
              by way of an unequivocal declaration. For such purpose you may use
              the enclosed sample revocation form which is, however, not
              mandatory.
            </p>
            <p>Maia Tsintsadze</p>

            <p>mail: info@maiatsintsadzeart.com</p>
            <p>
              The revocation period shall be deemed complied with if you
              dispatch the notice on the exercise of the right of revocation
              before expiration of the revocation period.
            </p>

            <h6>Consequences of Revocation</h6>
            <p>
              Should you revoke this contract, we shall repay to you all
              payments which we have received from you, including the cost of
              delivery (except additional cost resulting from your election of
              any other kind of delivery than the least expensive standard
              delivery offered by us), such repayment to be made without delay
              and no later than fourteen days from the date on which we received
              the notice on the revocation of the contract. For such repayment
              we shall use the same means of payment which you used for the
              original transaction, unless agreed to the contrary between us;
              you shall not be charged with any fees whatsoever in respect of
              such repayment.
            </p>

            <h6>Customer outside the EU:</h6>
            <p>
              We will refund the cost of the item only and not the original
              delivery cost.
            </p>
            <p>
              We may reject repayment until we receive back the goods or until
              you provide evidence that you sent back the goods, whichever is
              earlier.
            </p>
            <p>
              You shall return to us, whether by way of shipment or delivery in
              person, the goods without delay and in no event any later than
              fourteen days from the date on which you notified us on the
              revocation of the contract. Such aforesaid time period shall be
              deemed complied with if you dispatch the goods before expiration
              of the fourteen-days-period.
            </p>
            <p>
              You shall bear the direct cost of return shipment of the goods.
            </p>
            <p>
              You shall be responsible for a loss in value of the goods only if
              such loss in value is due to your handling of the goods in a
              manner which is not necessary for the examination of the quality,
              characteristics and functionality of the goods.
            </p>
            <p>
              The right of revocation does, among others, not exist in respect
              of contracts
            </p>
            <p>
              - on the delivery of goods that are not prefabricated and for the
              manufacture of which an individual choice or designation by the
              consumer is relevant or which are clearly customized to the
              personal needs of the consumer.
            </p>
            <p>
              The right of revocation shall prematurely lapse in respect of,
              amongst others, contracts:
            </p>
            <p>
              - on the delivery of sealed goods which, for reasons of health
              protection or hygiene, are not suitable for return if their
              sealing has been removed after delivery
            </p>
            <p>
              - on the delivery of goods that were, after delivery, inseparably
              mixed with other goods due to their composition. The right of
              revocation shall, in respect of a contract on the delivery of
              digital content on a physical data carrier, also lapse in the
              event that the entrepreneur has started to carry out the contract
              after the consumer:
            </p>
            <p>
              1. had explicitly agreed to the beginning of the entrepreneur's
              carrying out of the contract before expiration of the revocation
              period
            </p>
            <p>
              2. after the consumer had confirmed its being aware that by its
              aforesaid consent it would forfeit its right of revocation upon
              the beginning of the carrying out of the contract.
            </p>

            <h6>Sample Revocation Form</h6>
            <p>
              If you wish to revoke the contract, please fill in this form and
              send it back to us (by mail, fax or email).
            </p>
            <p>Maia Tsintsadze</p>

            <p>E-Mailadress: info@maiatsintsadzeart.com</p>
            <p>
              Hereby I/we (*) revoke the contract concluded by me/us (*)
              regarding the purchase of the following goods (*)/ the rendering
              of the following service (*)
            </p>
            <p>Ordered on (*)/received on (*) the following date:</p>
            <p>Name of the consumer</p>
            <p>Address of the consumer</p>
            <p>Signature of the consumer (only in case of notice on paper)</p>
            <p>Date </p>
            <p>(*) Delete as appropriate.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingReturns;
