import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import "./ArrowStyle.css";
const Sliders = props => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  };

  const formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const ellipsisStyle = {
    height: "65px",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };
  const ellipsisStyle2 = {
    height: "55px",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  if (props.type === "card") {
    return (
      <div className='container slider-card'>
        <Slider {...settings}>
          {props.data
            ? props.data.map((item, index) => {
                const imageUrl = `url(http://localhost:3001${item.image[0]})`;
                return (
                  <div
                    key={index}
                    className='card booking-card'
                    style={{ border: "none" }}
                  >
                    {/* Card image */}
                    <div className='view overlay'>
                      <div
                        className='card-img-top'
                        alt='Card image cap'
                        style={{
                          background: `${imageUrl}`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                          backgroundRepeat: "none",
                          width: "100%",
                          height: "230px"
                        }}
                      ></div>
                      <a href='#!'>
                        <div className='mask rgba-white-slight' />
                      </a>
                    </div>
                    {/* Card content */}
                    <div style={{ border: "none" }} className='card-body'>
                      {/* Title */}
                      <h4
                        style={ellipsisStyle2}
                        className='card-title font-weight-bold'
                      >
                        <i
                          style={{
                            fontSize: "13px",
                            color: "rgb(255, 176, 37)"
                          }}
                          className='fas fa-bolt'
                        ></i>{" "}
                        <a href={`/room/${item._id}`}>{item.title} ...</a>
                      </h4>

                      {/* District */}
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#868686"
                        }}
                        className='card-text'
                      >
                        Thành phố {item.address}
                      </p>

                      <p
                        style={{ fontSize: "13px", color: "#868686" }}
                        className='mb-2'
                      >
                        <b>{formatNumber(item.price)}</b> VND/đêm
                      </p>

                      <hr className='my-4' />
                      {/* Text */}
                      {/* Data */}
                      <ul
                        style={{ fontSize: "13px" }}
                        className='list-unstyled list-inline rating mb-0'
                      >
                        <li className='list-inline-item mr-0'>
                          <i className='fas fa-star amber-text'> </i>
                        </li>
                        <li className='list-inline-item mr-0'>
                          <i className='fas fa-star amber-text'> </i>
                        </li>
                        <li className='list-inline-item mr-0'>
                          <i className='fas fa-star amber-text'> </i>
                        </li>
                        <li className='list-inline-item mr-0'>
                          <i className='fas fa-star amber-text'> </i>
                        </li>
                        <li className='list-inline-item mr-0'>
                          <i className='fas fa-star amber-text'> </i>
                        </li>
                        <li
                          style={{ color: "black", fontWeight: "500" }}
                          className='list-inline-item'
                        >
                          <p>4.5 (413)</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })
            : null}
        </Slider>
      </div>
    );
  } else {
    return (
      <div className='container'>
        <Slider {...settings}>
          {props.data
            ? props.data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='no-padding lib-item'
                    data-category='view'
                  >
                    <div className='lib-panel'>
                      <div className='row box-shadow'>
                        <div className='col-6'>
                          <img
                            style={{ width: "100%", height: "100px" }}
                            className='lib-img-show'
                            src={require(`./images/${index}.png`)}
                          />
                        </div>
                        <div
                          className='col-6'
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                            className='lib-row lib-desc'
                          >
                            <Link
                              content={item}
                              to={{
                                pathname: "/search",
                                state: {
                                  content: { item }
                                }
                              }}
                            >
                              {item}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </Slider>
      </div>
    );
  }
};

export default Sliders;
