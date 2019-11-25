import React, { Component } from "react";
import SideBar from "../sideBar/SideBar";
import "./create.css";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;

class CreateRoomScreen extends Component {
  state = {
    title: "",
    address: "",
    type: "căn hộ",
    description: "",
    option: {
      kitchen: false,
      internet: false,
      pool: false,
      fridge: false,
      microwave: false,
      tv: false,
      bathroom: false
    },
    price: "",
    files: [],
    image: [],
    errorMessage: "",
    currentItem: "rooms",
    currentUser: ""
  };

  UNSAFE_componentWillMount() {
    const currentUser = window.localStorage.getItem("email");
    this.setState(
      {
        currentUser: currentUser
      },
      () => {
        console.log(this.state.currentUser);
      }
    );
  }

  handleCheckboxChange = type => {
    if (this.state.option[`${type}`]) {
      this.setState({
        option: {
          ...this.state.option,
          [type]: false
        }
      });
    } else {
      this.setState({
        option: {
          ...this.state.option,
          [type]: true
        }
      });
    }
  };

  handleInputChange = (type, value) => {
    this.setState({
      [type]: value
    });
  };

  handleFileChange = event => {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (!imageFileRegex.test(files[i].name)) {
          this.setState({
            errorMessage: "File ảnh không hợp lệ"
          });
        } else if (files[i].size > maxFileSize) {
          this.setState({
            errorMessage: "File ảnh quá to(dưới 5MB)"
          });
        } else {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(files[i]);
          fileReader.onload = () => {
            this.setState({
              errorMessage: "",
              files: [...this.state.files, files[i]],
              image: [...this.state.image, fileReader.result]
            });
          };
        }
      }
    }
  };

  handleFormSubmit = async event => {
    event.preventDefault();

    if (!this.state.title) {
      this.setState({
        errorMessage: "Tên phòng không được bỏ trống!"
      });
    } else if (!this.state.address) {
      this.setState({
        errorMessage: "Địa chỉ không được bỏ trống!"
      });
    } else if (!this.state.description) {
      this.setState({
        errorMessage: "Mô tả về phòng không được bỏ trống!"
      });
    } else if (
      !this.state.option.bathroom &&
      !this.state.option.fridge &&
      !this.state.option.internet &&
      !this.state.option.kitchen &&
      !this.state.option.microwave &&
      !this.state.option.pool &&
      !this.state.option.tv
    ) {
      this.setState({
        errorMessage: "Tiện ích không được bỏ trống!"
      });
    } else if (!this.state.price) {
      this.setState({
        errorMessage: "Giá phòng không được bỏ trống!"
      });
    } else if (!this.state.files.length) {
      this.setState({
        errorMessage: "Files ảnh không được bỏ trống!"
      });
    } else {
      this.setState({
        errorMessage: ""
      });

      // fetch api
      try {
        const formData = new FormData();
        for (let i = 0; i < this.state.files.length; i++) {
          formData.append("image", this.state.files[i]);
        }
        const uploadImages = await fetch(
          `http://localhost:3001/uploads/photos`,
          {
            method: "POST",
            body: formData,
            credentials: "include"
          }
        ).then(res => {
          return res.json();
        });

        // create new room
        if (uploadImages) {
          await fetch(`http://localhost:3001/rooms/create-room`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: this.state.title,
              address: this.state.address,
              type: this.state.type,
              description: this.state.description,
              option: {
                kitchen: this.state.option.kitchen,
                internet: this.state.option.internet,
                pool: this.state.option.pool,
                fridge: this.state.option.fridge,
                microwave: this.state.option.microwave,
                tv: this.state.option.tv,
                bathroom: this.state.option.bathroom
              },
              price: Number(this.state.price),
              image: uploadImages.data
            }),
            credentials: "include"
          }).then(res => {
            return res.json();
          });
        }
        swal(
          "Tạo phòng thành công",
          "Mời bạn kiểm tra lại",
          "success"
        ).then(value => {
          window.location.href = `/admin/create-room`;
        });
      } catch (error) {
        this.setState({
          errorMessage: error.message
        });
      }
    }
  };

  render() {
    return this.state.currentUser === "admin@gmail.com" ? (
      <div className='row'>
        <div className='col-2 sidebar-container'>
          <SideBar currentItem={this.state.currentItem} />
        </div>
        <div className='col-10 create-container'>
          <form className='form-container' onSubmit={this.handleFormSubmit}>
            <div className='form-group'>
              <label>
                Tên phòng<span className='text-danger'>*</span>:{" "}
              </label>
              <div className='input-text'>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  aria-describedby='titleHelp'
                  value={this.state.title}
                  onChange={event => {
                    this.handleInputChange("title", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className='form-group'>
              <label>
                Địa chỉ<span className='text-danger'>*</span>:{" "}
              </label>
              <div className='input-text'>
                <input
                  type='text'
                  className='form-control'
                  id='address'
                  aria-describedby='addressHelp'
                  value={this.state.address}
                  onChange={event => {
                    this.handleInputChange("address", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className='form-group'>
              <label>
                Kiểu phòng<span className='text-danger'>*</span>:{" "}
              </label>
              <div className='input-text'>
                <select
                  value={this.state.type}
                  onChange={event => {
                    this.handleInputChange("type", event.target.value);
                  }}
                >
                  <option value='căn hộ'>Căn hộ</option>
                  <option value='biệt thự'>Biệt thự</option>
                  <option value='nhà riêng'>Nhà riêng</option>
                  <option value='homestay'>Homestay</option>
                </select>
              </div>
            </div>
            <div className='form-group'>
              <label>
                Mô tả<span className='text-danger'>*</span>:{" "}
              </label>
              <div className='input-text'>
                <textarea
                  name=''
                  id=''
                  cols='200'
                  rows='5'
                  value={this.state.description}
                  onChange={event => {
                    this.handleInputChange("description", event.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className='form-group'>
              <label>
                Tiện ích<span className='text-danger'>*</span>:{" "}
              </label>
              <div className='input-text'>
                <div>
                  <input
                    type='checkbox'
                    name='option1'
                    value='kitchen'
                    onChange={event => {
                      this.handleCheckboxChange(event.target.value);
                    }}
                  />{" "}
                  Bếp
                </div>
                <div>
                  <input
                    type='checkbox'
                    name='option2'
                    value='internet'
                    onChange={event => {
                      this.handleCheckboxChange(event.target.value);
                    }}
                  />{" "}
                  Wifi
                </div>
                <div>
                  <input
                    type='checkbox'
                    name='option3'
                    value='pool'
                    onChange={event => {
                      this.handleCheckboxChange(event.target.value);
                    }}
                  />{" "}
                  Bể bơi
                </div>
                <div>
                  <input
                    type='checkbox'
                    name='option4'
                    value='fridge'
                    onChange={event => {
                      this.handleCheckboxChange(event.target.value);
                    }}
                  />{" "}
                  Tủ lạnh
                </div>
                <div>
                  <input
                    type='checkbox'
                    name='option5'
                    value='microwave'
                    onChange={event => {
                      this.handleCheckboxChange(event.target.value);
                    }}
                  />{" "}
                  Lò vi sóng
                </div>
                <div>
                  <input
                    type='checkbox'
                    name='option6'
                    value='tv'
                    onChange={event => {
                      this.handleCheckboxChange(event.target.value);
                    }}
                  />{" "}
                  Tivi
                </div>
                <div>
                  <input
                    type='checkbox'
                    name='option7'
                    value='bathroom'
                    onChange={event => {
                      this.handleCheckboxChange(event.target.value);
                    }}
                  />{" "}
                  Phòng tắm
                </div>
              </div>
            </div>
            <div className='form-group'>
              <label>
                Giá phòng<span className='text-danger'>*</span>:{" "}
              </label>
              <div className='input-text'>
                <input
                  type='text'
                  className='form-control'
                  id='address'
                  aria-describedby='addressHelp'
                  value={this.state.price}
                  onChange={event => {
                    this.handleInputChange("price", event.target.value);
                  }}
                />
              </div>
            </div>
            <div className='form-group'>
              <label>
                Ảnh<span className='text-danger'>*</span>:{" "}
              </label>
              <div className='input-text'>
                <input
                  type='file'
                  className='form-control-file'
                  id='exampleFormControlFile1'
                  multiple
                  filename={this.state.files}
                  onChange={this.handleFileChange}
                />
              </div>
            </div>
            {this.state.errorMessage ? (
              <div className='alert alert-danger' role='alert'>
                {this.state.errorMessage}
              </div>
            ) : null}
            <button type='submit' className='btn btn-primary'>
              Tạo phòng mới
            </button>
          </form>
        </div>
      </div>
    ) : this.state.currentUser ? (
      <Redirect to='/' />
    ) : (
          <Redirect to='/login' />
        );
  }
}

export default CreateRoomScreen;
