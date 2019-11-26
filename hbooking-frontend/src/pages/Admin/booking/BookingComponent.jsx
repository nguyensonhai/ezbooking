import React, { Component } from "react";
import SideBar from "../sideBar/SideBar";
import { Redirect } from "react-router-dom";

const pageSize = 15;

class BookingComponent extends Component {
  state = {
    data: [],
    total: 0,
    currentPageNumber: 1,
    currentItem: "booking",
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
          `http://localhost:3001/admin/get-booking?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
        this.setState({
          data: result.data.bookingData,
          total: result.data.countBooking
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
                <th>STT</th>
                <th>Email</th>
                <th>Họ tên</th>
                <th>SĐT</th>
                <th>Tên phòng</th>
                <th>Ngày checkin</th>
                <th>Ngày checkout</th>
                <th>Thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((value, index) => {
                return (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{value.email}</td>
                    <td>{value.fullName}</td>
                    <td>{value.phoneNumber}</td>
                    <td>{value.room.title}</td>
                    <td>
                      {new Date(value.bookDate.from).toLocaleDateString()}
                    </td>
                    <td>{new Date(value.bookDate.to).toLocaleDateString()}</td>
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

export default BookingComponent;
