import React, { useState, useEffect, useCallback } from "react";
import "./AddAlbumForm.scss";
import { Form, Input, Button, Image, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import NoImage from "../../assets/png/no-image.png";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";
import { map } from "lodash";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

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

  const uploadImage = (fileName) => {
    const ref = firebase.storage().ref().child(`album/${fileName}`);
    return ref.put(file);
  };
  //
  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFile(file);
    setAlbumImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const onSubmit = () => {
    if (!formData.name || !formData.artist) {
      toast.warn("El nombre del album y el artista son obligatorios");
    } else if (!file) {
      toast.warn("La imagen del album es obligatoria");
    } else {
      setIsLoading(true);
      const fileName = uuidv4();
      uploadImage(fileName)
        .then(() => {
          db.collection("album")
            .add({
              name: formData.name,
              artist: formData.artist,
              banner: fileName,
            })
            .then(() => {
              toast.success("Album creado correctamente.");
              resetForm();
              setIsLoading(false);
              setShowModal(false);
            })
            .catch(() => {
              toast.warn("Error al crear album.");
              setIsLoading(false);
            });
        })
        .catch(() => {
          toast.warn("Error al subir imagen, intente nuevamente.");
          setIsLoading(false);
        });
    }
  };

  const resetForm = () => {
    setformData(initialValueForm());
    setFile(null);
    setAlbumImage(null);
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
              setformData({ ...formData, artist: data.value })
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
