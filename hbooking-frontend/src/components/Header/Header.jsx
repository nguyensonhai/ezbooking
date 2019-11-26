import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Header.css";
import image from "./Search_001.png";
const Header = props => {
  const [mainKeyword, setMainKeyword] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleOnclick = async () => {
    if (!mainKeyword && !city) {
      setError("Phần tìm kiếm đang bỏ trống!");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      const data = await fetch("http://localhost:3001/rooms/search/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          main: mainKeyword,
          city: city
        })
      }).then(res => {
        return res.json();
      });
      props.getSearchData(data.data);
      props.history.push("/search");
    }
  };

  return (
    <div
      className='s01'
      style={{
        background: `url(${image})`,
        backgroundPosition: "center center",
        backgroundSize: "cover"
      }}
    >
      <form>
        <fieldset>
          <legend>Trải nghiệm tuyệt vời nhất</legend>
        </fieldset>
        <div className='inner-form'>
          <div className='input-field first-wrap'>
            <input
              name='main'
              onChange={event => setMainKeyword(event.target.value)}
              value={mainKeyword}
              id='search'
              type='text'
              placeholder='Khách sạn tìm kiếm?'
            />
          </div>
          <div className='input-field second-wrap'>
            <input
              name='city'
              onChange={event => setCity(event.target.value)}
              value={city}
              id='location'
              type='text'
              placeholder='Thành phố'
            />
          </div>
          <div className='input-field third-wrap'>
            <button
              onClick={handleOnclick}
              className='btn-search'
              type='button'
              style={{
                backgroundImage: "linear-gradient(-90deg, #ea4896, #fe724b)"
              }}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
        {error ? (
          <div className='p-3 mb-2 bg-danger text-white'>{error}</div>
        ) : null}
      </form>
    </div>
  );
};

export default Header;
