import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ShippingReturns = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Shipping Information</h1>
          <p>
            Orders are usually shipped by registered mail with Irish Post/ DHL
            or DHL Express or a similar company. The shipping of the items
            ordered will be latest 2-3 weeks after receipt of money, but usually
            within 1-3 business days, depending on demand. Once the shipment is
            processed you will receive an email from me.
          </p>
          <h1>Customs and Import Taxes</h1>
          <p>
            Buyers are responsible for any customs and import taxes their
            country may require. I am not responsible for delays due to customs.
          </p>
          <h6>Estimated Shipping Time</h6>
          <p>
            Ireland ca 1-2 days
            <br />
            EU ca 4-14 days
            <br />
            Everywhere else ca 14-21 days
          </p>
          <h6>Easy Returns & Exchanges</h6>
          <p>
            You shall be entitled to revoke this contract within fourteen days
            without giving any reason.
            <br />
            The revocation period shall be fourteen days from the date on which
            you or a third party designated by you and who is not the carrier
            have or has taken the goods in possession.
            <br />
            In order to exercise your right of revocation, you must notify us of
            your resolution to revoke the contract, such notice to be made by
            way of an unequivocal declaration. For such purpose you may use the
            enclosed sample revocation form which is, however, not mandatory.
            Maia Tsintsadze 12 Riverston Gardens D07 Dublin
            <br />
            mail: XXXXXXXXXXXXXXXXXXXXXXXXX
            <br />
            The revocation period shall be deemed complied with if you dispatch
            the notice on the exercise of the right of revocation before
            expiration of the revocation period.
            <br />
            Consequences of Revocation
            <br />
            Should you revoke this contract, we shall repay to you all payments
            which we have received from you, including the cost of delivery
            (except additional cost resulting from your election of any other
            kind of delivery than the least expensive standard delivery offered
            by us), such repayment to be made without delay and no later than
            fourteen days from the date on which we received the notice on the
            revocation of the contract. For such repayment we shall use the same
            means of payment which you used for the original transaction, unless
            agreed to the contrary between us; you shall not be charged with any
            fees whatsoever in respect of such repayment.
            <br />
            Customer outside the EU: we will refund the cost of the item only
            and not the original delivery cost
            <br />
            We may reject repayment until we receive back the goods or until you
            provide evidence that you sent back the goods, whichever is earlier.
            <br />
            You shall return to us, whether by way of shipment or delivery in
            person, the goods without delay and in no event any later than
            fourteen days from the date on which you notified us on the
            revocation of the contract. Such aforesaid time period shall be
            deemed complied with if you dispatch the goods before expiration of
            the fourteen-days-period.
            <br />
            You shall bear the direct cost of return shipment of the goods. You
            shall be responsible for a loss in value of the goods only if such
            loss in value is due to your handling of the goods in a manner which
            is not necessary for the examination of the quality, characteristics
            and functionality of the goods.
            <br />
            The right of revocation does, among others, not exist in respect of
            contracts
            <br />
            - on the delivery of goods that are not prefabricated and for the
            manufacture of which an individual choice or designation by the
            consumer is relevant or which are clearly customized to the personal
            needs of the consumer.
            <br />
            The right of revocation shall prematurely lapse in respect of,
            amongst others, contracts:
            <br />
            - on the delivery of sealed goods which, for reasons of health
            protection or hygiene, are not suitable for return if their sealing
            has been removed after delivery - on the delivery of goods that
            were, after delivery, inseparably mixed with other goods due to
            their composition.
            <br />
            The right of revocation shall, in respect of a contract on the
            delivery of digital content on a physical data carrier, also lapse
            in the event that the entrepreneur has started to carry out the
            contract after the consumer:
            <br />
            1. had explicitly agreed to the beginning of the entrepreneur's
            carrying out of the contract before expiration of the revocation
            period 2. after the consumer had confirmed its being aware that by
            its aforesaid consent it would forfeit its right of revocation upon
            the beginning of the carrying out of the contract.
            <br />
            Sample Revocation Form
            <br />
            If you wish to revoke the contract, please fill in this form and
            send it back to us (by mail, fax or email).
            <br />
            Maia Tsintsadze
            <br />
            12 Riverston Gardens
            <br />
            D07 Dublin
            <br />
            E-Mailadresse: XXXXXXXXXXXXXXX
            <br />
            Hereby I/we (*) revoke the contract concluded by me/us (*) regarding
            the purchase of the following
            <br />
            goods (*)/ the rendering of the following service (*)
            <br />
            Ordered on (*)/received on (*) the following date:
            <br />
            Name of the consumer
            <br />
            Address of the consumer
            <br />
            Signature of the consumer (only in case of notice on paper)
            <br />
            Date
            <br />
            (*) Delete as appropriate.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingReturns;
