import React, { useState, useEffect } from "react";
import "./Album.scss";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";
import { Loader } from "semantic-ui-react";

const db = firebase.firestore(firebase);

export function Album(props) {
  const { match } = props;
  const [album, setAlbum] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    db.collection("album")
      .doc(match?.params?.id)
      .get()
      .then((response) => {
        setAlbum(response.data());
      });
  }, [match]);

  useEffect(() => {
    if (album) {
      firebase
        .storage()
        .ref(`album/${album.banner}`)
        .getDownloadURL()
        .then((url) => {
          setImageUrl(url);
        });
    }
  }, [album]);

  useEffect(() => {
    if (album) {
      db.collection("artists")
        .doc(album?.artist)
        .get()
        .then((response) => {
          setArtist(response.data());
        });
    }
  }, [album]);

  if (!album || !artist) {
    return <Loader active>Cargando</Loader>;
  }

  return (
    <div className="album">
      <div className="album__header">
        <div
          className="image"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <div className="info">
          <h1>{album.name}</h1>
          <p>
            De <span>{artist.name}</span>
          </p>
        </div>
      </div>
      <div className="album__songs">
        <p>Lista de canciones...</p>
      </div>
    </div>
  );
}

//This let us get the URL parameters
export default withRouter(Album);
