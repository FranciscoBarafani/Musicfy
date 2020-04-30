import React, { useState, useEffect } from "react";
import "./Artist.scss";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import BannerArtist from "../../components/Artists/BannerArtist";
import "firebase/firestore";
import { map } from "lodash";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems";

const db = firebase.firestore(firebase);

export function Artist(props) {
  const { match } = props;
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    db.collection("artists")
      .doc(match?.params?.id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setArtist(data);
      })
      .catch(() => console.log("Error"));
  }, [match]);

  useEffect(() => {
    if (artist) {
      db.collection("albums")
        .where("artist", "==", artist.id)
        .get()
        .then((response) => {
          const arrayAlbums = [];
          map(response?.docs, (album) => {
            const data = response.data();
            data.id = response.id;
            arrayAlbums.push(data);
          });
          setAlbums(arrayAlbums);
        });
    }
  }, []);

  return (
    <div className="artist">
      {artist && <BannerArtist artist={artist} />}
      <div className="artist__content">
        <BasicSliderItems
          title="Albumes"
          data={albums}
          folderImage="album"
          urlName="album"
        />
      </div>
    </div>
  );
}

export default withRouter(Artist);
