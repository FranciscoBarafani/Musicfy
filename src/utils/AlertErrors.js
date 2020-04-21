import { toast } from "react-toastify";

export default function alertErrors(type) {
  switch (type) {
    case "auth/wrong-password":
      toast.warn("La contraseña no es correcta");
      break;
    case "auth/email-already-in-use":
      toast.warn("El nuevo email ya esta en uso.");
      break;
    default:
      toast.warn("Error del servidor, intentelo mas tarde");
      break;
  }
}
