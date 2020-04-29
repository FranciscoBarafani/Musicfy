import React, { useState, useEffect, useCallback } from "react";
import "./AddAlbumForm.scss";
import { Form, Input, Button, Image, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import NoImage from "../../assets/png/no-image.png";

export default function AddAlbumForm(props) {
  const { setShowModal } = props;
  const [albumImage, setAlbumImage] = useState(null);
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setAlbumImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const onSubmit = () => {
    console.log("Enviadno Formulario");
  };

  return (
    <Form className="add-album-form" onSubmit={onSubmit}>
      <Form.Group>
        <Form.Field className="album-avatar" width={5}>
          <div
            {...getRootProps()}
            className="avatar"
            style={{ backgroundImage: `url('${albumImage}')` }}
          />
          <input {...getInputProps()} />
          {!albumImage && <Image src={NoImage} />}
        </Form.Field>
        <Form.Field className="album-inputs" width={11}>
          <Input placeholder="Nombre del Album" />
          <Dropdown
            placeholder="El Album Pertenece..."
            search
            fluid
            selection
            options={[]}
          />
        </Form.Field>
      </Form.Group>
      <Button submit>Crear Album</Button>
    </Form>
  );
}
