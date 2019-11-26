import React, { useState, useEffect } from "react";

const SearchScreen = props => {
  console.log(props.location.state);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.location.state) {
      fetch("http://localhost:3001/rooms/search/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          main: "",
          city: props.location.state.content.item
        })
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setData(data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    // eslint-disable-next-line
    if (props.data) {
      setData(props.data);
    }
  }, []);
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
  return (
    <div className='container section'>
      <div className='row'>
        <p
          style={{
            textAlign: "center",
            fontSize: "30px",
            margin: "auto",
            fontWeight: "bold"
          }}
        >
          Kết quả tìm kiếm
        </p>
      </div>
      <div className='row'>
        <p className='slash'></p>
      </div>
      <div className='row'>
        {data
          ? data.map((item, index) => {
              const imageUrl = `url(http://localhost:3001${item.image[0]})`;
              return (
                <div className='col-sm-6 col-md-4 col-lg-3'>
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
                        <a href={`room/${item._id}`}>{item.title} ...</a>
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
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SearchScreen;
