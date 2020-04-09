import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import "./LoginForm.scss";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/Validations";
import firebase from "../../../utils/Firebase";
import "firebase/auth";

export default function LoginForm(props) {
  const { setSelectedForm } = props;
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          setUser(response.user);
          setUserActive(response.user.emailVerified);
          if (!response.user.emailVerified) {
            toast.warn("Para poder logearte antes debes verificar la cuenta.");
          }
        })
        .catch((err) => {
          handlerError(err.code);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const showPasswordHandler = () => {
    setshowPassword(!showPassword);
  };

  return (
    <div className="login-form">
      <h1>Musica para todos</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo Electronico"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, introduce un correo electronico valido.
            </span>
          )}
          }
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            error={formError.password}
            icon={
              showPassword ? (
                <Icon name="eye" link onClick={showPasswordHandler} />
              ) : (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={showPasswordHandler}
                />
              )
            }
          />
          {formError.password && (
            <span className="error-text">
              La contraseña tiene que ser mayor a 6 caracteres
            </span>
          )}
          }
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Iniciar Sesion
        </Button>
      </Form>
      {!userActive && (
        <ButtonResetSendEmailVerification
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
        />
      )}
      <div className="login-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver </p>
        <p>
          No tienes cuenta?
          <span onClick={() => setSelectedForm("register")}>Registrate</span>
        </p>
      </div>
    </div>
  );
}

function ButtonResetSendEmailVerification(props) {
  const { user, setIsLoading, setUserActive } = props;
  const resendVerificationEmail = () => {
    user
      .sendEmailVerification()
      .then(() => {
        toast.success("Se ha enviado el mail de verificacion.");
      })
      .catch((err) => {
        handlerError(err.code);
      })
      .finally(() => {
        setIsLoading(false);
        setUserActive(true);
      });
  };
  return (
    <div className="resend-verification-email">
      <p>
        Si no has recibido el email de verificacion puedes volver a enviarlo
        haciendo click <span onClick={resendVerificationEmail}>Aqui.</span>
      </p>
    </div>
  );
}

function handlerError(code) {
  switch (code) {
    case "auth/wrong-password":
      toast.warn("El usuario o la contraseña son incorrectos.");
      break;
    case "auth/too-many-request":
      toast.warn(
        "Has enviado demasiadas solicitudes de reenvio de email de confirmacion"
      );
      break;
    case "auth/user-not-found":
      toast.warn("El usuario o la contraseña son incorrectos");
      break;
    default:
      break;
  }
}
function defaultValueForm() {
  return {
    email: "",
    password: "",
  };
}
