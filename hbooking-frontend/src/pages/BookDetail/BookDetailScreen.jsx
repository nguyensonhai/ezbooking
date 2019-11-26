import React, { Component } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import "./bookDetail.css";
import swal from "sweetalert";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
class BookDetailScreen extends Component {
  state = {
    from: "",
    to: "",
    dateNumber: 0,
    price: 0,
    rooms: {},
    email: "",
    fullName: "",
    identityCard: "",
    phoneNumber: "",
    address: "",
    note: "",
    errorMessage: "",
    currentUser: "",
    userInfo: ""
  };

  hanleElementChange = (element, value) => {
    this.setState({
      [element]: value
    });
  };

  onChange = dateStrings => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const from_ms = Date.parse(dateStrings[0]);
    const to_ms = Date.parse(dateStrings[1]);
    const difference_ms = Math.abs(from_ms - to_ms);
    this.setState({
      dateNumber: Math.round(difference_ms / ONE_DAY),
      from: dateStrings[0],
      to: dateStrings[1],
      price: Math.round(difference_ms / ONE_DAY) * this.state.rooms.price
    });
  };

  async componentDidMount() {
    const pathName = window.location.pathname.split("/");
    const id = pathName[pathName.length - 1];
    const currentUser = window.localStorage.getItem("email");
    this.setState({
      currentUser: currentUser
    });
    //fetch
    const roomInfo = await fetch(`http://localhost:3001/rooms/${id}`, {
      method: "GET",
      credentials: "include"
    }).then(res => {
      return res.json();
    });
    if (roomInfo) {
      this.setState({
        rooms: roomInfo.data,
        option: roomInfo.data.option
      });
    }

    // get user infor
    const userInfo = await fetch(`http://localhost:3001/users/${currentUser}`, {
      method: "GET",
      credentials: "include"
    }).then(res => {
      return res.json();
    });
    if (userInfo) {
      this.setState({
        userInfo: userInfo.data
      });
    }
  }
  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  handleSubmit = async event => {
    event.preventDefault();

    //validate
    this.setState({
      price: this.state.rooms.price * this.state.dateNumber
    });
    console.log(this.state.price);
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!this.state.currentUser) {
      if (!emailRegex.test(this.state.email)) {
        this.setState({
          errorMessage: "Email is not valid"
        });
      } else {
        this.setState({
          errorMessage: ""
        });
        try {
          //save customer infor
          const data = await fetch(
            "http://localhost:3001/customer/save-infor",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              credentials: "include",
              body: JSON.stringify({
                email: this.state.email,
                fullName: this.state.fullName,
                identityCard: this.state.identityCard,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                room: this.state.rooms
              })
            }
          ).then(response => {
            return response.json();
          });
          console.log(data);
          if (!data.success) {
            this.setState({
              errorMessage: data.message
            });
          } else {
            swal(
              "Đặt phòng thành công",
              "Mời bạn kiểm tra hòm thư",
              "success"
            ).then(value => {
              window.location.href = `/`;
            });
          }
        } catch (err) {
          this.setState({
            errorMessage: err.message
          });
        }

        //save to booking
        try {
          const booking = await fetch(
            "http://localhost:3001/booking/save-order",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              credentials: "include",
              body: JSON.stringify({
                email: this.state.userInfo.email,
                fullName: this.state.userInfo.fullName,
                phoneNumber: this.state.userInfo.phoneNumber,
                price: this.state.price,
                bookDate: {
                  from: this.state.from,
                  to: this.state.to
                },
                room: this.state.rooms
              })
            }
          ).then(res => {
            return res.json();
          });
          if (!booking.success) {
            this.setState({
              errorMessage: booking.message
            });
          } else {
            swal(
              "Đặt phòng thành công",
              "Mời bạn kiểm tra hòm thư",
              "success"
            ).then(value => {
              window.location.href = `/`;
            });
          }
        } catch (error) {
          this.setState({
            errorMessage: error.message
          });
        }
      }
    } else {
      //save to booking
      try {
        const booking = await fetch(
          "http://localhost:3001/booking/save-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              email: this.state.userInfo.email,
              fullName: this.state.userInfo.fullName,
              phoneNumber: this.state.userInfo.phoneNumber,
              price: this.state.price,
              bookDate: {
                from: this.state.from,
                to: this.state.to
              },
              room: this.state.rooms
            })
          }
        ).then(res => {
          return res.json();
        });
        if (!booking.success) {
          this.setState({
            errorMessage: booking.message
          });
        } else {
          swal(
            "Đặt phòng thành công",
            "Mời bạn kiểm tra lại",
            "success"
          ).then(value => {
            window.location.href = `/history`;
          });
        }
      } catch (error) {
        this.setState({
          errorMessage: error.message
        });
      }
    }
  };

  render() {
    return (
      <div>
        <div className='room-description container'>
          <div className='room-detail'>
            <h3 style={{ fontWeight: "bold", marginTop: "20px" }}>
              Thông tin đặt chỗ
            </h3>
            <h4 style={{ fontWeight: "bold", marginTop: "16px" }}>
              {this.state.rooms.title}
            </h4>
            <div className='detail-description'>
              <p>
                <span style={{ fontWeight: "bold" }}>Trách nhiệm vật chất</span>
                <br></br>
                Khách hàng chịu mọi trách nhiệm thiệt hại về tài sản đã gây ra
                tại chỗ ở trong thời gian lưu trú.<br></br>
                <span style={{ fontWeight: "bold" }}>Nội quy chỗ ở</span>
                <br></br>
                Không cho phép mang vật nuôi Không được hút thuốc lá Không sử
                dụng các chất kích thích Hạn chế gây ồn sau 22h
              </p>
            </div>
            <h3 style={{ fontWeight: "bold" }}>Thông tin của bạn</h3>
            {this.state.currentUser ? (
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <label>
                    Email address<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    placeholder='Enter email'
                    value={this.state.userInfo.email}
                    disabled
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <div className='form-group' style={{ marginRight: "20px" }}>
                    <label>
                      Full Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='FullName'
                      value={this.state.userInfo.fullName}
                      disabled
                    />
                  </div>
                  <div className='form-group'>
                    <label>
                      Phone Number<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='SDT'
                      value={this.state.userInfo.phoneNumber}
                      disabled
                    />
                  </div>
                </div>
                {this.state.userInfo.address ? (
                  <div className='form-group'>
                    <label>
                      Address<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Address'
                      value={this.state.userInfo.address}
                    />
                  </div>
                ) : null}

                {this.state.errorMessage ? (
                  <div className='alert alert-danger' role='alert'>
                    {this.state.errorMessage}
                  </div>
                ) : null}

                <button
                  type='submit'
                  className='FormField__Button mr-20'
                  style={{ fontSize: "16px" }}
                >
                  ĐẶT PHÒNG
                </button>
              </form>
            ) : (
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <label>
                    Email address<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    placeholder='Enter email'
                    value={this.state.email}
                    onChange={event => {
                      this.hanleElementChange("email", event.target.value);
                    }}
                  />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className='form-group'>
                    <label>
                      Full Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='FullName'
                      value={this.state.fullName}
                      onChange={event => {
                        this.hanleElementChange("fullName", event.target.value);
                      }}
                    />
                  </div>

                  <div className='form-group'>
                    <label>
                      Phone Number<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='SDT'
                      value={this.state.phoneNumber}
                      onChange={event => {
                        this.hanleElementChange(
                          "phoneNumber",
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className='form-group'>
                    <label>
                      Identity Card<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='CMTND'
                      value={this.state.identityCard}
                      onChange={event => {
                        this.hanleElementChange(
                          "identityCard",
                          event.target.value
                        );
                      }}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label>
                    Address<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Address'
                    value={this.state.address}
                    onChange={event => {
                      this.hanleElementChange("address", event.target.value);
                    }}
                  />
                </div>
                {this.state.errorMessage ? (
                  <div className='alert alert-danger' role='alert'>
                    {this.state.errorMessage}
                  </div>
                ) : null}

                <button
                  type='submit'
                  className='FormField__Button mr-20'
                  style={{ fontSize: "16px" }}
                >
                  ĐẶT PHÒNG
                </button>
              </form>
            )}
          </div>
          <div className='book-detail' style={{ marginTop: "20px" }}>
            <h4 style={{ fontWeight: "bold", color: "rgb(234, 72, 150)" }}>
              {this.state.rooms.title}
            </h4>
            <h3
              style={{ marginTop: "20px", textAlign: "center", color: "black" }}
              id='price'
            >
              {this.formatNumber(Number(this.state.rooms.price))}đ/đêm
            </h3>
            <div>
              <RangePicker
                defaultValue={[
                  moment(new Date(), dateFormat),
                  moment(new Date(), dateFormat)
                ]}
                format={dateFormat}
                onChange={this.onChange}
              />
            </div>
            <div
              style={{
                marginTop: "20px",
                borderBottom: "1px solid",
                fontWeight: "bold"
              }}
            >
              <span>Giá thuê {this.state.dateNumber} đêm: </span>
              <span style={{ float: "right" }}>
                {this.formatNumber(
                  Number(this.state.dateNumber * this.state.rooms.price)
                )}
                đ
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookDetailScreen;
