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

  const history = useHistory();

  useEffect(() => {
    console.log("Cambio yourAccount", yourAccount);
  }, [yourAccount]);

  const changeUser = (loggedUser) => {
    console.log(loggedUser);
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
    //CONTINUE

    console.log(user);
    if (user.email && user.userId) {
      console.log("antes");
      const url = `${getConfig().URL_BASE_BACKEND}/cart/${user.userId}`;
      console.log("despues");
      const response = await fetch(url, {
        method: "get",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const cart = await response.json();

      console.log("Ya traje el carrito");

      setCart(cart);
    }
  };

  const checkPictureSelected = (idObraArteBuscada) => {
    const obraArteEncontrada = cart.find((item) => {
      if (item.id_obra_arte === idObraArteBuscada) {
        return true;
      } else {
        return false;
      }
    });

    if (obraArteEncontrada) {
      return true;
    } else {
      return false;
    }
  };

  if (checkPictureSelected(23)) {
    console.log("La obra ya esta en el carrito");
  } else {
    console.log("La obra NO esta en el carrito");
  }

  const handleDelete = async (info) => {
    console.log("INFO...", info);
    const url = `${getConfig().URL_BASE_BACKEND}/cart/${info.id_obra_arte}/${
      info.id_usuario
    }`;

    const response = await fetch(url, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const dataJson = await response.json();
    console.log("llamando a get info...");
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

    console.log(
      "Ir a verificar si hay producto en localstorage",
      user,
      loggedUser
    );
    if (localStorage.getItem("picturedSelected")) {
      const productToAdd = JSON.parse(localStorage.getItem("picturedSelected"));

      console.log({ productToAdd });

      handleAddToCart(productToAdd.picture, "login");
      checkPictureSelected(productToAdd.picture);
      localStorage.removeItem("picturedSelected");
      getInfo();

      // history.push("/");
    } else {
      console.log("No tengo nada para agregar");
    }
  }, [user]);

  const handleAddToCart = async (picture, from) => {
    console.log("llamando probando", loggedUser);

    if (loggedUser === true) {
      console.log("true");
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

      console.log(response);

      getInfo();

      if (from === "login") {
        history.push("/");
      } else {
        history.push("/portfolio");
      }

      Swal.fire({
        title: "The product was added",

        icon: "success",
      });
    } else {
      console.log("false");
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
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
