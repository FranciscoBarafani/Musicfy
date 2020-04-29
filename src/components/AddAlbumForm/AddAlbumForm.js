import React, { useState, useEffect, useCallback } from "react";
import "./AddAlbumForm.scss";
import { Form, Input, Button, Image, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import NoImage from "../../assets/png/no-image.png";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import { map } from "lodash";
import { toast } from "react-toastify";

const db = firebase.firestore(firebase);

export default function AddAlbumForm(props) {
  const { setShowModal } = props;
  const [albumImage, setAlbumImage] = useState(null);
  const [file, setFile] = useState(null);
  const [artists, setArtists] = useState([]);
  const [formData, setformData] = useState(initialValueForm());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        const arrayArtists = [];
        map(response?.docs, (artist) => {
          const data = artist.data();
          arrayArtists.push({
            key: artist.id,
            value: artist.id,
            text: data.name,
          });
        });
        setArtists(arrayArtists);
      });
  }, []);

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
    if (!formData.name || !formData.artist) {
      toast.warn("El nombre del album y el artista son obligatorios");
    } else if (!file) {
      toast.warn("La imagen del album es obligatoria");
    } else {
      console.log("creando album");
    }
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
          <Input
            placeholder="Nombre del Album"
            onChange={(e) => setformData({ ...formData, name: e.target.value })}
          />
          <Dropdown
            placeholder="El Album Pertenece..."
            search
            fluid
            selection
            options={artists}
            lazyLoad
            onChange={(e, data) =>
              setformData({ ...formData, name: data.value })
            }
          />
        </Form.Field>
      </Form.Group>
      <Button submit loading={isLoading}>
        Crear Album
      </Button>
    </Form>
  );
}

function initialValueForm() {
  return {
    name: "",
    artist: "",
  };
}
