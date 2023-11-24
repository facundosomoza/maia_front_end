import Swal from "sweetalert2";
import { getConfig } from "../../utils/config";

export default function usePaypal() {
  const createOrder = async () => {
    try {
      fetch(`${getConfig().URL_BASE_BACKEND}/paypal/createorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          return data.id;
        });
    } catch (error) {
      Swal.fire({ text: "Payment order failed", icon: "error" });
    }
  };

  const onApprove = (data) => {
    console.log("Aprobado...", data);
  };

  return { createOrder, onApprove };
}
