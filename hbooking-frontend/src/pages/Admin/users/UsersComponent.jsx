import React, { Component } from "react";
import "./usersComp.css";

const pageSize = 10;

class UsersComponent extends Component {
  state = {
    data: [],
    total: 0,
    currentPageNumber: 1
  };

  getData = async pageNumber => {
    try {
      const result = await fetch(
        `http://localhost:3001/admin/get-users?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
        data: result.data.usersData,
        total: result.data.countUsers
      });
    } catch (error) {
      window.alert(error.message);
    }
  };

  UNSAFE_componentWillMount() {
    this.getData(1);
  }

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
    return (
      <div className='table-container'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>STT</th>
              <th scope='col'>Họ tên</th>
              <th scope='col'>Email</th>
              <th scope='col'>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((value, index) => {
              return (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{value.fullName}</td>
                  <td>{value.email}</td>
                  <td>{new Date(value.createdAt).toLocaleDateString()}</td>
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
    );
  }
}

export default UsersComponent;
