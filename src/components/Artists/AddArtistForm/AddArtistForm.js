import React, { useState, useCallback } from "react";
import "./AddArtistForm.scss";
import { Form, Input, Button, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import NoImage from "../../../assets/png/no-image.png";

export default function AddArtistForm(props) {
  const { setShowModal } = props;
  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFile) => {
    console.log(acceptedFile);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpg,image/png",
    noKeyboard: true,
    onDrop,
  });

  const onSubmit = () => {
    setShowModal(false);
  };
  return (
    <Form className="add-artist-form" onSubmit={onSubmit}>
      <Form.Field className="artist-banner">
        <div {...getRootProps()} className="banner" />
        <input {...getInputProps()} />
      </Form.Field>
      <Form.Field className="artist-avatar">
        <div>Avatar</div>
      </Form.Field>
      <Form.Field>
        <Input placeholder="Nombre del artista" />
      </Form.Field>
      <Button type="submit">Crear artista</Button>
    </Form>
  );
}
