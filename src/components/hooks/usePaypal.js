import { getConfig } from "../../utils/config";

export default function usePaypal() {
  const createOrder = async () => {
    console.log("Creando orden de Paypal...");

    try {
      fetch(`${getConfig().URL_BASE_BACKEND}/paypal/createorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("PAYPAL DATA", data);

          return data.id;
        });
    } catch (error) {
      console.error("Error al crear la orden de pago", error);
    }
  };

  const onApprove = (data) => {
    console.log("Aprobado...", data);
  };

  return { createOrder, onApprove };
}
