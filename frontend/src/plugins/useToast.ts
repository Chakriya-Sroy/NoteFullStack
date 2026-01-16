import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

export const customToastPlugin = () => {
  const toast = useToast();

  const success = (message: string) => {
    toast.success(message, { position: "top-right" });
  };

  const error = (message: string) => {
    toast.error(message, { position: "top-right" });
  };

  const info = (message: string) => {
    toast.info(message, { position: "top-right" });
  };

  const warning = (message: string) => {
    toast.warning(message, { position: "top-right" });
  };

  return { success, error, info, warning };
};
