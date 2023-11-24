import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

import { getConfig } from "../utils/config";

export const appContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loggedUser, setLoggedUser] = useState(false);
  const [cart, setCart] = useState([]);
  const [yourAccount, setYourAccount] = useState(false);

  const [checkLoggedFinished, setCheckLoggedFinished] = useState(false);

  const [checkFooter, setCheckFooter] = useState("");

  const history = useHistory();

  const handleCheckLoggedFinished = (finished) => {
    setCheckLoggedFinished(finished);
  };

  const handleCheckFooter = (data) => {
    setCheckFooter(data);
  };

  const changeUser = (loggedUser) => {
    setUser(loggedUser);
  };

  const loginUser = (cart) => {
    setLoggedUser(cart);
  };

  const totalAmount = () => {
    let total = 0;

    cart.forEach((cartItem) => (total += cartItem.price));

    return total;
  };

  const getInfo = async () => {
    if (user.email && user.userId) {
      const url = `${getConfig().URL_BASE_BACKEND}/cart/${user.userId}`;

      const response = await fetch(url, {
        method: "get",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const cart = await response.json();

      setCart(cart);
    }
  };

  const checkPictureSelected = (idObraArteBuscada) => {
    const obraArteEncontrada = cart.find((item) => {
      return item.id_obra_arte === parseInt(idObraArteBuscada);
    });

    if (obraArteEncontrada) {
      return true;
    } else {
      return false;
    }
  };

  const handleDelete = async (info) => {
    const url = `${getConfig().URL_BASE_BACKEND}/cart/${info.id_obra_arte}/${
      info.id_usuario
    }`;

    const response = await fetch(url, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const dataJson = await response.json();

    getInfo();

    Swal.fire({
      icon: "success",

      text: "Product was removed",
    });
  };

  const handleYourAccount = (param) => {
    setYourAccount(param);
  };

  useEffect(() => {
    getInfo();

    if (localStorage.getItem("picturedSelected")) {
      const productToAdd = JSON.parse(localStorage.getItem("picturedSelected"));

      handleAddToCart(productToAdd.picture, "login");
      checkPictureSelected(productToAdd.picture);
      localStorage.removeItem("picturedSelected");
      getInfo();
    }
  }, [user]);

  const handleAddToCart = async (picture, from) => {
    if (loggedUser === true) {
      const url = `${getConfig().URL_BASE_BACKEND}/cart/add_to_cart`;

      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify({
          picture: picture,
          userId: user.userId,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      getInfo();

      if (from === "login") {
        history.push("/");
      } else {
        history.push("/portfolio");
      }

      Swal.fire({
        text: "The product was added",
        icon: "success",
      });
    } else {
      localStorage.setItem(
        "picturedSelected",
        JSON.stringify({
          picture: picture,
        })
      );
      handleYourAccount(true);

      history.push("/youraccount");
    }
  };

  return (
    <appContext.Provider
      value={{
        user,
        changeUser,
        loggedUser,
        loginUser,
        setCart,
        cart,
        getInfo,
        checkPictureSelected,
        handleDelete,
        handleYourAccount,
        yourAccount,
        handleAddToCart,
        totalAmount,
        handleCheckLoggedFinished,
        checkLoggedFinished,
        handleCheckFooter,
        checkFooter,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
