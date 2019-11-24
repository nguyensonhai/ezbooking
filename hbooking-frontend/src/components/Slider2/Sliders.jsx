import React, { useState } from "react";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import "./ArrowStyle.css";

const Sliders = (props) => {
  console.log(props.data);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  };

  const [toggler, setToggler] = useState(false);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1
  });

  const openLightboxOnSlide = (number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number
    });
    console.log(lightboxController);
  }
  return (
    <div className='container'>
      <Slider {...settings} >
        {props.data ? (
          props.data.map((value, index) => {
            return (
              <div key={index}>
                <img src={`http://localhost:3001${value}`} style={{ width: '100%' }} ></img>
              </div>
            )
          })
        ) : (null)}
      </Slider>
    </div>
  );
};

export default Sliders;
