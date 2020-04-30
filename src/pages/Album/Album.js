import React, { useState, useEffect } from "react";
import "./Album.scss";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

const db = firebase.firestore(firebase);

export function Album(props) {
  const { match } = props;
  const [album, setAlbum] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    db.collection("albums")
      .doc(match.params.id)
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
        .getDownloadUR()
        .then((url) => {
          setImageUrl(url);
        });
    }
  }, [album]);

  return <div className="album"></div>;
}

//This let us get the URL parameters
export default withRouter(Album);
