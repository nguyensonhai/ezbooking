import React, { Component } from "react";
import { NavLink, Redirect, Link } from "react-router-dom";
import "./login.css";
class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
    loading: false,
    currentUser: ""
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({
      errorMessage: "",
      loading: true
    });

    try {
      const data = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      }).then(response => {
        return response.json();
      });
      if (!data.success) {
        this.setState({
          errorMessage: data.message
        });
      } else {
        window.localStorage.setItem("email", data.data.email);
        if (data.data.email === "admin@gmail.com") {
          window.location.href = `/admin`;
        } else {
          window.location.href = `/`;
        }
      }
    } catch (err) {
      this.setState({
        errorMessage: err.message
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    console.log(this.props.currentUser);
    return this.props.currentUser ? (
      <Redirect to='/' />
    ) : (
      <div className='container'>
        <div className='App'>
          <div className='App__Aside'>
            <div className='Aside1'>
              <div className='intro'>
                <img src={require("./image/1.png")} alt='...'></img>
                <h3>Gia đình là số 1</h3>
                <p>
                  HBooking là công cụ hỗ trợ tuyệt vời giúp bạn tìm kiếm những
                  địa điểm phù hợp cho gia đình của mình
                </p>
              </div>
              <div className='intro'>
                <img src={require("./image/2.png")} alt='...'></img>
                <h3>Căn hộ đẳng cấp</h3>
                <p>
                  HBooking luôn mang đến những căn hộ, biệt thự đẳng cấp và sang
                  trọng
                </p>
              </div>
            </div>
            <div className='Aside2'>
              <div className='intro'>
                <img src={require("./image/3.png")} alt='...'></img>
                <h3>Tiết kiệm chi phí</h3>
                <p>
                  Chất lượng luôn được đảm bảo hàng đầu tuy nhiên mức chi trả
                  lại rất hợp lí
                </p>
              </div>
              <div className='intro'>
                <img src={require("./image/4.png")} alt='...'></img>
                <h3>Xách balo lên và đi thôi</h3>
                <p>
                  Thanh xuân như một ly trà, không đi du lịch hết bà thanh xuân
                </p>
              </div>
            </div>
          </div>
          <div className='App__Form'>
            <div className='FormTitle'>
              <NavLink
                to='/login'
                activeClassName='FormTitle__Link--Active'
                className='FormTitle__Link'
              >
                Đăng Nhập
              </NavLink>{" "}
              hoặc{" "}
              <NavLink
                exact
                to='/register'
                activeClassName='FormTitle__Link--Active'
                className='FormTitle__Link'
              >
                Đăng Ký
              </NavLink>
            </div>
            <div className='FormCenter'>
              <form className='FormFields' onSubmit={this.handleSubmit}>
                <div className='FormField Input'>
                  <label className='FormField__Label' htmlFor='email'>
                    Tên Đăng Nhập <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type='text'
                    id='email'
                    className='FormField__Input'
                    placeholder='Enter your email'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                </div>
                <div className='FormField Input'>
                  <label className='FormField__Label' htmlFor='password'>
                    Mật Khẩu <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type='password'
                    id='password'
                    className='FormField__Input'
                    placeholder='Enter your password'
                    name='password'
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                </div>

                {this.state.errorMessage ? (
                  <div className='alert alert-danger' role='alert'>
                    {this.state.errorMessage}
                  </div>
                ) : null}

                <div className='FormField'>
                  <button
                    className='FormField__Button mr-20'
                    style={{ width: "100%" }}
                  >
                    Đăng Nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
