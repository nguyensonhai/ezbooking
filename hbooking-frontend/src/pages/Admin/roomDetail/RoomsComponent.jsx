import React, { Component } from "react";
import SideBar from "../sideBar/SideBar";
import { Redirect } from "react-router-dom";

const pageSize = 2;

class RoomsComponent extends Component {
  state = {
    data: [],
    total: 0,
    currentPageNumber: 1,
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
        this.getData(1);
      }
    );
  }

  getData = async pageNumber => {
    try {
      if (this.state.currentUser === "admin@gmail.com") {
        const result = await fetch(
          `http://localhost:3001/admin/get-rooms?pageNumber=${pageNumber}&pageSize=${pageSize}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include"
          }
        ).then(res => {
          return res.json();
        });
        console.log(result);
        this.setState({
          data: result.data.roomsData,
          total: result.data.countRooms
        });
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  handlePageChange = newPageNumber => {
    // call getData
    this.getData(newPageNumber);

    // setState currentPageNumber
    this.setState({
      currentPageNumber: newPageNumber
    });
  };

  handlePrevClick = () => {
    if (this.state.currentPageNumber > 1) {
      // getData
      this.getData(this.state.currentPageNumber - 1);

      // setState
      this.setState({
        currentPageNumber: this.state.currentPageNumber - 1
      });
    }
  };

  handleNextClick = () => {
    const maxPageNumber = Math.ceil(this.state.total / pageSize);
    if (this.state.currentPageNumber < maxPageNumber) {
      // getData
      this.getData(this.state.currentPageNumber + 1);

      // setState
      this.setState({
        currentPageNumber: this.state.currentPageNumber + 1
      });
    }
  };

  render() {
    const maxPageNumber = Math.ceil(this.state.total / pageSize);
    const paginations = [];
    for (let i = 0; i < maxPageNumber; i += 1) {
      paginations.push(i + 1);
    }

    return this.state.currentUser === "admin@gmail.com" ? (
      <div className='row'>
        <div className='col-2 sidebar-container'>
          <SideBar currentItem={this.state.currentItem} />
        </div>
        <div className='col-10 table-container'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>STT</th>
                <th scope='col'>Tên phòng</th>
                <th scope='col'>Địa chỉ</th>
                <th scope='col'>Kiểu phòng</th>
                <th scope='col'>Tiện ích</th>
                <th scope='col'>Miêu tả</th>
                <th scope='col'>Giá phòng</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((value, index) => {
                return (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{value.title}</td>
                    <td>{value.address}</td>
                    <td>{value.type}</td>
                    <td>
                      {
                        <div>
                          <p>{value.option.bathroom ? "Nhà tắm" : null}</p>
                          <p>{value.option.fridge ? "Tủ lạnh" : null}</p>
                          <p>{value.option.internet ? "Internet" : null}</p>
                          <p>{value.option.kitchen ? "Bếp" : null}</p>
                          <p>{value.option.microwave ? "Lò vi sóng" : null}</p>
                          <p>{value.option.pool ? "Bể bơi" : null}</p>
                          <p>{value.option.tv ? "Tivi" : null}</p>
                        </div>
                      }
                    </td>
                    <td>{value.description}</td>
                    <td>{value.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <nav aria-label='Page navigation example'>
            <ul className='pagination'>
              <li className='page-item'>
                <a
                  className='page-link'
                  aria-label='Previous'
                  onClick={this.handlePrevClick}
                >
                  <span aria-hidden='true'>&laquo;</span>
                  <span className='sr-only'>Previous</span>
                </a>
              </li>
              {paginations.map(item => {
                const isActive = item === this.state.currentPageNumber;
                let classNameValue = "";
                if (isActive) {
                  classNameValue = "page-item active";
                } else {
                  classNameValue = "page-item";
                }
                return (
                  <li className={classNameValue} key={item}>
                    <a
                      className='page-link'
                      onClick={() => {
                        this.handlePageChange(item);
                      }}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
              <li className='page-item'>
                <a
                  className='page-link'
                  aria-label='Next'
                  onClick={this.handleNextClick}
                >
                  <span aria-hidden='true'>&raquo;</span>
                  <span className='sr-only'>Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    ) : this.state.currentUser ? (
      <Redirect to='/' />
    ) : (
      <Redirect to='/login' />
    );
  }
}

export default RoomsComponent;
