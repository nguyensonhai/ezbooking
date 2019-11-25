import React from "react";

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneRegex = /(09|0[2|6|8|7|5|3])+([0-9]{8})\b/;
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;

class UserEditProfile extends React.Component {
  state = {
    userID: "",
    file: undefined,
    imageUrl: "",
    email: "",
    fullName: "",
    phone: "",
    lastModify: "",
    address: "",
    errMessage: "",
    isSuccess: false,
    loading: false
  };

  componentWillMount() {
    const email = localStorage.getItem("email");
    this.getData(email);
  }
  getData = async infoUser => {
    try {
      const result = await fetch(`http://localhost:3001/users/${infoUser}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      }).then(res => {
        return res.json();
      });
      console.log(result);
      this.setState({
        userID: result.data._id,
        fullName: result.data.fullName,
        email: result.data.email,
        phone: result.data.phoneNumber,
        address: result.data.address,
        imageUrl: "http://localhost:3001" + result.data.avatarUrl
      });
    } catch (error) {
      window.alert(error.message);
    }
  };

  handleNameChange = event => {
    this.setState({
      fullName: event.target.value
    });
  };
  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };
  handlePhoneNumberChange = event => {
    this.setState({
      phone: event.target.value
    });
  };
  handleAddressChange = event => {
    this.setState({
      address: event.target.value
    });
  };
  handleFileChange = event => {
    const file = event.target.files[0];
    if (!imageFileRegex.test(file.name)) {
      this.setState({
        errMessage: "Ảnh không đúng định dạng"
      });
    } else if (file.size > maxFileSize) {
      this.setState({
        errMessage: "File quá lớn (>5MB)"
      });
    } else {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.setState({
          errMessage: "",
          file: file,
          imageUrl: fileReader.result
        });
      };
    }
  };

  handleFormSubmit = async event => {
    event.preventDefault();
    /**
     * Validate Name
     * Validate Email
     * Validate Phone
     */
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        errMessage: "Địa Chỉ Email Không Đúng Định Dạng"
      });
    } else if (!phoneRegex.test(this.state.phone)) {
      this.setState({
        errMessage: "Số Điện Thoại Không Đúng Định Dạng"
      });
    } else if (this.state.name == "") {
      this.setState({
        errMessage: "Vui Lòng Nhập Tên"
      });
    } else {
      this.setState({
        errMessage: "",
        loading: true
      });

      try {
        const formData = new FormData();
        formData.append("image", this.state.file);
        const uploadResult = await fetch(
          `http://localhost:3001/uploads/uploadAvatar`,
          {
            method: "POST",
            body: formData
          }
        ).then(res => {
          return res.json();
        });

        /**
         * Gọi Fetch để bắn dữ liệu vừa thay đổi lên server
         */

        const data = await fetch(
          `http://localhost:3001/users/editUserProfile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              id: this.state.userID,
              email: this.state.email,
              fullName: this.state.fullName,
              phone: this.state.phone,
              address: this.state.address,
              imgAvatar: uploadResult.data,
              lastModify: new Date()
            })
          }
        ).then(res => {
          return res.json();
        });

        if (!data.success) {
          this.setState({
            errMessage: data.message
          });
        } else {
          this.setState({
            isSuccess: true
          });
          setTimeout(() => {
            this.setState({
              counter: 2
            });
          }, 1000);
          setTimeout(() => {
            this.setState({
              counter: 1
            });
          }, 2000);
          setTimeout(() => {
            this.setState({
              counter: 0
            });
          }, 3000);
        }
      } catch (err) {
        this.setState({
          errMessage: err.message
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
      <div
        className='mt-5 container'
        style={{
          backgroundImage: `url(${require("./image/error-page.jpg")})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minWidth: "100vh",
          minHeight: "90vh"
        }}
      >
        <div className='row'>
          <div className=' col-4'>
            <div className='text-center'>
              {this.state.imageUrl ? (
                <div
                  style={{
                    backgroundImage: `url(${this.state.imageUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "400px",
                    marginTop: "20px"
                  }}
                ></div>
              ) : null}

              <input
                type='file'
                className='form-control btn '
                onChange={this.handleFileChange}
              />
            </div>
          </div>
          <div className='col-8'>
            <form onSubmit={this.handleFormSubmit}>
              <div className='form-group'>
                <label> Họ và Tên </label>
                <input
                  type='text'
                  className='form-control'
                  id='UserName'
                  onChange={this.handleNameChange}
                  value={this.state.fullName}
                ></input>
              </div>
              <div className='form-group'>
                <label> Email </label>
                <input
                  type='text'
                  className='form-control'
                  id='UserEmail'
                  onChange={this.handleEmailChange}
                  value={this.state.email}
                ></input>
              </div>
              <div className='form-group'>
                <label> Số Điện Thoại </label>
                <input
                  type='text'
                  className='form-control'
                  id='UserPhone'
                  onChange={this.handlePhoneNumberChange}
                  value={this.state.phone}
                ></input>
              </div>
              <div className='form-group'>
                <label> Địa Chỉ </label>
                <input
                  type='text'
                  className='form-control'
                  id='UserDescription'
                  onChange={this.handleAddressChange}
                  value={this.state.address}
                ></input>
              </div>
              {this.state.errMessage ? (
                <div className='alert alert-danger' role='alert'>
                  {this.state.errMessage}
                </div>
              ) : null}
              {this.state.isSuccess ? (
                <div className='alert alert-success' role='alert'>
                  update succes
                </div>
              ) : null}
              <div>
                {this.state.loading ? (
                  <button className='btn btn-primary'>
                    <div className='spinner-border' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  </button>
                ) : (
                  <input
                    type='submit'
                    className='btn btn-outline-warning'
                    value='Cập Nhật'
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default UserEditProfile;
