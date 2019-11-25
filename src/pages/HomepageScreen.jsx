import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Sliders from "../components/Sliders/Sliders";
import "./HomepageScreen.css";
const HomepageScreen = props => {
  const [topPriceData, setTopPriceData] = useState("");
  const [latestData, setLatestData] = useState("");
  const [cityData, setCityData] = useState([
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Lạt",
    "Đà Nẵng"
  ]);

  useEffect(() => {
    getCheapestData();
    getLatestData();
    // eslint-disable-next-line
  }, []);

  const getCheapestData = async () => {
    const data = await fetch("http://localhost:3001/rooms/get-cheapest/", {
      method: "GET",
      credentials: "include"
    }).then(res => {
      return res.json();
    });
    setTopPriceData(data.data);
  };

  const getLatestData = async () => {
    const data = await fetch("http://localhost:3001/rooms/get-latest/", {
      method: "GET",
      credentials: "include"
    }).then(res => {
      return res.json();
    });
    setLatestData(data.data);
  };

  return (
    <div>
      <Header
        history={props.history}
        getSearchData={props.getSearchData}
      ></Header>
      <div className='container section section-cheapest'>
        <div className='row'>
          <p
            style={{
              textAlign: "center",
              fontSize: "30px",
              margin: "auto",
              fontWeight: "bold"
            }}
          >
            Địa điểm nổi bật
          </p>
        </div>
        <div className='row'>
          <p className='slash'></p>
        </div>
      </div>
      <Sliders type='city' data={cityData}></Sliders>
      <div className='container section section-cheapest'>
        <div className='row'>
          <p
            style={{
              textAlign: "center",
              fontSize: "30px",
              margin: "auto",
              fontWeight: "bold"
            }}
          >
            Giá Tốt Nhất Vùng &mdash; Ở Cùng H-Booking
          </p>
        </div>
        <div className='row'>
          <p className='slash'></p>
        </div>
      </div>
      <Sliders type='card' data={topPriceData}></Sliders>
      <div className='container section section-latest'>
        <div className='row'>
          <p
            style={{
              textAlign: "center",
              fontSize: "30px",
              margin: "auto",
              fontWeight: "bold"
            }}
          >
            Deal mới mỗi ngày
          </p>
        </div>
        <div className='row'>
          <p className='slash'></p>
        </div>
      </div>
      <Sliders type='card' data={latestData}></Sliders>
    </div>
  );
};

export default HomepageScreen;
