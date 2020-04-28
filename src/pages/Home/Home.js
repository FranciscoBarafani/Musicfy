import React, { useEffect, useState } from "react";
import "./Home.scss";
import BannerHome from "../../components/BannerHome";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import { map } from "lodash";

const db = firebase.firestore(firebase);

export default function Home() {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        const arrayArtists = [];
        map(response?.docs, (artist) => {
          const data = artist.data();
          data.id = artist.id;
          arrayArtists.push(data);
        });
        setArtists(arrayArtists);
      });
  }, []);
  return (
    <>
      <BannerHome />
      <div className="home">
        <BasicSliderItems
          title="Ultimos Artistas"
          data={artists}
          folderImage="artist"
          urlName="artist"
        />
        <h1>Mas</h1>
      </div>
    </>
  );
}
