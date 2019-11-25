import React, { Component } from "react";
import { DatePicker, message } from "antd";
import moment from "moment";
import Sliders from "../../components/Slider2/Sliders";
import BookDetailScreen from "../BookDetail/BookDetailScreen";
import "./detailPost.css";

class DetailPostScreen extends Component {
  state = {
    from: "",
    to: "",
    dateNumber: 0,
    price: 0,
    rooms: {},
    option: {},
    image: []
  };

  onChange = dateStrings => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const from_ms = Date.parse(dateStrings[0]);
    const to_ms = Date.parse(dateStrings[1]);
    const difference_ms = Math.abs(from_ms - to_ms);
    this.setState({
      dateNumber: Math.round(difference_ms / ONE_DAY)
    });
  };

  async componentDidMount() {
    const pathName = window.location.pathname.split("/");
    const id = pathName[pathName.length - 1];

    console.log(id);
    //fetch
    try {
      const data = await fetch(`http://localhost:3001/rooms/${id}`, {
        method: "GET",
        credentials: "include"
      }).then(res => {
        return res.json();
      });
      this.setState(
        {
          rooms: data.data,
          option: data.data.option,
          image: data.data.image
        },
        () => {
          console.log(this.state.image);
        }
      );
    } catch (error) {
      window.alert(error.message);
    }
  }

  handleOnclick = event => {
    const pathName = window.location.pathname.split("/");
    const id = pathName[pathName.length - 1];
    window.location.href = `/room/detail/${id}`;
  };

  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  render() {
    return (
      <div>
        <div>
          {this.state.image ? <Sliders data={this.state.image} /> : null}
        </div>
        <div className='room-description container'>
          <div className='room-detail'>
            <h3 style={{ fontWeight: "bold", marginTop: "20px" }}>
              {this.state.rooms.title}
            </h3>
            <div>
              <img src={require("./image/location.png")}></img> :{" "}
              <span style={{ fontWeight: "bold" }}>
                {this.state.rooms.address}
              </span>
            </div>
            <div style={{ marginTop: "15px", marginBottom: "15px" }}>
              <img src={require("./image/bed.png")}></img> :{" "}
              <span style={{ fontWeight: "bold" }}>
                {this.state.rooms.type}
              </span>
            </div>
            <div className='detail-description'>
              <p>{this.state.rooms.description}</p>
            </div>
            <div>
              <h3 style={{ fontWeight: "bold" }}>Tiện nghi chỗ ở</h3>
            </div>
            <div className='option-container'>
              <div className='option'>
                {this.state.option.kitchen ? (
                  <div className='kitchen space'>
                    <img src={require("./image/cooking.png")}></img>{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      Kitchen
                    </span>
                  </div>
                ) : null}
                {this.state.option.internet ? (
                  <div className='internet space'>
                    <img src={require("./image/wifi.png")}></img>{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      Internet
                    </span>
                  </div>
                ) : null}
                {this.state.option.microwave ? (
                  <div className='microwave space'>
                    <img src={require("./image/microwave.png")}></img>{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      Microwave
                    </span>
                  </div>
                ) : null}
                {this.state.option.pool ? (
                  <div className='pool space'>
                    <img src={require("./image/pool.png")}></img>{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      Pool
                    </span>
                  </div>
                ) : null}
              </div>
              <div className='option'>
                {this.state.option.tv ? (
                  <div className='televison space'>
                    <img src={require("./image/television.png")}></img>{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      Television
                    </span>
                  </div>
                ) : null}
                {this.state.option.fridge ? (
                  <div className='fridge space'>
                    <img src={require("./image/fridge.png")}></img>{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      Fridge
                    </span>
                  </div>
                ) : null}
                {this.state.option.bathroom ? (
                  <div className='bathroom space'>
                    <img src={require("./image/bathtub.png")}></img>{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      Bathroom
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className='book-detail' style={{ marginTop: "20px" }}>
            <h4>{this.state.rooms.title}</h4>
            <h3 id='price'>
              {this.formatNumber(Number(this.state.rooms.price))}đ/
              <span style={{ fontSize: "17px", color: "black" }}>đêm</span>
            </h3>
            <button
              className='FormField__Button mr-20'
              style={{ marginTop: "20px", fontSize: "16px" }}
              onClick={this.handleOnclick}
            >
              ĐẶT NGAY
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailPostScreen;
