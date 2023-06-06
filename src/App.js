import "./App.css";
import { Element } from "react-scroll";
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

import { Switch, Route } from "react-router-dom";
import AppContextProvider from "./contexts/appContext";

function App() {
  return (
    <>
      <AppContextProvider>
        <Navigation />
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

          <Route path="/youraccount">
            <YourAccount></YourAccount>
          </Route>

          <Route path="/newcustomer">
            <NewCustomer></NewCustomer>
          </Route>

          <Route path="/details">
            <Details></Details>
          </Route>

          <Route path="/checkout">
            <CheckOut></CheckOut>
          </Route>

          <Route path="/cartdetail">
            <CartDetail />
          </Route>
        </Switch>
      </AppContextProvider>
    </>
  );
}

export default App;
