import React, { Component } from "react";

const pageSize = 5;

export default class BookingHistory extends Component {
  state = {
    data: [],
    total: 0,
    currentPageNumber: 1
  };

  componentWillMount() {
    this.getData(1);
  }

  /**
   *
   */

  getData = async pageNumber => {
    try {
      const result = await fetch(
        `http://localhost:3001/booking/history?pageNumber=${pageNumber}&pageSize=${pageSize}&email=${localStorage.getItem(
          "email"
        )}`,
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
      this.setState(
        {
          total: result.data.total,
          data: result.data.data
        },
        () => {
          console.log(this.state.data);
        }
      );
    } catch (error) {
      window.alert(error.message);
    }
  };

  /**
   *
   */
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
  /**
   *
   */
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
  /**
   *
   */
  handlePageChange = newPageNumber => {
    // call getData
    this.getData(newPageNumber);

    // setState currentPageNumber
    this.setState({
      currentPageNumber: newPageNumber
    });
  };

  render() {
    const maxPageNumber = Math.ceil(this.state.total / pageSize);
    const paginations = [];
    for (let i = 0; i < maxPageNumber; i++) {
      paginations.push(i + 1);
    }

    return (
      <div className='container mt-5'>
        <table className='table mt-5'>
          <thead className='thead-light'>
            <tr>
              <th scope='col'>STT</th>
              <th scope='col'>Từ</th>
              <th scope='col'>Đến</th>
              <th scope='col'>Phòng</th>
              <th scope='col'>Tổng Tiền</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{new Date(item.bookDate.from).toLocaleDateString()}</td>
                  <td>{new Date(item.bookDate.to).toLocaleDateString()}</td>
                  <td>{item.room.title}</td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav aria-label='Page navigation example'>
          <ul
            className='pagination'
            style={{ float: "right", marginTop: "30px", marginBottom: "30px" }}
          >
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
    );
  }
}
