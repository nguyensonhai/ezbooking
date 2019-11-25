import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import swal from "sweetalert";
import "./register.css";
class RegisterScreen extends Component {
  state = {
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    errorMessage: "",
    loading: false,
    isSuccess: false
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handleFullnameChange = event => {
    this.setState({
      fullName: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleConfirmPasswordChange = event => {
    this.setState({
      confirmPassword: event.target.value
    });
  };
  handlephoneNumberChange = event => {
    this.setState({
      phoneNumber: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    //validate
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        errorMessage: "Email is not valid"
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        errorMessage: "Password must be more than 6 characters"
      });
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorMessage: "Password not match"
      });
    } else if (!this.state.fullName) {
      this.setState({
        errorMessage: "Enter your fullName"
      });
    } else if (!this.state.phoneNumber) {
      this.setState({
        errorMessage: "Enter your phone number"
      });
    } else {
      this.setState({
        errorMessage: "",
        loading: true
      });

      try {
        const data = await fetch("http://localhost:3001/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            email: this.state.email,
            fullName: this.state.fullName,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber
          })
        }).then(response => {
          return response.json();
        });

        if (!data.success) {
          this.setState({
            errorMessage: data.message
          });
        } else {
          this.setState({
            isSuccess: true
          });
          swal(
            "Tạo tài khoản thành công",
            "Bạn có thể đăng nhập",
            "success"
          ).then(value => {
            window.location.href = `/login`;
          });
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
    }
  };

  render() {
    return (
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
                Đăng ký
              </NavLink>
            </div>
            <div className='FormCenter'>
              <form className='FormFields' onSubmit={this.handleSubmit}>
                <div className='FormField Input'>
                  <label className='FormField__Label' htmlFor='email'>
                    Email<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id='email'
                    className='FormField__Input'
                    placeholder='Enter your email'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                </div>
                <div className='FormField Input'>
                  <label className='FormField__Label' htmlFor='name'>
                    Họ tên <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='FormField__Input'
                    placeholder='Enter your full name'
                    name='name'
                    value={this.state.fullName}
                    onChange={this.handleFullnameChange}
                  />
                </div>
                <div className='FormField Input'>
                  <label className='FormField__Label' htmlFor='password'>
                    Mật khẩu <span style={{ color: "red" }}>*</span>
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
                <div className='FormField Input'>
                  <label className='FormField__Label' htmlFor='password'>
                    Xác nhận mật khẩu <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type='password'
                    id='confirm-password'
                    className='FormField__Input'
                    placeholder='Confirm your password'
                    name='confirm-password'
                    value={this.state.confirmPassword}
                    onChange={this.handleConfirmPasswordChange}
                  />
                </div>
                <div className='FormField Input'>
                  <label className='FormField__Label' htmlFor='password'>
                    Điện thoại <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type='text'
                    className='FormField__Input'
                    placeholder='phone number'
                    value={this.state.phoneNumber}
                    onChange={this.handlephoneNumberChange}
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
                    Đăng ký
                  </button>
                  <Link
                    to='/login'
                    className='FormField__Link'
                    style={{ float: "right" }}
                  >
                    Đã là thành viên
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterScreen;
