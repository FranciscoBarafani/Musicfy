import React from "react";
import "./SongSlider.scss";
import Slider from "react-slick";
import { size, map } from "lodash";

export default function SongSlider(props) {
  const { title, data } = props;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    sliderToShow: 5,
    slidesToScroll: 4,
    centerMode: true,
    className: "song-slider__list",
  };

  if (size(data) < 5) {
    return null;
  }

  return (
    <div className="song-slider">
      <h2>{title}</h2>
      <Slider {...settings}>
        {map(data, (item) => (
          <Song key={item.id} item={item} />
        ))}
      </Slider>
    </div>
  );
}

function Song(props) {
  const { item } = props;
  return <p>{item.name}</p>;
}
