import React from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import "./RegisterForm.scss";
import firebase from "../../../utils/Firebase";
import "firebase/auth";

import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setSelectedForm } = props;

  function onSubmit() {
    console.log("Skere");
  }

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis.</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo Electrónico"
            icon="mail outline"
            //onChange={}
            //error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            icon="eye"
            //onChange={}
            //error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="Como deberiamos llamarte?"
            icon="user circle outline"
            //onChange={}
            //error={}
          />
        </Form.Field>
        <Button type="submit">Continuar</Button>
      </Form>
      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          Ya tienes Musicfy?
          <span onClick={() => setSelectedForm("login")}>Iniciar Sesion</span>
        </p>
      </div>
    </div>
  );
}
