import React, { useState, useEffect } from "react";
import "./BasicSliderItems.scss";
import Slider from "react-slick";
import { map } from "lodash";
import firebase from "../../../utils/Firebase";
import "firebase/storage";

export default function BasicSliderItems(props) {
  const { data, title } = props;
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    className: "basic-slider-items__list",
  };

  return (
    <div className="basic-slider-items">
      <h2>{title}</h2>
      <Slider {...settings}>
        {map(data, (item) => (
          <RenderItem key={item.id} item={item} />
        ))}
      </Slider>
    </div>
  );
}

function RenderItem(props) {
  const { item } = props;
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`artist/${item.banner}`)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      });
  }, [item]);

  return (
    <div className="basic-slider-items__list-item">
      <div
        className="avatar"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      <h3>{item.name}</h3>
    </div>
  );
}
