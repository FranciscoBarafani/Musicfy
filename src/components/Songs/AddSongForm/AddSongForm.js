import React, { useState, useEffect, useCallback } from "react";
import "./AddSongForm.scss";
import { Form, Input, Button, Icon, Dropdown } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";
import { map } from "lodash";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const db = firebase.firestore(firebase);

export default function AddSongForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialValueForm());
  const [albums, setAlbums] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadSong = (fileName) => {
    const ref = firebase.storage().ref().child(`song/${fileName}`);
    return ref.put(file);
  };

  const resetForm = () => {
    setFormData(initialValueForm());
    setFile(null);
    setAlbums([]);
  };

  useEffect(() => {
    db.collection("album")
      .get()
      .then((response) => {
        const albumsArray = [];
        map(response?.docs, (album) => {
          const data = album.data();
          albumsArray.push({
            key: album.id,
            value: album.id,
            text: data.name,
          });
        });
        setAlbums(albumsArray);
      });
  }, []);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFile(file);
  });

  const { getInputProps, getRootProps } = useDropzone({
    accept: ".mp3",
    noKeyboard: true,
    onDrop,
  });

  const onSubmit = () => {
    if (!formData.name || !formData.album) {
      toast.warn("El nombre y el album son obligatorios.");
    } else if (!file) {
      toast.warn("La canción es obligatoria.");
    } else {
      setIsLoading(true);
      const fileName = uuidv4();
      uploadSong("prueba")
        .then((response) => {
          console.log(response);
          db.collection("songs")
            .add({
              name: formData.name,
              album: formData.album,
              fileName: fileName,
            })
            .then(() => {
              toast.success("Canción subida correctamente");
              resetForm();
              setIsLoading(false);
              setShowModal(false);
            })
            .catch(() => {
              toast.error("Error al subir la canción.");
              setIsLoading(false);
            });
        })
        .catch((response) => {
          console.log(response);
          toast.error("Error al subir la canción.");
          setIsLoading(false);
        });
    }
  };
  return (
    <Form className="add-song-form" onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Nombre de la canción"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Dropdown
          placeholder="Asigna la canción a un album"
          search
          selection
          lazyLoad
          options={albums}
          onChange={(e, data) =>
            setFormData({ ...formData, album: data.value })
          }
        />
      </Form.Field>
      <Form.Field>
        <div className="song-upload" {...getRootProps()}>
          <input {...getInputProps()} />
          <Icon name="cloud upload" className={file && "load"} />
          <div>
            <p>
              Arrastra tu canción o haz click <span>aquí.</span>
            </p>
            {file && (
              <p>
                Canción subida: <span>{file.name}</span>
              </p>
            )}
          </div>
        </div>
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Subir canción
      </Button>
    </Form>
  );
}

function initialValueForm() {
  return {
    name: "",
    album: "",
  };
}
