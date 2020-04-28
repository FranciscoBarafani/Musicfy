import React, { useState, useEffect } from "react";
import "./Artist.scss";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import BannerArtist from "../../components/Artists/BannerArtist";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export function Artist(props) {
  const { match } = props;
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    db.collection("artists")
      .doc(match?.params?.id)
      .get()
      .then((response) => {
        setArtist(response.data());
      })
      .catch(() => console.log("Error"));
  }, [match]);
  return (
    <div className="artist">
      {artist && <BannerArtist artist={artist} />}
      <h2>Mas información...</h2>
    </div>
  );
}

export default withRouter(Artist);
