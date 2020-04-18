import React from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export default function UserName(props) {
  const { user, setShowModal, setContentModal, setTitleModal } = props;

  const onEdit = () => {
    setTitleModal("Actualizar E-mail");
    setContentModal(<h3>Formulario de Actualizar</h3>);
    setShowModal(true);
  };
  return (
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}
