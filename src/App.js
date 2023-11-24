import "./App.css";

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Portfolio from "./components/Portfolio";
import Biography from "./components/Biography";
import Contact from "./components/Contact";
import YourAccount from "./components/YourAccount";
import NewCustomer from "./components/NewCustomer";
import Details from "./components/Details";
import CheckOut from "./components/CheckOut";
import CartDetail from "./components/CartDetail";
import ForgotPassword from "./components/ForgotPassword";
import Footer from "./components/Footer";
import TermsPrivacy from "./components/TermsPrivacy";
import ShippingReturns from "./components/ShippingReturns";
import CookieBanner from "./components/CookieBanner";

import { Switch, Route } from "react-router-dom";
import AppContextProvider from "./contexts/appContext";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import ResetPassword from "./components/ResetPassword";
import EmailSent from "./components/EmailSent";
import EmailValidationSuccess from "./components/EmailValidationSuccess";

function App() {
  return (
    <>
      <AppContextProvider>
        <Navigation />

        <CookieBanner path="/terms-privacy" />

        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route path="/biography">
            <Biography></Biography>
          </Route>

          <Route path="/portfolio">
            <Portfolio></Portfolio>
          </Route>

          <Route path="/contact">
            <Contact></Contact>
          </Route>

          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>

          <Route path="/newcustomer">
            <NewCustomer></NewCustomer>
          </Route>

          <Route path="/details/:id" component={Details} />

          <Route path="/checkout">
            <CheckOut />
          </Route>

          <Route path="/cartdetail">
            <CartDetail />
          </Route>

          <Route path="/youraccount">
            <YourAccount></YourAccount>
          </Route>

          <Route path="/terms-privacy">
            <TermsPrivacy></TermsPrivacy>
          </Route>

          <Route path="/shipping-returns">
            <ShippingReturns></ShippingReturns>
          </Route>

          <Route path="/purchase-success">
            <PurchaseSuccess />
          </Route>

          <Route path="/reset-password">
            <ResetPassword />
          </Route>

          <Route path="/email-sent">
            <EmailSent />
          </Route>

          <Route path="/email-confirmation-success">
            <EmailValidationSuccess />
          </Route>
        </Switch>

        <Footer></Footer>
      </AppContextProvider>
    </>
  );
}

export default App;
