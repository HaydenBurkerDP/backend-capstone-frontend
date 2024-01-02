import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";

toast.configure();

export const successfulToast = (message) => {
  toast.success(message, {
    hideProgressBar: true,
    autoClose: 3000,
  });
};
